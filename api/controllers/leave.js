const notificationConstants = require("../constants/notificationConstants");
const leaveStatus = require("../enum/leaveStatus");
const notificationType = require("../enum/notificationType");
const roles = require("../enum/roles");
const EmployeeLeaveAllocation = require("../models/employeeLeaveAllocation");
const EmployeeLeaveHistory = require("../models/employeeLeaveHistory");
const LeaveType = require("../models/leaveType");
const Notifications = require("../models/notification");
const User = require("../models/user");
const UserOrganization = require("../models/userOrganization");
const sendGrid = require("../providers/sendGrid");
const EmployeePosition = require("../models/employeePositionHistory");
const mongoose = require("mongoose");
const pdfTemplate = require("../utils/pdfTemplate");
const pdfGenerator = require("../utils/pdfGenerator");
const path = require("path");
const fs = require("fs");
const Department = require("../models/department");

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

      const userOrganization = await UserOrganization.findOne({
        user: req.user._id,
      });

      if (!userOrganization) {
        return res.status(400).json({ message: "User organization not found" });
      }
      // const organizationID = userOrganization.organization;
      const organizationID = req.organization._id;

      console.log("this is user", organizationID);

      let pipeline = [
        {
          $match: {
            isDeleted: false,
            role: { $ne: roles.ORG_ADMIN },
          },
        },
        {
          $lookup: {
            from: "userorganizations",
            localField: "employee",
            foreignField: "user",
            as: "userOrganizations",
          },
        },
        {
          $match: {
            "userOrganizations.organization": organizationID || null,
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
          $lookup: {
            from: "employeepersonalinfos",
            localField: "employeeData._id",
            foreignField: "employee",
            as: "personalInfo",
          },
        },
        {
          $unwind: "$personalInfo",
        },
        {
          $lookup: {
            from: "employeepositionhistories",
            localField: "employeeData._id",
            foreignField: "employee",
            as: "positions",
          },
        },
        {
          $unwind: "$positions",
        },
        {
          $match: {
            "positions.isPrimary": true,
          },
        },
        {
          $lookup: {
            from: "departments",
            localField: "positions.department",
            foreignField: "_id",
            as: "departmentsData",
          },
        },
        {
          $unwind: "$departmentsData",
        },
        {
          $lookup: {
            from: "files",
            localField: "personalInfo.photo",
            foreignField: "_id",
            as: "photo",
          },
        },
        {
          $unwind: "$photo",
        },
        {
          $lookup: {
            from: "leavetypes",
            localField: "leaveType",
            foreignField: "_id",
            as: "leaveType",
          },
        },
        {
          $unwind: "$leaveType",
        },

        {
          $sort: {
            createdAt: -1,
          },
        },
      ];

      // Conditionally add a $match stage for searchKey
      if (req.query.searchKey) {
        pipeline.push({
          $match: {
            $or: [
              { name: { $regex: req.query.searchKey, $options: "i" } },
              {
                "personalInfo.firstName": {
                  $regex: req.query.searchKey,
                  $options: "i",
                },
              },
              {
                "personalInfo.lastName": {
                  $regex: req.query.searchKey,
                  $options: "i",
                },
              },
              {
                "departmentsData.name": {
                  $regex: req.query.searchKey,
                  $options: "i",
                },
              },
              {
                "leaveType.name": {
                  $regex: req.query.searchKey,
                  $options: "i",
                },
              },
            ],
          },
        });
      }

      // Conditionally add a $match stage for leaveType
      if (req.query.leaveType) {
        const leaveTypeId = new mongoose.Types.ObjectId(req.query.leaveType);
        pipeline.push({
          $match: {
            "leaveType._id": leaveTypeId,
          },
        });
      }

      // Conditionally add a $match stage for department
      if (req.query.department) {
        const departmentId = new mongoose.Types.ObjectId(req.query.department);
        pipeline.push({
          $match: {
            "positions.department": departmentId,
          },
        });
      }

      if (req.query.startDate && req.query.endDate) {
        const startDate = new Date(req.query.startDate);
        const endDate = new Date(req.query.endDate);

        pipeline.push({
          $match: {
            $and: [{ from: { $gte: startDate } }, { to: { $lte: endDate } }],
          },
        });
      } else if (req.query.startDate) {
        const startDate = new Date(req.query.startDate);
        pipeline.push({
          $match: {
            from: { $gte: startDate },
          },
        });
      } else if (req.query.endDate) {
        const endDate = new Date(req.query.endDate);
        pipeline.push({
          $match: {
            to: { $lte: endDate },
          },
        });
      }

      const leaves = await EmployeeLeaveHistory.aggregate([
        ...pipeline,
        {
          $skip: startIndex,
        },
        {
          $limit: limit,
        },
      ]);
      let totalLeaves = await EmployeeLeaveHistory.aggregate(pipeline);
      totalLeaves = totalLeaves.length > 0 ? totalLeaves.length : 0;
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
  async generatePdf(req, res) {
    try {
      const organizationID = req.organization._id;

      let pipeline = [
        {
          $match: {
            isDeleted: false,
            role: { $ne: roles.ORG_ADMIN },
          },
        },
        {
          $lookup: {
            from: "userorganizations",
            localField: "employee",
            foreignField: "user",
            as: "userOrganizations",
          },
        },
        {
          $match: {
            "userOrganizations.organization": organizationID || null,
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
          $lookup: {
            from: "employeepersonalinfos",
            localField: "employeeData._id",
            foreignField: "employee",
            as: "personalInfo",
          },
        },
        {
          $unwind: "$personalInfo",
        },
        {
          $lookup: {
            from: "employeepositionhistories",
            localField: "employeeData._id",
            foreignField: "employee",
            as: "positions",
          },
        },
        {
          $unwind: "$positions",
        },
        {
          $match: {
            "positions.isPrimary": true,
          },
        },
        {
          $lookup: {
            from: "departments",
            localField: "positions.department",
            foreignField: "_id",
            as: "departmentsData",
          },
        },
        {
          $unwind: "$departmentsData",
        },
        {
          $lookup: {
            from: "files",
            localField: "personalInfo.photo",
            foreignField: "_id",
            as: "photo",
          },
        },
        {
          $unwind: "$photo",
        },
        {
          $lookup: {
            from: "leavetypes",
            localField: "leaveType",
            foreignField: "_id",
            as: "leaveType",
          },
        },
        {
          $unwind: "$leaveType",
        },

        {
          $sort: {
            createdAt: -1,
          },
        },
      ];

      // Conditionally add a $match stage for leaveType
      if (req.query.leaveType) {
        const leaveTypeId = new mongoose.Types.ObjectId(req.query.leaveType);
        pipeline.push({
          $match: {
            "leaveType._id": leaveTypeId,
          },
        });
      }

      // Conditionally add a $match stage for department
      if (req.query.department) {
        const departmentId = new mongoose.Types.ObjectId(req.query.department);
        pipeline.push({
          $match: {
            "positions.department": departmentId,
          },
        });
      }

      if (req.query.startDate && req.query.endDate) {
        const startDate = new Date(req.query.startDate);
        const endDate = new Date(req.query.endDate);

        pipeline.push({
          $match: {
            $and: [{ from: { $gte: startDate } }, { to: { $lte: endDate } }],
          },
        });
      } else if (req.query.startDate) {
        const startDate = new Date(req.query.startDate);
        pipeline.push({
          $match: {
            from: { $gte: startDate },
          },
        });
      } else if (req.query.endDate) {
        const endDate = new Date(req.query.endDate);
        pipeline.push({
          $match: {
            to: { $lte: endDate },
          },
        });
      }
      const LeaveName = await LeaveType.findOne({
        _id: req.query.leaveType,
        isDeleted: false,
      });
      const DepartmentName = await Department.findOne({
        _id: req.query.department,
        isDeleted: false,
      });

      const LeaveDetails = {
        leaveType: LeaveName?.name,
        department: DepartmentName?.name,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
      };
      const leaves = await EmployeeLeaveHistory.aggregate([...pipeline]);
      // console.log("this our leaves", leaves);
      const htmlTemplate = await pdfTemplate.leaveReports(leaves, LeaveDetails);
      // console.log("this is my template", htmlTemplate);
      const pdfOutputPath = path.join(__dirname, `Leave_report.pdf`);
      await pdfGenerator(htmlTemplate, pdfOutputPath, `<p></p>`);

      // Send the generated PDF as a response
      res.status(200).sendFile(pdfOutputPath, () => {
        // Remove the generated PDF file after sending
        //  fs.unlinkSync(pdfOutputPath);
      });
    } catch (error) {
      console.error("jobController:list:error -", error);
      res.status(400).json(error);
    }
  },

  async respondLeaveRequest(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id }).populate(
        "personalInfo"
      );
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }
      let leaveRequest = await EmployeeLeaveHistory.findOne({
        _id: req.params.requestid,
      });

      const { leaveType } = req.body;

      var allocation = await EmployeeLeaveAllocation.findOne({
        leaveType,
        employee: req.params.id,
        isDeleted: false,
      }).populate("leaveType");
      let leaveDoc = await LeaveType.findOne({
        _id: leaveType,
        isDeleted: false,
      });
      console.log("11111111", allocation, "at top");
      if (leaveDoc.isSpecial) {
      } else {
        if (leaveRequest.nature === "ADDITION") {
          if (req.body.isApproved) {
            allocation = await EmployeeLeaveAllocation.findOneAndUpdate(
              {
                leaveType: leaveType,
                employee: req.params.id,
                isDeleted: false,
              },
              {
                $inc: {
                  totalAllocation: leaveRequest.hours,
                  balance: leaveRequest.hours,
                },
              },
              { upsert: true, new: true }
            );
            allocation = await allocation.populate("leaveType");
            console.log("2222222", allocation, "new allocation added ");
          } else {
            if (!allocation) {
              allocation = new EmployeeLeaveAllocation({
                leaveType: leaveType,
                employee: req.params.id,
                totalAllocation: 0,
                balance: 0,
              });
              await allocation.save();
              allocation = await allocation.populate("leaveType");
              console.log("333333", allocation, "new allocation added ");
            }
          }
        } else {
          if (!allocation)
            return res
              .status(400)
              .json({ message: "Leave type not allocated." });

          let burnedHours = 0;
          let requestedHours = leaveRequest.hours;

          // let leaves = await EmployeeLeaveHistory.find({
          //   leaveType: leaveType,
          //   employee: req.params.id,
          //   isDeleted: false,
          //   status: { $ne: leaveStatus.REJECTED },
          //   nature: "SUBSTRACTION",
          // }).select("hours");

          // for (const leave of leaves) {
          //   if (leave._id === req.params.requestid) {
          //     requestedHours = leave.hours;
          //   }
          //   burnedHours += leave.hours;
          // }
          // console.log(
          //   "this ----",
          //   allocation?.totalAllocation,
          //   burnedHours,
          //   requestedHours,
          //   "-------"
          // );
          // if (
          //   req.body.isApproved &&
          //   requestedHours > allocation?.balance
          // ) {
          //   return res.status(400).json({ message: "Insufficient balance" });
          // }
          if (!req.body.isApproved) {
            allocation = await EmployeeLeaveAllocation.findOneAndUpdate(
              {
                leaveType: leaveType,
                employee: req.params.id,
                isDeleted: false,
              },
              { $inc: { balance: requestedHours } },
              { new: true }
            ).populate("leaveType");
          }
        }
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
        payload,
        { new: true }
      );
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
            .replace("{leavetype}", leaveDoc.name) || "",
        description: notificationConstants[type].description || "",
        type: type,
        sender: req.user._id,
        receiver: req.params.id,
        dataId: req.params.requestid,
      });
      await notification.save();

      if (request.employee.role === roles.EMPLOYEE)
        request.redirectUrl = `${process.env.FRONTEND_URL}user-management/leave/history/${request.employee._id}`;
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
