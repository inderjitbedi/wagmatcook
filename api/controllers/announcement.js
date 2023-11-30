const { default: mongoose } = require("mongoose");
const Announcement = require("../models/announcement");
const EmployeePositionHistory = require("../models/employeePositionHistory");
const roles = require("../enum/roles");

async function processUsers(announcement, users) {
  for (const user of users) {
    if (user.employeeData.role === roles.EMPLOYEE)
      announcement.redirectUrl = `${process.env.FRONTEND_URL}user-management/announcement/details/${announcement._id}`;
    else if (user.employeeData.role === roles.MANAGER)
      announcement.redirectUrl = `${process.env.FRONTEND_URL}manager-management/announcement/details/${announcement._id}`;
    else if (user.employeeData.role === roles.HR)
      announcement.redirectUrl = `${process.env.FRONTEND_URL}hr-management/announcement/details/${announcement._id}`;
    else
      announcement.redirectUrl = `${process.env.FRONTEND_URL}organization-admin/announcement/details/${announcement._id}`;

    // console.log({ announcement, user: user.personalInfoData });
    // sendGrid.send(user.employeeData.email, 'announcement', { announcement, user: user.personalInfoData });

    console.log("Welcome email sent to ", user.employeeData.email);
  }
}
const announcementController = {
  async create(req, res) {
    try {
      req.body.createdBy = req.user._id;
      req.body.organization = req.organization?._id || null;
      const announcement = new Announcement(req.body);
      await announcement.save();
      announcement.shortDescription =
        announcement.description?.substring(
          0,
          announcement.description?.length / 2 || 50
        ) + "...";

      let users = await EmployeePositionHistory.aggregate([
        {
          $match: {
            department: {
              $in: req.body.departments.map(
                (departmentId) => new mongoose.Types.ObjectId(departmentId)
              ),
            },
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "employee",
            foreignField: "_id",
            as: "employeeData",
          },
        },
        {
          $unwind: "$employeeData",
        },
        {
          $match: {
            "employeeData.isActive": true,
            "employeeData.isDeleted": false,
          },
        },
        {
          $lookup: {
            from: "employeepersonalinfos",
            localField: "employeeData.personalInfo",
            foreignField: "_id",
            as: "personalInfoData",
          },
        },

        {
          $unwind: "$personalInfoData",
        },
        {
          $group: {
            _id: "$employeeData._id",
            document: { $first: "$$ROOT" },
          },
        },
        {
          $replaceRoot: { newRoot: "$document" },
        },
      ]);

      processUsers(announcement, users);

      res
        .status(201)
        .json({ announcement, message: "Announcement created successfully." });
    } catch (error) {
      console.error("announcementController:create:error -", error);
      res.status(400).json(error);
    }
  },
  async update(req, res) {
    try {
      req.body.updatedBy = req.user._id;
      req.body.organization = req.organization?._id || null;
      const announcement = await Announcement.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res
        .status(200)
        .json({ announcement, message: "Announcement updated successfully" });
    } catch (error) {
      console.error("announcementController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async delete(req, res) {
    try {
      req.body.updatedBy = req.user._id;
      const announcement = await Announcement.findByIdAndUpdate(req.params.id, {
        isDeleted: true,
      });
      res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
      console.error("announcementController:delete:error -", error);
      res.status(400).json(error);
    }
  },
  async detail(req, res) {
    try {
      let announcement = await Announcement.findOne({
        _id: req.params.id,
        isDeleted: false,
      }).populate("organization departments attachment");
      await announcement.save();
      res.status(201).json({
        announcement,
        message: "Announcement details fetched successfully.",
      });
    } catch (error) {
      console.error("announcementController:detail:error -", error);
      res.status(400).json(error);
    }
  },
  async list(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9999;
      const startIndex = (page - 1) * limit;

      let filters = {
        isDeleted: false,
        organization: req.organization?._id || null,
      };

      if (req.query.searchKey) {
        filters.$or = [
          { title: { $regex: req.query.searchKey, $options: "i" } },
          { description: { $regex: req.query.searchKey, $options: "i" } },
        ];
      }
      const announcements = await Announcement.find(filters)
        .populate("organization departments attachment")
        .skip(startIndex)
        .limit(limit)
        .sort({ createdAt: -1 });

      const totalAnnouncements = await Announcement.countDocuments(filters);
      const totalPages = Math.ceil(totalAnnouncements / req.query.limit);

      res.status(200).json({
        announcements,
        totalAnnouncements,
        currentPage: page,
        totalPages,
        message: "Announcements fetched successfully",
      });
    } catch (error) {
      console.error("announcementController:list:error -", error);
      res.status(400).json(error);
    }
  },
  async dashboardList(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 4;
      const startIndex = (page - 1) * limit;

      let filters = {
        isDeleted: false,
        organization: req.organization?._id || null,
      };

      const announcements = await Announcement.find(filters)
        .skip(startIndex)
        .limit(limit)
        .sort({ createdAt: -1 });

      const totalAnnouncements = await Announcement.countDocuments(filters);
      const totalPages = Math.ceil(totalAnnouncements / req.query.limit);

      res.status(200).json({
        announcements,
        totalAnnouncements,
        currentPage: page,
        totalPages,
        message: "Announcements fetched successfully",
      });
    } catch (error) {
      console.error("announcementController:list:error -", error);
      res.status(400).json(error);
    }
  },
};
module.exports = announcementController;
