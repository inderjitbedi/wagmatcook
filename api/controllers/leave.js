const notificationConstants = require("../constants/notificationConstants");
const leaveStatus = require("../enum/leaveStatus");
const notificationType = require("../enum/notificationType");
const roles = require("../enum/roles");
const EmployeeLeaveAllocation = require("../models/employeeLeaveAllocation");
const EmployeeLeaveHistory = require("../models/employeeLeaveHistory");
const LeaveType = require("../models/leaveType");
const Notifications = require("../models/notification");
const User = require("../models/user");
const sendGrid = require("../providers/sendGrid");
const EmployeePosition = require("../models/employeePositionHistory");
const mongoose = require("mongoose");

const leaveController = {
  async list(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;

      let filters = { isDeleted: false, responder: req.user._id };

      // if (req.query.searchKey) {
      //     filters.$or = [
      //         { name: { $regex: req.query.searchKey, $options: 'i' } },
      //         { description: { $regex: req.query.searchKey, $options: 'i' } }
      //     ];
      // }
      const leaves = await EmployeeLeaveHistory.find(filters)
        .populate([
          {
            path: "employee",
            populate: {
              path: "personalInfo",
              populate: {
                path: "photo",
              },
            },
          },
          {
            path: "responder",
            populate: {
              path: "personalInfo",
            },
          },
          {
            path: "leaveType",
          },
        ])
        .skip(startIndex)
        .limit(limit)
        .sort({ createdAt: -1 });

      const totalLeaves = await EmployeeLeaveHistory.countDocuments(filters);
      const totalPages = Math.ceil(totalLeaves / req.query.limit);

      res.status(200).json({
        leaves,
        totalLeaves,
        currentPage: page,
        totalPages,
        message: "Leave requests fetched successfully",
      });
    } catch (error) {
      console.error("leaveTypeController:list:error -", error);
      res.status(400).json(error);
    }
  },
  async listAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;

      let filters = { isDeleted: false };

      if (req.query.searchKey) {
        filters.$or = [
          { name: { $regex: req.query.searchKey, $options: "i" } },
          { description: { $regex: req.query.searchKey, $options: "i" } },
        ];
      }
     if (req.query.leaveType) {
       filters["leaveType._id"] = req.query.leaveType;
     }
      const leaves = await EmployeeLeaveHistory.find(filters)
        .populate([
          {
            path: "employee",
            populate: [
              {
                path: "personalInfo",
                populate: {
                  path: "photo",
                },
              },
            ],
          },
          {
            path: "responder",
            populate: {
              path: "personalInfo",
            },
          },

          {
            path: "leaveType",
          },
        ])
        .skip(startIndex)
        .limit(limit)
        .sort({ createdAt: -1 });
       
      const employeeIds = leaves.map((leave) => leave.employee._id);

      const positionHistory = await EmployeePosition.find({
        employee: { $in: employeeIds },
        isPrimary: true,
      }).populate("department");

      const leavesWithPositions = await leaves.map((leave) => {
        const employeePosition = positionHistory.find(
          (position) =>
            position.employee.toString() === leave.employee._id.toString()
        );

        // Add the position to the leave
        return {
          ...leave.toObject(),
          positions: [employeePosition],
        };
      });
      console.log("this is uppdated leave list ", leavesWithPositions);
      const totalLeaves = await EmployeeLeaveHistory.countDocuments(filters);
      const totalPages = Math.ceil(totalLeaves / req.query.limit);

      res.status(200).json({
        leaves: leavesWithPositions,
        totalLeaves,
        currentPage: page,
        totalPages,
        message: "Leave requests fetched successfully",
      });
    } catch (error) {
      console.error("leaveTypeController:list:error -", error);
      res.status(400).json(error);
    }
  },
  async respondLeaveRequest(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id }).populate(
        "personalInfo"
      );
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      let { leaveType } = req.body;
      let allocation = await EmployeeLeaveAllocation.findOne({
        leaveType,
        employee: req.params.id,
        isDeleted: false,
      }).populate("leaveType");
      if (!allocation)
        return res.status(400).json({ message: "Leave type not allocated." });

      let burnedHours = 0;
      let requestedHours = 0;
      let leaves = await EmployeeLeaveHistory.find({
        leaveType: leaveType,
        employee: req.params.id,
        isDeleted: false,
        status: { $ne: leaveStatus.REJECTED },
      }).select("hours");
      for (const leave of leaves) {
        if (leave._id === req.params.requestid) {
          requestedHours = leave.hours;
        }
        burnedHours += leave.hours;
      }

      if (
        req.body.isApproved &&
        requestedHours > allocation?.totalAllocation - burnedHours
      ) {
        return res.status(400).json({ message: "Insufficent balance" });
      }

      let payload = {
        ...req.body,
        employee: req.params.id,
        responder: req.user._id,
        status: req.body.isApproved
          ? leaveStatus.APPROVED
          : leaveStatus.REJECTED,
      };

      let request = await EmployeeLeaveHistory.findOneAndUpdate(
        { _id: req.params.requestid },
        payload
      );
      await request.save();
      request = await request.populate([
        {
          path: "employee",
          populate: {
            path: "personalInfo",
            populate: {
              path: "photo",
            },
          },
        },
        {
          path: "responder",
          populate: {
            path: "personalInfo",
            populate: {
              path: "photo",
            },
          },
        },
        {
          path: "leaveType",
        },
      ]);
      let type = req.body.isApproved
        ? notificationType.LEAVE_APPROVED
        : notificationType.LEAVE_REJECTED;
      const notification = new Notifications({
        title:
          notificationConstants[type].title
            ?.replace(
              "{responder}",
              [
                req.user?.personalInfo.firstName,
                req.user?.personalInfo.lastName,
              ].join(" ")
            )
            .replace("{leavetype}", allocation.leaveType.name) || "",
        description: notificationConstants[type].description || "",
        type: type,
        sender: req.user._id,
        receiver: req.params.id,
        dataId: leaves._id,
      });
      await notification.save();

      //
      if (request.employee.role === roles.EMPLOYEE)
        request.redirectUrl = `${process.env.FRONTEND_URL}user-management/leaves/${request.employee._id}`;
      else if (request.employee.role === roles.MANAGER)
        request.redirectUrl = `${process.env.FRONTEND_URL}manager-management/leave/history`;
      else if (request.employee.role === roles.HR)
        request.redirectUrl = `${process.env.FRONTEND_URL}hr-management/leave/history`;

      sendGrid.send(
        request.employee.email,
        req.body.isApproved ? "leaveApproved" : "leaveRejected",
        { request }
      );

      res.status(200).json({
        message: `Employee leave request ${
          req.body.isApproved ? "approved" : "rejected"
        } successfully`,
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
};
module.exports = leaveController;
