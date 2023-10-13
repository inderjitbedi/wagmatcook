const notificationConstants = require("../constants/notificationConstants");
const Notifications = require("../models/notification");
const Tasks = require("../models/tasks");
const roles = require("../enum/roles");
const User = require("../models/user");
const TaskComments = require("../models/taskComments");

const taskController = {
    async create(req, res) {

        try {
            req.body.assigner = req.user?._id;
            const task = new Tasks(req.body);
            await task.save();

            let type = "TASK_ASSIGNED"
            const notification = new Notifications({
                title: notificationConstants[type].title?.replace('{assigner}', req.user?.personalInfo ? [req.user?.personalInfo.firstName, req.user?.personalInfo.lastName].join(' ') : 'Someone'),
                type,
                sender: req.user._id,
                receiver: req.body.assignee
            });
            await notification.save();
            res.status(201).json({ task, message: 'Task created successfully.' });
        } catch (error) {
            console.error("taskController:create:error -", error);
            res.status(400).json(error);
        }
    },
    async delete(req, res) {
        try {
            req.body.assigner = req.user?._id;
            const task = await Tasks.findOneAndUpdate({
                _id: req.params.id,
            }, { isDeleted: true }, { new: true })
            res.status(200).json({ task, message: 'Task deleted successfully' });
        } catch (error) {
            console.error("taskController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async update(req, res) {
        try {
            req.body.assigner = req.user?._id;
            const task = await Tasks.findOneAndUpdate({
                _id: req.params.id,
            }, { ...req.body }, { new: true })
            res.status(200).json({ task, message: 'Task updated successfully' });
        } catch (error) {
            console.error("taskController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async markComplete(req, res) {
        try {
            const task = await Tasks.findOneAndUpdate({
                _id: req.params.id,
            }, { isCompleted: true }, { new: true })
            res.status(200).json({ message: 'Task marked as completed successfully' });
        } catch (error) {
            console.error("taskController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async details(req, res) {
        try {
            const task = await Tasks.findOne({
                _id: req.params.id
            }).populate([{ path: 'assignee', populate: { path: 'personalInfo', populate: { path: 'photo' } } },
            { path: 'assigner', populate: { path: 'personalInfo', populate: { path: 'photo' } } }])
            res.status(200).json({ task, message: 'Task details fetched successfully' });
        } catch (error) {
            console.error("taskController:update:error -", error);
            res.status(400).json(error);
        }
    },
    async list(req, res) {
        try {
            console.log(JSON.stringify(req.user));
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const startIndex = (page - 1) * limit;
            let filters = {
                isDeleted: false,
                $or: [{
                    assignee: req.user?._id,
                }, {
                    assigner: req.user?._id,
                }]
            };
            const tasks = await Tasks.find(filters)
                .populate([
                    { path: 'assignee', populate: { path: 'personalInfo', populate: { path: 'photo' } } },
                    { path: 'assigner', populate: { path: 'personalInfo', populate: { path: 'photo' } } }
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
                message: 'Tasks fetched successfully'
            });
        } catch (error) {
            console.error("taskController:list:error -", error);
            res.status(400).json(error);
        }
    },
    async assigneeList(req, res) {
        try {

            let filters = { isDeleted: false, role: roles.EMPLOYEE }

            const assignees = await User.aggregate([
                {
                    $match: filters,
                },
                {
                    $lookup: {
                        from: 'userorganizations',
                        localField: '_id',
                        foreignField: 'user',
                        as: 'userOrganizations',
                    },
                },
                {
                    $match: {
                        'userOrganizations.organization': req.organization?._id || null,
                    },
                },
                {
                    $lookup: {
                        from: 'employeepersonalinfos',
                        localField: '_id',
                        foreignField: 'employee',
                        as: 'personalInfo',
                    },
                },
                {
                    $lookup: {
                        from: 'files',
                        localField: 'personalInfo.photo',
                        foreignField: '_id',
                        as: 'photoInfo',
                    },
                },
            ]);


            res.status(200).json({
                assignees,
                message: 'Assignees fetched successfully'
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
            const comment = new TaskComments(req.body);
            await comment.save();
            // let type = "TASK_ASSIGNED"
            // const notification = new Notifications({
            //     title: notificationConstants[type].title?.replace('{assigner}', req.user?.personalInfo ? [req.user?.personalInfo.firstName, req.user?.personalInfo.lastName].join(' ') : 'Someone'),
            //     type,
            //     sender: req.user._id,
            //     receiver: req.body.assignee
            // });
            // await notification.save();
            res.status(201).json({ comment, message: 'Comment added successfully.' });
        } catch (error) {
            console.error("taskController:create:error -", error);
            res.status(400).json(error);
        }
    },
    async deleteComment(req, res) {
        try {
            const comment = await TaskComments.findOneAndUpdate({
                _id: req.params.id,
            }, { isDeleted: true }, { new: true })
            res.status(200).json({ comment, message: 'Comment deleted successfully' });
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
            const task = await TaskComments.findOneAndUpdate({
                _id: req.params.id,
            }, { ...req.body }, { new: true })
            res.status(200).json({ task, message: 'Comment updated successfully' });
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
            }
            const comments = await TaskComments.find(filters).populate({ path: 'commenter', populate: { path: 'personalInfo', populate: { path: 'photo' } } },).skip(startIndex)
                .limit(limit)
                .sort({ createdAt: -1 });

            const totalComments = await TaskComments.countDocuments(filters);
            const totalPages = Math.ceil(totalComments / req.query.limit);

            res.status(200).json({
                comments,
                totalComments,
                currentPage: page,
                totalPages,
                message: 'Comments fetched successfully'
            });
        } catch (error) {
            console.error("taskController:update:error -", error);
            res.status(400).json(error);
        }
    },

}
module.exports = taskController