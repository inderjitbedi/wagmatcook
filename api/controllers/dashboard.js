const leaveStatus = require("../enum/leaveStatus");
const EmployeeCertificates = require("../models/employeeCertificates");
const EmployeeLeaveHistory = require("../models/employeeLeaveHistory");
const EmployeePositionHistory = require("../models/employeePositionHistory");
const UserOrganization = require("../models/userOrganization");

const dashboardController = {
  async departments(req, res) {
    try {
      // let users = await EmployeePositionHistory.aggregate([
      //     {
      //         $match: {
      //             department: {
      //                 $in: req.body.departments.map(departmentId => new mongoose.Types.ObjectId(departmentId))
      //             },
      //             isDeleted: false
      //         },
      //     },
      //     {
      //         $lookup: {
      //             from: 'users',
      //             localField: 'employee',
      //             foreignField: '_id',
      //             as: 'employeeData'
      //         }
      //     },
      //     {
      //         $unwind: '$employeeData'
      //     },
      //     {
      //         $match: {
      //             "employeeData.isActive": true,
      //             "employeeData.isDeleted": false,
      //         }
      //     },
      //     {
      //         $lookup: {
      //             from: 'userorganizations',
      //             localField: 'employee',
      //             foreignField: 'user',
      //             as: 'relation'
      //         }
      //     },
      //     {
      //         $unwind: '$relation'
      //     },
      //     {
      //         $match: {
      //             "relation.organization": req.body.organization,
      //         }
      //     },
      //     {
      //         $lookup: {
      //             from: 'employeepersonalinfos',
      //             localField: 'employeeData.personalInfo',
      //             foreignField: '_id',
      //             as: 'personalInfoData'
      //         }
      //     },

      //     {
      //         $unwind: '$personalInfoData'
      //     },
      //     {
      //         $group: {
      //             _id: '$employeeData._id',
      //             document: { $first: '$$ROOT' }
      //         }
      //     },
      //     {
      //         $replaceRoot: { newRoot: '$document' }
      //     }
      // ])
      console.log("org details", req.user._id);
      const userOrganization = await UserOrganization.findOne({
        user: req.user._id,
      });
      if (!userOrganization) {
        return res.status(400).json({ message: "User organization not found" });
      }
      const organizationID = userOrganization.organization;

      let departmentEmployees = await EmployeePositionHistory.aggregate([
        {
          $match: {
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
            from: "userorganizations",
            localField: "employee",
            foreignField: "user",
            as: "relation",
          },
        },
        {
          $unwind: "$relation",
        },
        {
          $match: {
            "relation.organization": organizationID,
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
          $lookup: {
            from: "departments", // Adjust this based on your actual department collection name
            localField: "department",
            foreignField: "_id",
            as: "departmentInfo",
          },
        },
        {
          $unwind: "$departmentInfo",
        },
        {
          $group: {
            _id: "$department",
            totalEmployees: { $sum: 1 },
            departmentDetails: { $first: "$departmentInfo" }, // Include department details
            documents: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            _id: 1,
            totalEmployees: 1,
            departmentDetails: 1,
            documents: 1,
          },
        },
        {
          $limit: 3,
        },
      ]);
      console.log(departmentEmployees);

      res.status(200).json({
        departmentEmployees,
        message: "Dashboard data fetched successfully",
      });
    } catch (error) {
      console.error("departmentController:list:error -", error);
      res.status(400).json(error);
    }
  },
  async hrData(req, res) {
    try {
      let filters = {
        isDeleted: false,
        responder: req.user._id,
        status: leaveStatus.PENDING,
      };
      const userRole = req.user.role;
      if (userRole === "EMPLOYEE") {
        // If the user is an EMPLOYEE, change the filters accordingly
        filters = {
          isDeleted: false,
          employee: req.user._id,
          status: leaveStatus.PENDING,
        };
      }

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
            path: "leaveType",
          },
        ])
        .sort({ createdAt: -1 })
        .limit(5);

      const today = new Date();
      const oneWeekFromNow = new Date(today);
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Add 7 days to today's date

      const certificates = await EmployeeCertificates.find({
        employee: req.user._id,
        expiryDate: {
          $gte: today,
          $lt: oneWeekFromNow,
        },
      });

      res.status(200).json({
        leaves,
        certificates,
        // usersWithUpcomingBirthdays,

        message: "Dashboard data fetched successfully",
      });
    } catch (error) {
      console.error("departmentController:list:error -", error);
      res.status(400).json(error);
    }
  },
};
module.exports = dashboardController;
