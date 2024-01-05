const leaveStatus = require("../enum/leaveStatus");
const EmployeeCertificates = require("../models/employeeCertificates");
const EmployeeLeaveHistory = require("../models/employeeLeaveHistory");
const EmployeePositionHistory = require("../models/employeePositionHistory");
const EmployeePersonalInfo = require("../models/employeePersonalInfo");
const User = require("../models/user");
const UserOrganization = require("../models/userOrganization");
const Department = require("../models/department");
const moment = require("moment");
const dashboardController = {
  // async departments(req, res) {
  //   try {
  //     // let users = await EmployeePositionHistory.aggregate([
  //     //     {
  //     //         $match: {
  //     //             department: {
  //     //                 $in: req.body.departments.map(departmentId => new mongoose.Types.ObjectId(departmentId))
  //     //             },
  //     //             isDeleted: false
  //     //         },
  //     //     },
  //     //     {
  //     //         $lookup: {
  //     //             from: 'users',
  //     //             localField: 'employee',
  //     //             foreignField: '_id',
  //     //             as: 'employeeData'
  //     //         }
  //     //     },
  //     //     {
  //     //         $unwind: '$employeeData'
  //     //     },
  //     //     {
  //     //         $match: {
  //     //             "employeeData.isActive": true,
  //     //             "employeeData.isDeleted": false,
  //     //         }
  //     //     },
  //     //     {
  //     //         $lookup: {
  //     //             from: 'userorganizations',
  //     //             localField: 'employee',
  //     //             foreignField: 'user',
  //     //             as: 'relation'
  //     //         }
  //     //     },
  //     //     {
  //     //         $unwind: '$relation'
  //     //     },
  //     //     {
  //     //         $match: {
  //     //             "relation.organization": req.body.organization,
  //     //         }
  //     //     },
  //     //     {
  //     //         $lookup: {
  //     //             from: 'employeepersonalinfos',
  //     //             localField: 'employeeData.personalInfo',
  //     //             foreignField: '_id',
  //     //             as: 'personalInfoData'
  //     //         }
  //     //     },

  //     //     {
  //     //         $unwind: '$personalInfoData'
  //     //     },
  //     //     {
  //     //         $group: {
  //     //             _id: '$employeeData._id',
  //     //             document: { $first: '$$ROOT' }
  //     //         }
  //     //     },
  //     //     {
  //     //         $replaceRoot: { newRoot: '$document' }
  //     //     }
  //     // ])
  //     console.log("org details", req.user._id);
  //     const userOrganization = await UserOrganization.findOne({
  //       user: req.user._id,
  //     });
  //     if (!userOrganization) {
  //       return res.status(400).json({ message: "User organization not found" });
  //     }
  //     const organizationID = userOrganization.organization;

  //     let departmentEmployees = await EmployeePositionHistory.aggregate([
  //       {
  //         $match: {
  //           isDeleted: false,
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "users",
  //           localField: "employee",
  //           foreignField: "_id",
  //           as: "employeeData",
  //         },
  //       },
  //       {
  //         $unwind: "$employeeData",
  //       },
  //       {
  //         $match: {
  //           "employeeData.isActive": true,
  //           "employeeData.isDeleted": false,
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "userorganizations",
  //           localField: "employee",
  //           foreignField: "user",
  //           as: "relation",
  //         },
  //       },
  //       {
  //         $unwind: "$relation",
  //       },
  //       {
  //         $match: {
  //           "relation.organization": organizationID,
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "employeepersonalinfos",
  //           localField: "employeeData.personalInfo",
  //           foreignField: "_id",
  //           as: "personalInfoData",
  //         },
  //       },
  //       {
  //         $unwind: "$personalInfoData",
  //       },
  //       {
  //         $lookup: {
  //           from: "departments", // Adjust this based on your actual department collection name
  //           localField: "department",
  //           foreignField: "_id",
  //           as: "departmentInfo",
  //         },
  //       },
  //       {
  //         $unwind: "$departmentInfo",
  //       },
  //       {
  //         $group: {
  //           _id: "$department",
  //           totalEmployees: { $sum: 1 },
  //           departmentDetails: { $first: "$departmentInfo" }, // Include department details
  //           documents: { $push: "$$ROOT" },
  //         },
  //       },
  //       {
  //         $project: {
  //           _id: 1,
  //           totalEmployees: 1,
  //           departmentDetails: 1,
  //           documents: 1,
  //         },
  //       },
  //       {
  //         $limit: 3,
  //       },
  //     ]);
  //     console.log(departmentEmployees);
  //     const totalDepartments = await Department.countDocuments({
  //       organization: organizationID,
  //       isDeleted: false,
  //     });
  //     res.status(200).json({
  //       departmentEmployees,
  //       totalDepartments,
  //       message: "Dashboard data fetched successfully",
  //     });
  //   } catch (error) {
  //     console.error("departmentController:list:error -", error);
  //     res.status(400).json(error);
  //   }
  // },
  async departments(req, res) {
    try {
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
          $group: {
            _id: "$department",
            totalEmployees: { $sum: 1 },
            documents: { $push: "$$ROOT" },
          },
        },
      ]);

      // Retrieve all departments from the departments collection
      const allDepartments = await Department.find({
        organization: organizationID,
        isDeleted: false,
      });

      // Use $map to combine the employee data and department data
      const departmentData = allDepartments.map((department) => {
        const matchedDepartment = departmentEmployees.find(
          (dep) => dep._id && dep._id.toString() === department._id.toString()
        );

        return {
          _id: department._id,
          totalEmployees: matchedDepartment
            ? matchedDepartment.totalEmployees
            : 0,
          departmentDetails: department,
          documents: matchedDepartment ? matchedDepartment.documents : [],
        };
      });
      departmentData.sort((a, b) => b.totalEmployees - a.totalEmployees);

      // Limit the result to 3 departments
      const limitedDepartments = departmentData.slice(0, 3);
      const totalDepartments = departmentData.length;

      res.status(200).json({
        departmentEmployees: limitedDepartments,
        totalDepartments,
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
      const upcomingBirthdays = await EmployeePersonalInfo.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $gte: [{ $dayOfMonth: "$dob" }, moment().date()] },
                {
                  $lt: [
                    { $dayOfMonth: "$dob" },
                    moment().add(7, "days").date(),
                  ],
                },
                { $eq: [{ $month: "$dob" }, moment().month() + 1] }, // Months are zero-based, so add 1
              ],
            },
            isDeleted: false,
            employee: {
              $in: (
                await UserOrganization.find({
                  organization: req.organization._id,
                })
              ).map((userOrg) => userOrg.user),
            },
          },
        },
        {
          $lookup: {
            from: "employeepositionhistories", // Assuming this is your collection name for EmployeePositionHistory
            localField: "employee",
            foreignField: "employee",
            as: "employeePositionHistory",
          },
        },
        {
          $unwind: "$employeePositionHistory",
        },
        {
          $match: {
            "employeePositionHistory.isDeleted": false,
            "employeePositionHistory.isPrimary": true,
          },
        },
      ]);

      const formattedUpcomingBirthdays = upcomingBirthdays.map((employee) => {
        const dob = moment(employee.dob);
        const currentYear = moment().year();
        const newDate = moment([currentYear, dob.month(), dob.date()]);

        return {
          type: "Birthday",
          date: dob.format("DD MMM"),
          newDate: newDate.format("YYYY-MM-DD"),
          employee: {
            id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            positionTitle: employee.employeePositionHistory.title,
          },
        };
      });
      console.log("this is the org id:", req.organization._id);
      const upcomingWorkAnniversaries = await EmployeePositionHistory.aggregate(
        [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $gte: [
                      { $dayOfMonth: "$startDate" },
                      { $dayOfMonth: moment().toDate() },
                    ],
                  },
                  {
                    $lt: [
                      { $dayOfMonth: "$startDate" },
                      { $dayOfMonth: moment().add(7, "days").toDate() },
                    ],
                  },
                  {
                    $eq: [
                      { $month: "$startDate" },
                      { $month: moment().toDate() },
                    ],
                  },
                ],
              },
              isDeleted: false,
              employee: {
                $in: (
                  await UserOrganization.find({
                    organization: req.organization._id,
                  })
                ).map((userOrg) => userOrg.user),
              },
            },
          },
          {
            $sort: {
              startDate: 1, // Sort by startDate in ascending order
            },
          },
          {
            $group: {
              _id: "$employee",
              earliestStartDate: { $first: "$startDate" },
              title: { $last: "$title" },
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
            $project: {
              type: "Work Anniversary",
              date: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$earliestStartDate",
                },
              },
              employee: {
                id: "$_id",
                firstName: { $arrayElemAt: ["$personalInfo.firstName", 0] },
                lastName: { $arrayElemAt: ["$personalInfo.lastName", 0] },
                positionTitle: "$title",
              },
            },
          },
        ]
      );

      const formattedUpcomingWorkAnniversaries = upcomingWorkAnniversaries.map(
        (workAnniversary) => {
          const anniversaryDate = moment(workAnniversary.date);
          const currentYear = moment().year();
          const newDate = moment([
            currentYear,
            anniversaryDate.month(),
            anniversaryDate.date(),
          ]);

          return {
            type: workAnniversary.type,
            date: anniversaryDate.format("DD MMM"),
            newDate: newDate.format("YYYY-MM-DD"),
            employee: workAnniversary.employee,
          };
        }
      );
      const upcomingEvents = formattedUpcomingBirthdays.concat(
        formattedUpcomingWorkAnniversaries
      );
      upcomingEvents.sort((a, b) => {
        const dateA = moment(a.newDate);
        const dateB = moment(b.newDate);

        if (dateA.isBefore(dateB)) {
          return -1;
        } else if (dateA.isAfter(dateB)) {
          return 1;
        } else {
          return 0;
        }
      });
      res.status(200).json({
        leaves,
        certificates,
        upcomingEvents,
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
