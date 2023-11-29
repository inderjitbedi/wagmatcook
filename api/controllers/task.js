const notificationConstants = require("../constants/notificationConstants");
const Notifications = require("../models/notification");
const Tasks = require("../models/tasks");
const roles = require("../enum/roles");
const User = require("../models/user");
const TaskComments = require("../models/taskComments");
const sendGrid = require("../providers/sendGrid");

const taskController = {
  async create(req, res) {
    try {
      req.body.assigner = req.user?._id;
      let task = new Tasks(req.body);
      await task.save();
      
      task = await task.populate([
        { path: "assignee", populate: { path: "personalInfo" } },
        { path: "assigner", populate: { path: "personalInfo" } },
      ]);
      console.log("this is task",task)
      let type = "TASK_ASSIGNED";
      const notification = new Notifications({
        title: notificationConstants[type].title?.replace(
          "{assigner}",
          req.user?.personalInfo
            ? [
                req.user?.personalInfo.firstName,
                req.user?.personalInfo.lastName,
              ].join(" ")
            : "Someone"
        ),
        type,
        sender: req.user._id,
        receiver: req.body.assignee,
        dataId: task._id,
      });
      await notification.save();

      if (task.assignee.role === roles.EMPLOYEE)
        task.redirectUrl = `${process.env.FRONTEND_URL}user-management/tasks/details/${task._id}`;
      else if (task.assignee.role === roles.MANAGER)
        task.redirectUrl = `${process.env.FRONTEND_URL}manager-management/tasks/details/${task._id}`;
      // if (task.assignee.role === roles.HR) | obvious HR
      else
        task.redirectUrl = `${process.env.FRONTEND_URL}hr-management/tasks/details/${task._id}`;

      // sendGrid.send(task.sentTo?.email, "taskStatusUpdate", { task });

      sendGrid.send(task.assignee.email, "taskAssigned", { task });

      res.status(201).json({ task, message: "Task created successfully." });
    } catch (error) {
      console.error("taskController:create:error -", error);
      res.status(400).json(error);
    }
  },
  async delete(req, res) {
    try {
      req.body.assigner = req.user?._id;
      const task = await Tasks.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { isDeleted: true },
        { new: true }
      );
      res.status(200).json({ task, message: "Task deleted successfully" });
    } catch (error) {
      console.error("taskController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async update(req, res) {
    try {
      req.body.assigner = req.user?._id;
      const task = await Tasks.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { ...req.body },
        { new: true }
      );
      res.status(200).json({ task, message: "Task updated successfully" });
    } catch (error) {
      console.error("taskController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async markComplete(req, res) {
    try {
      let task = await Tasks.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { isCompleted: !!req.body.isCompleted },
        { new: true }
      );
      task = await task.populate([
        { path: "assignee", populate: { path: "personalInfo" } },
        { path: "assigner", populate: { path: "personalInfo" } },
      ]);
      if (task.assignee._id.equals(req.user._id)) {
        task.sentTo = task.assigner;
        if (task.assigner.role === roles.MANAGER)
          task.redirectUrl = `${process.env.FRONTEND_URL}manager-management/tasks/details/${task._id}`;
        else if (task.assigner.role === roles.HR)
          task.redirectUrl = `${process.env.FRONTEND_URL}hr-management/tasks/details/${task._id}`;
        //| obvious OA
        else
          task.redirectUrl = `${process.env.FRONTEND_URL}organization-admin/tasks/details/${task._id}`;
      } else {
        task.sentTo = task.assignee;

        if (task.assignee.role === roles.EMPLOYEE)
          task.redirectUrl = `${process.env.FRONTEND_URL}user-management/tasks/details/${task._id}`;
        else if (task.assignee.role === roles.MANAGER)
          task.redirectUrl = `${process.env.FRONTEND_URL}manager-management/tasks/details/${task._id}`;
        // if (task.assignee.role === roles.HR) | obvious HR
        else
          task.redirectUrl = `${process.env.FRONTEND_URL}hr-management/tasks/details/${task._id}`;
      }
      let type = "TASK_STATUS_UPDATED";
      const notification = new Notifications({
        title: notificationConstants[type].title
          ?.replace(
            "{user}",
            req.user?.name ||
              [
                req.user?.personalInfo?.firstName,
                req.user?.personalInfo?.lastName,
              ].join(" ")
          )
          .replace("{taskName}", task?.title),
        type,
        sender: req.user._id,
        receiver: task.sentTo?._id,
        dataId: task._id,
      });
      console.log("this is the task id ", task._id);
      await notification.save();

      sendGrid.send(task.sentTo?.email, "taskStatusUpdate", { task });

      res.status(200).json({
        message:
          "Task marked as " +
          (req.body.isCompleted ? "completed" : "in-progress") +
          " successfully",
      });
    } catch (error) {
      console.error("taskController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async details(req, res) {
    try {
      const task = await Tasks.findOne({
        _id: req.params.id,
        isDeleted: false,
      }).populate([
        {
          path: "assignee",
          populate: { path: "personalInfo", populate: { path: "photo" } },
        },
        {
          path: "assigner",
          populate: { path: "personalInfo", populate: { path: "photo" } },
        },
      ]);
      if (!task) {
        // Check if the task is deleted or not found
        const deletedTask = await Tasks.findOne({
          _id: req.params.id,
          isDeleted: true,
        });

        if (deletedTask) {
          return res.status(400).json({ message: "The task is deleted." });
        }

        return res.status(400).json({ message: "Task not found." });
      }

      res
        .status(200)
        .json({ task, message: "Task details fetched successfully" });
    } catch (error) {
      console.error("taskController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async list(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;
      let filters = {
        isDeleted: false,
        $or: [
          {
            assignee: req.user?._id,
          },
          {
            assigner: req.user?._id,
          },
        ],
      };
      if (req.query.searchKey) {
        filters.$or = [
          { title: { $regex: req.query.searchKey, $options: "i" } },
          { description: { $regex: req.query.searchKey, $options: "i" } },
        ];
      }

      if (req.query.sort) {
        filters.isCompleted = req.query.sort === "true";
      }
      const tasks = await Tasks.find(filters)
        .populate([
          {
            path: "assignee",
            populate: {
              path: "personalInfo",
              populate: { path: "photo" },
            },
          },
          {
            path: "assigner",
            populate: {
              path: "personalInfo",
              populate: { path: "photo" },
            },
          },
        ])
        .skip(startIndex)
        .limit(limit)
        .sort({ createdAt: -1 });

      const totalTasks = await Tasks.countDocuments(filters);
      const totalPages = Math.ceil(totalTasks / req.query.limit);

      res.status(200).json({
        tasks,
        totalTasks,
        currentPage: page,
        totalPages,
        message: "Tasks fetched successfully",
      });
    } catch (error) {
      console.error("taskController:list:error -", error);
      res.status(400).json(error);
    }
  },
  async assigneeList(req, res) {
    try {
      let filters = {
        isDeleted: false,
        role: { $ne: roles.ORG_ADMIN },
        _id: { $ne: req.user._id },
      };

      const assignees = await User.aggregate([
        {
          $match: filters,
        },
        {
          $lookup: {
            from: "userorganizations",
            localField: "_id",
            foreignField: "user",
            as: "userOrganizations",
          },
        },
        {
          $match: {
            "userOrganizations.organization": req.organization?._id || null,
          },
        },
        {
          $lookup: {
            from: "employeepersonalinfos",
            localField: "_id",
            foreignField: "employee",
            as: "personalInfo",
          },
        },
        {
          $lookup: {
            from: "files",
            localField: "personalInfo.photo",
            foreignField: "_id",
            as: "photoInfo",
          },
        },
      ]);

      res.status(200).json({
        assignees,
        message: "Assignees fetched successfully",
      });
    } catch (error) {
      console.error("taskController:list:error -", error);
      res.status(400).json(error);
    }
  },

  async addComment(req, res) {
    try {
      req.body.task = req.params?.taskid;
      req.body.commenter = req.user?._id;
      let comment = new TaskComments(req.body);
      await comment.save();
      await comment.populate([
        {
          path: "commenter",
          populate: { path: "personalInfo", populate: { path: "photo" } },
        },
        {
          path: "task",
          populate: [
            { path: "assignee", populate: { path: "personalInfo" } },
            { path: "assigner", populate: { path: "personalInfo" } },
          ],
        },
      ]);

      let task = comment.task;

      let type = "TASK_COMMENT";
      const notification = new Notifications({
        title: notificationConstants[type].title
          ?.replace(
            "{commenter}",
            comment.commenter?.name ||
              [
                comment.commenter?.personalInfo?.firstName,
                comment.commenter?.personalInfo?.lastName,
              ].join(" ")
          )
          .replace("{taskName}", task?.title),
        type,
        sender: req.user._id,
        receiver: req.user._id.equals(task.assignee?._id)
          ? task.assigner?._id
          : task.assignee?._id,
        dataId: task._id,
      });
      await notification.save();

      if (task.assignee._id.equals(req.user._id)) {
        task.sentTo = task.assigner;
        if (task.assigner.role === roles.MANAGER)
          task.redirectUrl = `${process.env.FRONTEND_URL}manager-management/tasks/details/${task._id}`;
        else if (task.assigner.role === roles.HR)
          task.redirectUrl = `${process.env.FRONTEND_URL}hr-management/tasks/details/${task._id}`;
        //| obvious OA
        else
          task.redirectUrl = `${process.env.FRONTEND_URL}organization-admin/tasks/details/${task._id}`;
      } else {
        task.sentTo = task.assignee;

        if (task.assignee.role === roles.EMPLOYEE)
          task.redirectUrl = `${process.env.FRONTEND_URL}user-management/tasks/details/${task._id}`;
        else if (task.assignee.role === roles.MANAGER)
          task.redirectUrl = `${process.env.FRONTEND_URL}manager-management/tasks/details/${task._id}`;
        // if (task.assignee.role === roles.HR) | obvious HR
        else
          task.redirectUrl = `${process.env.FRONTEND_URL}hr-management/tasks/details/${task._id}`;
      }

      sendGrid.send(task.sentTo?.email, "taskComment", { comment, task });
      res.status(201).json({ comment, message: "Comment added successfully." });
    } catch (error) {
      console.error("taskController:create:error -", error);
      res.status(400).json(error);
    }
  },
  async deleteComment(req, res) {
    try {
      const comment = await TaskComments.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { isDeleted: true },
        { new: true }
      );
      res
        .status(200)
        .json({ comment, message: "Comment deleted successfully" });
    } catch (error) {
      console.error("taskController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async updateComment(req, res) {
    try {
      req.body.commenter = req.user?._id;
      req.body.task = req.params?.taskid;
      req.body.isEdited = true;
      const comment = await TaskComments.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { ...req.body },
        { new: true }
      );
      await comment.populate({
        path: "commenter",
        populate: { path: "personalInfo", populate: { path: "photo" } },
      });

      res
        .status(200)
        .json({ comment, message: "Comment updated successfully" });
    } catch (error) {
      console.error("taskController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async listComments(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;
      let filters = {
        task: req.params.taskid,
        isDeleted: false,
      };
      const comments = await TaskComments.find(filters)
        .populate({
          path: "commenter",
          populate: { path: "personalInfo", populate: { path: "photo" } },
        })
        .skip(startIndex)
        .limit(limit)
        .sort({ createdAt: -1 });

      const totalComments = await TaskComments.countDocuments(filters);
      const totalPages = Math.ceil(totalComments / req.query.limit);

      res.status(200).json({
        comments,
        totalComments,
        currentPage: page,
        totalPages,
        message: "Comments fetched successfully",
      });
    } catch (error) {
      console.error("taskController:update:error -", error);
      res.status(400).json(error);
    }
  },
};
module.exports = taskController;
