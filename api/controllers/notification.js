const EmployeeLeaveAllocation = require("../models/employeeLeaveAllocation");
const LeaveType = require("../models/leaveType");
const Notifications = require("../models/notification");

const leaveTypeController = {
  async markRead(req, res) {
    try {
      const notification = await Notifications.updateMany(
        {
          receiver: req.user?._id,
          _id: { $in: req.body.notificationIds },
        },
        { isRead: true },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Notifications marked as read successfully" });
    } catch (error) {
      console.error("leaveTypeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async readAll(req, res) {
    try {
      const notification = await Notifications.updateMany(
        {
          receiver: req.user?._id,
        },
        { isRead: true },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "All notifications marked as read successfully" });
    } catch (error) {
      console.error("leaveTypeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async unreadCount(req, res) {
    try {
      const notification = await Notifications.countDocuments({
        receiver: req.user?._id,
        isRead: false,
        isDeleted: false,
      });
      res.status(200).json({
        count: notification,
        message: "Unread notifications count fetched successfully",
      });
    } catch (error) {
      console.error("leaveTypeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async list(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;

      let filters = { isDeleted: false, receiver: req.user?._id };

      const notifications = await Notifications.find(filters)
        .populate({
          path: "sender",
          populate: { path: "personalInfo", populate: { path: "photo" } },
        })
        .skip(startIndex)
        .limit(limit)
        .sort({ createdAt: -1 });

      const totalNotifications = await Notifications.countDocuments(filters);
      const totalPages = Math.ceil(totalNotifications / req.query.limit);

      res.status(200).json({
        notifications,
        totalNotifications,
        currentPage: page,
        totalPages,
        message: "Notifications fetched successfully",
      });
    } catch (error) {
      console.error("leaveTypeController:list:error -", error);
      res.status(400).json(error);
    }
  },
};
module.exports = leaveTypeController;
