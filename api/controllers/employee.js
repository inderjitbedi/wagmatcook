const roles = require("../enum/roles");
const EmployeePersonalInfo = require("../models/employeePersonalInfo");
const User = require("../models/user");
const UserOrganization = require("../models/userOrganization");

const File = require("../models/file");
const EmployeeJobDetails = require("../models/employeeJobDetails");
const EmployeePositionHistory = require("../models/employeePositionHistory");
const fileController = require("../controllers/file");
const EmployeeBenefits = require("../models/employeeBenefits");
const EmployeeCertificates = require("../models/employeeCertificates");
const EmployeeType = require("../models/employeeType");
const EmployeeReviews = require("../models/employeeReviews");
const EmployeeDisciplinaries = require("../models/employeeDisciplinaries");
const EmployeeLeaveAllocation = require("../models/employeeLeaveAllocation");
const EmployeeDocuments = require("../models/employeeDocuments");
const EmployeeLeaveHistory = require("../models/employeeLeaveHistory");
const leaveStatus = require("../enum/leaveStatus");
const sendGrid = require("../providers/sendGrid");
const Notifications = require("../models/notification");
const notificationType = require("../enum/notificationType");
const notificationConstants = require("../constants/notificationConstants");
const Offboarding = require("../models/offboarding");
const pdfTemplate = require("../utils/pdfTemplate");
const pdfGenerator = require("../utils/pdfGenerator");
const path = require("path");
const fs = require("fs");

const employeeController = {
  async list(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9999;
      const startIndex = (page - 1) * limit;

      let filters = { isDeleted: false, role: { $ne: roles.ORG_ADMIN } };

      console.log(req.user._id);
      if (req.query.searchKey) {
        filters.$or = [
          { name: { $regex: req.query.searchKey, $options: "i" } },
          { email: { $regex: req.query.searchKey, $options: "i" } },
          { role: { $regex: req.query.searchKey, $options: "i" } },
          // { "personalInfo.firstName": { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.lastName': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.address': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.city': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.province': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.postalCode': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.homePhone': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.mobile': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.personalEmail': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.emergencyContact': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.emergencyContactNumber': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.employeeId': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.sin': { $regex: req.query.searchKey, $options: 'i' } },
        ];
      }
      let sortBy = req.query.sortBy || "createdAt";
      let sortOrder = parseInt(req.query.sortOrder);
      if (sortOrder === 0 || !sortOrder) {
        sortBy = "createdAt";
        sortOrder = -1;
      }

      let sortOptions = {};
      if (sortBy && sortOrder) {
        sortOptions[sortBy] = sortOrder;
      }
      console.log(sortOptions);
      const employees = await User.aggregate([
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
          $unwind: "$personalInfo",
        },
        // {
        //     $match: {
        //         $or: [
        //             { "personalInfo.firstName": { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.lastName': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.address': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.city': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.province': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.postalCode': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.homePhone': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.mobile': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.personalEmail': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.emergencyContact': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.emergencyContactNumber': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.employeeId': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.sin': { $regex: req.query.searchKey, $options: 'i' } },
        //         ],
        //     },
        // },

        {
          $lookup: {
            from: "employeejobdetails",
            localField: "_id",
            foreignField: "employee",
            as: "jobDetails",
          },
        },
        {
          $lookup: {
            from: "employeepositionhistories",
            localField: "_id",
            foreignField: "employee",
            as: "positions",
          },
        },
        {
          $lookup: {
            from: "departments",
            localField: "positions.department",
            foreignField: "_id",
            as: "departmentInfo",
          },
        },
        {
          $unwind: "$positions",
        },
        {
          $match: {
            "positions.isPrimary": true,
            "positions.isDeleted": false,
          },
        },
        {
          $addFields: {
            departmentInfo: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$departmentInfo",
                    as: "dept",
                    cond: {
                      $eq: ["$$dept._id", "$positions.department"],
                    },
                  },
                },
                0,
              ],
            },
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

        {
          $sort: sortOptions,
        },

        {
          $skip: startIndex,
        },
        {
          $limit: limit,
        },
      ]);

      let totalEmployees = await UserOrganization.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: "$userData",
        },
        {
          $match: {
            "userData.isActive": true,
            "userData.isDeleted": false,
            organization: req.organization?._id || null,
            "userData.role": { $ne: roles.ORG_ADMIN },
          },
        },
      ]).count("user");
      totalEmployees = totalEmployees.length > 0 ? totalEmployees[0].user : 0;
      const totalPages = Math.ceil(totalEmployees / req.query.limit);
      res.status(200).json({
        employees,
        totalEmployees,
        currentPage: page,
        totalPages,
        sortBy,
        sortOrder,
        message: "Employees fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:list:error -", error);
      res.status(400).json(error);
    }
  },

  async listForManager(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9999;
      const startIndex = (page - 1) * limit;

      let filters = { isDeleted: false, role: { $ne: roles.ORG_ADMIN } };

      const selectedEmployeeInfo = await User.aggregate([
        {
          $match: { _id: req.user._id },
        },
        {
          $lookup: {
            from: "employeepositionhistories",
            localField: "_id",
            foreignField: "employee",
            as: "positions",
          },
        },
        {
          $match: { "positions.isPrimary": true, "positions.isDeleted": false },
        },
        {
          $project: {
            primaryDepartment: "$positions.department",
          },
        },
        {
          $unwind: "$primaryDepartment",
        },
      ]);

      const primaryDepartmentId = selectedEmployeeInfo[0]?.primaryDepartment;

      if (req.query.searchKey) {
        filters.$or = [
          { name: { $regex: req.query.searchKey, $options: "i" } },
          { email: { $regex: req.query.searchKey, $options: "i" } },
          { role: { $regex: req.query.searchKey, $options: "i" } },
          // { "personalInfo.firstName": { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.lastName': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.address': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.city': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.province': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.postalCode': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.homePhone': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.mobile': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.personalEmail': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.emergencyContact': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.emergencyContactNumber': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.employeeId': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.sin': { $regex: req.query.searchKey, $options: 'i' } },
        ];
      }
      let sortBy = req.query.sortBy || "createdAt";
      let sortOrder = parseInt(req.query.sortOrder);
      if (sortOrder === 0 || !sortOrder) {
        sortBy = "createdAt";
        sortOrder = -1;
      }

      let sortOptions = {};
      if (sortBy && sortOrder) {
        sortOptions[sortBy] = sortOrder;
      }
      const employees = await User.aggregate([
        {
          $match: filters,
        },
        {
          $match: {
            _id: { $ne: req.user._id }, // Exclude the selected user
          },
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
          $unwind: "$personalInfo",
        },
        {
          $lookup: {
            from: "employeejobdetails",
            localField: "_id",
            foreignField: "employee",
            as: "jobDetails",
          },
        },
        {
          $lookup: {
            from: "employeepositionhistories",
            localField: "_id",
            foreignField: "employee",
            as: "positions",
          },
        },
        {
          $match: {
            $or: [
              {
                "positions.isPrimary": true,
                "positions.reportsTo": req.user._id,
              },
              {
                "positions.department": primaryDepartmentId,
                "positions.isPrimary": true,
              },
            ],
          },
        },
        {
          $lookup: {
            from: "departments",
            localField: "positions.department",
            foreignField: "_id",
            as: "departmentInfo",
          },
        },
        {
          $unwind: "$positions",
        },
        {
          $match: {
            "positions.isPrimary": true,
            "positions.isDeleted": false,
          },
        },
        {
          $addFields: {
            departmentInfo: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$departmentInfo",
                    as: "dept",
                    cond: {
                      $eq: ["$$dept._id", "$positions.department"],
                    },
                  },
                },
                0,
              ],
            },
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
        {
          $sort: sortOptions,
        },
        {
          $skip: startIndex,
        },
        {
          $limit: limit,
        },
      ]);

      let totalEmployees = await User.aggregate([
        {
          $match: filters,
        },
        {
          $match: {
            _id: { $ne: req.user._id }, // Exclude the selected user
          },
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
          $unwind: "$personalInfo",
        },
        {
          $lookup: {
            from: "employeejobdetails",
            localField: "_id",
            foreignField: "employee",
            as: "jobDetails",
          },
        },
        {
          $lookup: {
            from: "employeepositionhistories",
            localField: "_id",
            foreignField: "employee",
            as: "positions",
          },
        },
        {
          $match: {
            $or: [
              {
                "positions.isPrimary": true,
                "positions.reportsTo": req.user._id,
              },

              {
                "positions.isPrimary": true,
                "positions.department": primaryDepartmentId,
              },
            ],
          },
        },
      ]);

      totalEmployees = totalEmployees.length;
      const totalPages = Math.ceil(totalEmployees / req.query.limit);
      res.status(200).json({
        employees,
        totalEmployees,
        currentPage: page,
        totalPages,
        sortBy,
        sortOrder,
        message: "Employees fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:list:error -", error);
      res.status(400).json(error);
    }
  },
  async listBebEligible(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9999;
      const startIndex = (page - 1) * limit;

      let filters = { isDeleted: false, role: { $ne: roles.ORG_ADMIN } };

      console.log(req.user._id);
      if (req.query.searchKey) {
        filters.$or = [
          { name: { $regex: req.query.searchKey, $options: "i" } },
          { email: { $regex: req.query.searchKey, $options: "i" } },
          { role: { $regex: req.query.searchKey, $options: "i" } },
          // { "personalInfo.firstName": { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.lastName': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.address': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.city': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.province': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.postalCode': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.homePhone': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.mobile': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.personalEmail': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.emergencyContact': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.emergencyContactNumber': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.employeeId': { $regex: req.query.searchKey, $options: 'i' } },
          // { 'personalInfo.sin': { $regex: req.query.searchKey, $options: 'i' } },
        ];
      }
      const employees = await User.aggregate([
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
          $unwind: "$personalInfo",
        },
        // {
        //     $match: {
        //         $or: [
        //             { "personalInfo.firstName": { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.lastName': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.address': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.city': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.province': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.postalCode': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.homePhone': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.mobile': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.personalEmail': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.emergencyContact': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.emergencyContactNumber': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.employeeId': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.sin': { $regex: req.query.searchKey, $options: 'i' } },
        //         ],
        //     },
        // },

        {
          $lookup: {
            from: "employeejobdetails",
            localField: "_id",
            foreignField: "employee",
            as: "jobDetails",
          },
        },
        {
          $lookup: {
            from: "employeepositionhistories",
            localField: "_id",
            foreignField: "employee",
            as: "positions",
          },
        },
        {
          $addFields: {
            positions: {
              $filter: {
                input: "$positions",
                as: "position",
                cond: {
                  $eq: ["$$position.isDeleted", false],
                },
              },
            },
          },
        },
        {
          $match: {
            $expr: {
              $in: [true, "$positions.isBebEligible"],
            },
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
        {
          $lookup: {
            from: "departments",
            localField: "positions.department", // Adjust field names as per your data model
            foreignField: "_id",
            as: "departmentInfo",
          },
        },
        {
          $unwind: "$departmentInfo",
        },
        {
          $sort: {
            "positions.startDate": -1, // Sort by startDate in descending order
          },
        },

        {
          $skip: startIndex,
        },
        {
          $limit: limit,
        },
      ]);

      let totalEmployees = await UserOrganization.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: "$userData",
        },
        {
          $match: {
            "userData.isActive": true,
            "userData.isDeleted": false,
            organization: req.organization?._id || null,
            "userData.role": { $ne: roles.ORG_ADMIN },
          },
        },
      ]).count("user");
      totalEmployees = totalEmployees.length > 0 ? totalEmployees[0].user : 0;
      const totalPages = Math.ceil(totalEmployees / req.query.limit);
      res.status(200).json({
        employees,
        totalEmployees,
        currentPage: page,
        totalPages,
        message: "Employees fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:list:error -", error);
      res.status(400).json(error);
    }
  },
  async generatePdf(req, res) {
    try {
      let filters = { isDeleted: false, role: { $ne: roles.ORG_ADMIN } };
      const employees = await User.aggregate([
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
          $unwind: "$personalInfo",
        },
        // {
        //     $match: {
        //         $or: [
        //             { "personalInfo.firstName": { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.lastName': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.address': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.city': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.province': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.postalCode': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.homePhone': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.mobile': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.personalEmail': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.emergencyContact': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.emergencyContactNumber': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.employeeId': { $regex: req.query.searchKey, $options: 'i' } },
        //             { 'personalInfo.sin': { $regex: req.query.searchKey, $options: 'i' } },
        //         ],
        //     },
        // },

        {
          $lookup: {
            from: "employeejobdetails",
            localField: "_id",
            foreignField: "employee",
            as: "jobDetails",
          },
        },
        {
          $lookup: {
            from: "employeepositionhistories",
            localField: "_id",
            foreignField: "employee",
            as: "positions",
          },
        },
        {
          $addFields: {
            positions: {
              $filter: {
                input: "$positions",
                as: "position",
                cond: {
                  $eq: ["$$position.isDeleted", false],
                },
              },
            },
          },
        },
        {
          $match: {
            $expr: {
              $in: [true, "$positions.isBebEligible"],
            },
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
        {
          $lookup: {
            from: "departments",
            localField: "positions.department", // Adjust field names as per your data model
            foreignField: "_id",
            as: "departmentInfo",
          },
        },
        {
          $unwind: "$departmentInfo",
        },
        {
          $sort: {
            "positions.startDate": -1, // Sort by startDate in descending order
          },
        },
      ]);
      // console.log("this is employee ebe list ", employees);
      const htmlTemplate = await pdfTemplate.bebEligibleReports(employees);
      // console.log("this is my template", htmlTemplate);
      const pdfOutputPath = path.join(__dirname, `BEB_report.pdf`);
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
  async getActiveList(req, res) {
    try {
      const employees = await UserOrganization.aggregate([
        {
          $match: {
            organization: req.organization?._id || null,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: "$userData",
        },
        {
          $lookup: {
            from: "employeepersonalinfos",
            localField: "user",
            foreignField: "employee",
            as: "personalInfo",
          },
        },

        {
          $unwind: "$personalInfo",
        },
        {
          $match: {
            "userData.isDeleted": false,
            "userData.isActive": true,
            "userData.role": { $ne: roles.ORG_ADMIN },
            $or: [
              {
                "userData.email": {
                  $regex: req.query.searchKey || "",
                  $options: "i",
                },
              },
              {
                "personalInfo.firstName": {
                  $regex: req.query.searchKey || "",
                  $options: "i",
                },
              },
              {
                "personalInfo.lastName": {
                  $regex: req.query.searchKey || "",
                  $options: "i",
                },
              },
            ],
          },
        },
      ]);
      res.status(200).json({
        employees,
        message: "Employees fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:list:error -", error);
      res.status(400).json(error);
    }
  },
  async dashboardList(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 4;
      const startIndex = (page - 1) * limit;

      const employees = await UserOrganization.aggregate([
        {
          $match: {
            organization: req.organization?._id || null,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: "$userData",
        },
        {
          $match: { "userData.isDeleted": false, "userData.isActive": true },
        },
        {
          $lookup: {
            from: "employeepersonalinfos",
            localField: "user",
            foreignField: "employee",
            as: "personalInfo",
          },
        },
        {
          $lookup: {
            from: "employeepositionhistories",
            localField: "user",
            foreignField: "employee",
            as: "positions",
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
        {
          $project: {
            userData: 1,
            personalInfo: 1,
            positions: 1,
            photoInfo: 1,
          },
        },
        {
          $unwind: {
            path: "$positions",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            $or: [
              { "positions.isPrimary": true },
              { "positions.isPrimary": { $exists: false } },
            ],
            "positions.isDeleted": false,
          },
        },
        {
          $skip: startIndex,
        },
        {
          $limit: limit,
        },
      ]);

      const totalEmployees = await UserOrganization.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: "$userData",
        },
        {
          $match: {
            "userData.isActive": true,
            "userData.isDeleted": false,
            organization: req.organization?._id || null,
            "userData.role": { $ne: roles.ORG_ADMIN },
          },
        },
      ]).count("user");
      res.status(200).json({
        employees,
        totalEmployees: totalEmployees[0]?.user || 0,
        message: "Employees fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:list:error -", error);
      res.status(400).json(error);
    }
  },

  async add(req, res) {
    try {
      const userExists = await User.findOne({
        email: req.body.email,
        isDeleted: false,
      });
      if (userExists) {
        return res
          .status(400)
          .json({ message: "User email already registered" });
      }

      let user = new User({ email: req.body.email, role: roles.EMPLOYEE });
      // const token = crypto.randomBytes(20).toString('hex');
      // user.invitationToken = token;
      // user.invitationTokenExpiry = Date.now() + (3600000 * 24);
      await user.save();

      const relation = new UserOrganization({
        user: user._id,
        organization: req.organization?._id || null,
      });
      await relation.save();

      const { firstName, lastName } = req.body;

      const personalInfo = new EmployeePersonalInfo({
        employee: user._id,
        firstName,
        lastName,
      });
      await personalInfo.save();
      user = await User.findByIdAndUpdate(
        user._id,
        { personalInfo: personalInfo._id },
        { new: true }
      );
      res.status(200).json({
        employee: user,
        message: "Employee added successfully",
      });
    } catch (error) {
      console.error("employeeController:add:error -", error);
      res.status(400).json(error);
    }
  },

  async delete(req, res) {
    try {
      let user = await User.findOne({ _id: req.params.id });
      console.log("++++this is user : ", user, " +++++++++++++++++");
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }
      if (user.role === roles.HR || user.role === roles.MANAGER) {
        const hasDirectReports = await EmployeePositionHistory.find({
          isPrimary: true,
          isDeleted: false,
          reportsTo: req.params.id,
        });
        if (hasDirectReports.length > 1) {
          return res.status(400).json({
            message: `Cannot delete the ${
              user.role === roles.HR ? "Hr" : " Manager"
            } as they have other employees under them.`,
          });
        }
      }

      user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { isDeleted: true }
      );
      res.status(200).json({
        message: "Employee deleted successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async updatePersonalInfo(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      let emailExists = await User.findOne({
        email: req.body.workEmail,
        _id: { $ne: req.params.id },
      });
      if (emailExists) {
        return res
          .status(400)
          .json({ message: "Duplicate employee work email" });
      }

      let file = await File.findOne({ _id: req.body.photo });
      if (file) {
        req.body.photo = await fileController.moveToUploads(req, file);
      }

      const personalInfo = await EmployeePersonalInfo.findOneAndUpdate(
        { employee: req.params.id },
        req.body,
        { new: true }
      );

      user.email = req.body.workEmail;
      user.isActive = req.body.isActive;
      user.save();

      res.status(200).json({
        personalInfo,
        message: "Employee personal info updated successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async getPersonalInfo(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      const personalInfo = await EmployeePersonalInfo.findOne({
        employee: req.params.id,
      }).populate("photo employee");

      res.status(200).json({
        personalInfo,
        message: "Employee personal info fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async getReportsToList(req, res) {
    try {
      if (req.organization._id) {
        let users = await UserOrganization.aggregate([
          {
            $match: { organization: req.organization._id },
          },
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "userData",
            },
          },
          {
            $unwind: "$userData",
          },
          {
            $lookup: {
              from: "employeepersonalinfos",
              localField: "user",
              foreignField: "employee",
              as: "personalInfo",
            },
          },
          {
            $match: {
              "userData.role": { $ne: roles.EMPLOYEE },
            },
          },
        ]);
        res.status(200).json({
          users,
          message: "Reports to list fetched successfully",
        });
      } else
        res.status(200).json({
          users: [],
          message: "Reports to list fetched successfully",
        });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async getCompletedByListWithSearch(req, res) {
    try {
      if (req.organization._id) {
        const pipeline = [
          {
            $match: { organization: req.organization._id },
          },
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "userData",
            },
          },
          {
            $unwind: "$userData",
          },
          {
            $lookup: {
              from: "employeepersonalinfos",
              localField: "user",
              foreignField: "employee",
              as: "personalInfo",
            },
          },
          {
            $match: {
              "userData.role": { $ne: roles.EMPLOYEE },
            },
          },
        ];

        if (req.params.searchKey) {
          pipeline.push({
            $match: {
              $or: [
                {
                  "personalInfo.firstName": {
                    $regex: req.params.searchKey,
                    $options: "i",
                  },
                },
                {
                  "personalInfo.lastName": {
                    $regex: req.params.searchKey,
                    $options: "i",
                  },
                },
                {
                  "userData.email": {
                    $regex: req.params.searchKey,
                    $options: "i",
                  },
                },
              ],
            },
          });
        }

        const users = await UserOrganization.aggregate(pipeline);

        res.status(200).json({
          users,
          message: "Reports to list fetched successfully",
        });
      } else
        res.status(200).json({
          users: [],
          message: "Reports to list fetched successfully",
        });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async updateJobDetails(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }
      // req.body.details.reportsTo = req.user._id
      // req.body.details.employee = req.params.id
      // const details = await EmployeeJobDetails.findOneAndUpdate({ employee: req.params.id }, req.body.details, { upsert: true, new: true })

      let positions = req.body.positions;
      let isActive = req.body.isActive;

      const primaryPositions = positions.filter(
        (position) => position.isPrimary === true
      );

      if (primaryPositions.length) {
        if (primaryPositions.length > 1) {
          return res
            .status(400)
            .json({ message: "Primary position can't be more than one" });
        }
      } else {
        return res
          .status(400)
          .json({ message: "Atleast one primary position required" });
      }

      let updatedPositions = [];
      for (const position of positions) {
        if (position._id) {
          const existingPosition =
            await EmployeePositionHistory.findByIdAndUpdate(
              position._id,
              { $set: { ...position, employee: req.params.id } },
              { new: true }
            );
          updatedPositions.push(existingPosition);
        } else {
          const newPosition = new EmployeePositionHistory({
            ...position,
            employee: req.params.id,
          });
          await newPosition.save();
          updatedPositions.push(newPosition);
        }
      }

      const existingPositionIds = updatedPositions.map((code) => code._id);
      await EmployeePositionHistory.updateMany(
        { employee: req.params.id, _id: { $nin: existingPositionIds } },
        { isDeleted: true },
        { new: true }
      );

      await User.findByIdAndUpdate(req.params.id, {
        role: primaryPositions[0].role,
        isActive,
      });

      res.status(200).json({
        positions: updatedPositions,
        message: "Employee job details updated successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async getJobDetails(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      // const details = await EmployeeJobDetails.findOne({ employee: req.params.id }).populate('department employee employeeType')

      const positions = await EmployeePositionHistory.find({
        employee: req.params.id,
        isDeleted: false,
      })
        .populate("department reportsTo employeeType")
        .sort({ startDate: -1 });

      // const personalInfo = await EmployeePersonalInfo.findOne({ employee: req.params.id }).populate('photo employee')

      res.status(200).json({
        positions,
        message: "Employee job details fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async addPosition(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }
      if (req.body.isPrimary) {
        await EmployeePositionHistory.updateMany(
          { employee: req.params.id },
          { isPrimary: false }
        );
      } else {
        let primaryPosition = await EmployeePositionHistory.find({
          employee: req.params.id,
          isPrimary: true,
          isDeleted: false,
        });

        if (!primaryPosition.length) {
          return res.status(400).json({
            message: "Atleast one primary position required for an employee",
          });
        }
      }

      const position = new EmployeePositionHistory({
        ...req.body,
        employee: req.params.id,
      });
      await position.save();

      if (req.body.isPrimary) {
        await User.findByIdAndUpdate(req.params.id, { role: req.body.role });
      }

      res.status(200).json({
        position,
        message: "Employee position added successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async updateBenefit(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      const benefit = await EmployeeBenefits.findOneAndUpdate(
        { employee: req.params.id },
        req.body,
        { new: true, upsert: true }
      );

      res.status(200).json({
        benefit,
        message: "Employee benefit updated successfully",
      });
    } catch (error) {
      console.error("employeeController:updateBenefit:error -", error);
      res.status(400).json(error);
    }
  },
  async getBenefit(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      const benefit = await EmployeeBenefits.findOne({
        employee: req.params.id,
      }).populate("employee benefit");

      res.status(200).json({
        benefit,
        message: "Employee benefit fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:getBenefit:error -", error);
      res.status(400).json(error);
    }
  },

  async addCertificate(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }
      let certificate = req.body;
      if (certificate.file) {
        let file = await File.findOne({ _id: certificate.file });
        if (file) {
          certificate.file = await fileController.moveToUploads(req, file);
        }
      }
      certificate = new EmployeeCertificates({
        ...certificate,
        employee: req.params.id,
      });
      await certificate.save();

      res.status(200).json({
        certificate,
        message: "Employee certificate added successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async updateCertificates(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      let { certificates } = req.body;
      let updatedCertificates = [];

      for (const certificate of certificates) {
        if (certificate.file) {
          let file = await File.findOne({ _id: certificate.file });
          if (file) {
            certificate.file = await fileController.moveToUploads(req, file);
          }
        }
        if (certificate._id) {
          const existingCertificate =
            await EmployeeCertificates.findByIdAndUpdate(
              certificate._id,
              { $set: { ...certificate, employee: req.params.id } },
              { new: true }
            );
          updatedCertificates.push(existingCertificate);
        } else {
          const newCertificate = new EmployeeCertificates({
            ...certificate,
            employee: req.params.id,
          });
          await newCertificate.save();
          updatedCertificates.push(newCertificate);
        }
      }

      const existingCertificateIds = updatedCertificates.map(
        (code) => code._id
      );
      await EmployeeCertificates.updateMany(
        { employee: req.params.id, _id: { $nin: existingCertificateIds } },
        { isDeleted: true },
        { new: true }
      );

      res.status(200).json({
        message: "Employee certificates updated successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async updateCertificate(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }
      let certificate = req.body;
      if (certificate.file) {
        let file = await File.findOne({ _id: certificate.file });
        if (file) {
          certificate.file = await fileController.moveToUploads(req, file);
        }
      }
      // if (certificate._id) {
      const existingCertificate = await EmployeeCertificates.findByIdAndUpdate(
        req.params.certificateid,
        { $set: { ...certificate, employee: req.params.id } },
        { new: true }
      );
      // } else {
      //     const newCertificate = new EmployeeCertificates({ ...certificate, employee: req.params.id });
      //     await newCertificate.save();
      // }

      res.status(200).json({
        message: "Employee certificates updated successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async getCertificates(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }
      const certificates = await EmployeeCertificates.find({
        employee: req.params.id,
        isDeleted: false,
      })
        .populate("file employee")
        .sort({ completionDate: -1 });

      res.status(200).json({
        certificates,
        message: "Employee certificates fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async deleteCertificate(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      const certificate = await EmployeeCertificates.findOneAndUpdate(
        { _id: req.params.certificateid },
        { isDeleted: true }
      );

      res.status(200).json({
        certificate,
        message: "Employee certificate deleted successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async getReviews(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }
      //console.log("first", req.params.id);
      const reviews = await EmployeeReviews.aggregate([
        {
          $match: {
            employee: user._id,
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "completedBy",
            foreignField: "_id",
            as: "completedBy",
          },
        },
        {
          $lookup: {
            from: "files",
            let: { fileId: "$file" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$fileId"] },
                },
              },
            ],
            as: "file",
          },
        },

        {
          $lookup: {
            from: "employeepersonalinfos",
            localField: "completedBy._id",
            foreignField: "employee",
            as: "personalInfo",
          },
        },
        {
          $unwind: {
            path: "$file",
            preserveNullAndEmptyArrays: true, // Preserve documents with empty arrays
          },
        },
        // {
        //     $project: {
        //         file: 1,
        //         employee: 1,
        //         completedBy: {
        //             _id: '$completedBy._id',
        //             name: '$completedBy.firstName',
        //             personalInfo: {
        //                 $cond: {
        //                     if: { $gt: [{ $size: '$completedByUserPersonalInfo' }, 0] }, // Check if the array is not empty
        //                     then: '$completedByUserPersonalInfo', // Include personalInfo if it's not empty
        //                     else: null, // Otherwise, set it to null or omit it
        //                 },
        //             },
        //         },
        //     },
        // },
      ]);
      //console.log("Reviews:", reviews);

      res.status(200).json({
        reviews,
        message: "Employee reviews fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async addReview(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      let file = await File.findOne({ _id: req.body.file });
      if (file) {
        req.body.file = await fileController.moveToUploads(req, file);
      }

      if (!req.body.completedBy || !req.body.completedBy.length) {
        req.body.completedBy = [req.user._id];
      }
      const review = new EmployeeReviews({
        ...req.body,
        employee: req.params.id,
      });
      await review.save();

      res.status(200).json({
        review,
        message: "Employee review added successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async updateReview(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      let file = await File.findOne({ _id: req.body.file });
      if (file) {
        req.body.file = await fileController.moveToUploads(req, file);
      }

      if (!req.body.completedBy || !req.body.completedBy.length) {
        req.body.completedBy = [req.user._id];
      }
      const review = await EmployeeReviews.findOneAndUpdate(
        { _id: req.params.reviewid },
        { ...req.body, employee: req.params.id }
      );

      res.status(200).json({
        review,
        message: "Employee review updated successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async deleteReview(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      const review = await EmployeeReviews.findOneAndUpdate(
        { _id: req.params.reviewid },
        { isDeleted: true }
      );

      res.status(200).json({
        review,
        message: "Employee review deleted successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async getDisciplinaries(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }
      const disciplinaries = await EmployeeDisciplinaries.find({
        employee: req.params.id,
        isDeleted: false,
      }).populate("file employee disciplinary");

      res.status(200).json({
        disciplinaries,
        message: "Employee disciplinaries fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async addDisciplinary(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      let file = await File.findOne({ _id: req.body.file });
      if (file) {
        req.body.file = await fileController.moveToUploads(req, file);
      }
      const disciplinary = new EmployeeDisciplinaries({
        ...req.body,
        employee: req.params.id,
      });
      await disciplinary.save();

      res.status(200).json({
        disciplinary,
        message: "Employee disciplinary added successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async updateDisciplinary(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      let file = await File.findOne({ _id: req.body.file });
      if (file) {
        req.body.file = await fileController.moveToUploads(req, file);
      }

      const disciplinary = await EmployeeDisciplinaries.findOneAndUpdate(
        { _id: req.params.disciplinaryid },
        { ...req.body, employee: req.params.id }
      );

      res.status(200).json({
        disciplinary,
        message: "Employee disciplinary updated successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async deleteDisciplinary(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      const disciplinary = await EmployeeDisciplinaries.findOneAndUpdate(
        { _id: req.params.disciplinaryid },
        { isDeleted: true }
      );

      res.status(200).json({
        disciplinary,
        message: "Employee disciplinary deleted successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async addType(req, res) {
    try {
      const employeeType = new EmployeeType({
        ...req.body,
        organization: req.organization?._id || null,
      });
      await employeeType.save();
      res.status(200).json({
        employeeType,
        message: "Employee type added successfully",
      });
    } catch (error) {
      console.error("employeeController:updateBenefit:error -", error);
      res.status(400).json(error);
    }
  },
  async updateType(req, res) {
    try {
      const employeeType = await EmployeeType.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, organization: req.organization?._id || null }
      );
      res.status(200).json({
        employeeType,
        message: "Employee type updated successfully",
      });
    } catch (error) {
      console.error("employeeController:updateBenefit:error -", error);
      res.status(400).json(error);
    }
  },
  async getTypes(req, res) {
    try {
      const types = await EmployeeType.find({
        organization: req.organization?._id || null,
        isDeleted: false,
      });

      res.status(200).json({
        types,
        message: "Employee types fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:getBenefit:error -", error);
      res.status(400).json(error);
    }
  },

  async addDocument(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      const document = new EmployeeDocuments({
        ...req.body,
        employee: req.params.id,
      });
      await document.save();

      res.status(200).json({
        document,
        message: "Employee document added successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async deleteDocument(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      let document = await EmployeeDocuments.findOneAndUpdate(
        { _id: req.params.documentid },
        { isDeleted: true },
        { new: true }
      );
      res.status(200).json({
        document,
        message: "Employee document deleted successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async getDocuments(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      const documents = await EmployeeDocuments.find({
        employee: req.params.id,
        isDeleted: false,
      }).populate("file");

      res.status(200).json({
        documents,
        message: "Employee documents fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:getBenefit:error -", error);
      res.status(400).json(error);
    }
  },
  async getEmployeeHeaderInfo(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      const personalInfo = await EmployeePersonalInfo.findOne({
        employee: req.params.id,
      })
        .select("firstName lastName")
        .populate({
          path: "photo",
          select: "destination name originalName path",
        });
      const position = await EmployeePositionHistory.findOne({
        employee: req.params.id,
        isDeleted: false,
      })
        .select("title")
        .populate([
          {
            path: "employee",
            select: "email",
          },
          {
            path: "department employeeType",
            select: "name",
          },
        ]);
      res.status(200).json({
        position,
        personalInfo,
        message: "Employee details fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:getBenefit:error -", error);
      res.status(400).json(error);
    }
  },

  async addLeaveAllocation(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      const allocation = new EmployeeLeaveAllocation({
        ...req.body,
        employee: req.params.id,
      });
      await allocation.save();

      res.status(200).json({
        allocation,
        message: "Employee leave allocation added successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async deleteLeaveAllocation(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      let allocation = await EmployeeLeaveAllocation.findOneAndUpdate(
        { _id: req.params.allocationid },
        { isDeleted: true },
        { new: true }
      );
      res.status(200).json({
        allocation,
        message: "Employee leave allocation deleted successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async updateLeaveAllocation(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      let allocation = await EmployeeLeaveAllocation.findOneAndUpdate(
        { _id: req.params.allocationid },
        { ...req.body },
        { new: true }
      );
      res.status(200).json({
        allocation,
        message: "Employee leave allocation updated successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
  async getLeaveAllocations(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      const allocations = await EmployeeLeaveAllocation.find({
        employee: req.params.id,
        isDeleted: false,
      }).populate({ path: "leaveType", select: "name" });
      res.status(200).json({
        allocations,
        message: "Employee allocations fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:getBenefit:error -", error);
      res.status(400).json(error);
    }
  },
  async getLeaveHistory(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9999;
      const startIndex = (page - 1) * limit;
      let filters = { employee: req.params.id, isDeleted: false };
      const history = await EmployeeLeaveHistory.find(filters)
        .populate({
          path: "responder",
          populate: {
            path: "personalInfo",
            populate: {
              path: "photo",
            },
          },
        })
        .populate("leaveType")
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit);
      const totalLeaveHistory = await EmployeeLeaveHistory.countDocuments(
        filters
      );
      const totalPages = Math.ceil(totalLeaveHistory / req.query.limit);
      res.status(200).json({
        history,
        totalLeaveHistory,
        currentPage: page,
        totalPages,
        message: "Employee leave history fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:getLeaveHistory:error -", error);
      res.status(400).json(error);
    }
  },

  async getLeaveRequest(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      const request = await EmployeeLeaveHistory.findOne({
        employee: req.params.id,
        _id: req.params.requestid,
        isDeleted: false,
      }).populate([
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
      if (!request) {
        const deletedLeave = await EmployeeLeaveHistory.findOne({
          _id: req.params.requestid,
          isDeleted: true,
        });

        if (deletedLeave) {
          return res.status(400).json({ message: "The leave is deleted." });
        }

        return res.status(400).json({ message: "Leave not found." });
      }
      res.status(200).json({
        request,
        message: "Employee leave request fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:getLeaveRequest:error -", error);
      res.status(400).json(error);
    }
  },

  async addLeaveRequest(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id }).populate(
        "personalInfo"
      );
      const isLiueTime = req.query.lieuTime;
      console.log("this is value in prams ", isLiueTime);
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }
      let { leaveType, hours: requestedHours } = req.body;
      if (isLiueTime) {
        // const lieuAllocation = await EmployeeLeaveAllocation.findOneAndUpdate(
        //   {
        //     leaveType: leaveType,
        //     employee: req.params.id,
        //     isDeleted: false,
        //   },
        //   { $inc: { totalAllocation: requestedHours } },
        //   { upsert: true, new: true }
        // ).populate("leaveType");

        // Create a leave history record for lieu time
        let lieuRequest = new EmployeeLeaveHistory({
          leaveType: leaveType._id,
          hours: requestedHours,

          employee: req.params.id,
          status: leaveStatus.PENDING,
          ...req.body,
        });
        await lieuRequest.save();

        // Populate the leave history record
        lieuRequest = await lieuRequest.populate([
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
        console.log("this is lieuRequest", lieuRequest);
        // Send notification for lieu time leave request
        const notification = new Notifications({
          title:
            notificationConstants[notificationType.LEAVE_REQUEST].title
              ?.replace(
                "{sender}",
                [user.personalInfo.firstName, user.personalInfo.lastName].join(
                  " "
                )
              )
              .replace("{leavetype}", leaveType.name) || "",
          description:
            notificationConstants[notificationType.LEAVE_REQUEST].description ||
            "",
          type: notificationType.LEAVE_REQUEST,
          sender: req.params.id,
          receiver: req.body.responder,
          dataId: lieuRequest._id,
        });
        await notification.save();

        sendGrid.send(req.body.responder.email, "leaveRequest", {
          request: lieuRequest,
        });

        return res.status(200).json({
          message: "Lieu time leave request sent successfully",
        });
      } else {
        let allocation = await EmployeeLeaveAllocation.findOne({
          leaveType,
          employee: req.params.id,
          isDeleted: false,
        }).populate("leaveType");
        if (!allocation)
          return res.status(400).json({ message: "Leave type not allocated." });

        let burnedHours = 0;
        let leaves = await EmployeeLeaveHistory.find({
          leaveType: leaveType,
          employee: req.params.id,
          isDeleted: false,
          status: { $ne: leaveStatus.REJECTED },
        }).select("hours");

        for (const leave of leaves) {
          burnedHours += leave.hours;
        }

        if (requestedHours > allocation?.totalAllocation - burnedHours) {
          return res.status(400).json({ message: "Insufficent balance" });
        }

        let request = new EmployeeLeaveHistory({
          ...req.body,
          employee: req.params.id,
          status: leaveStatus.PENDING,
        });
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

        const notification = new Notifications({
          title:
            notificationConstants[notificationType.LEAVE_REQUEST].title
              ?.replace(
                "{sender}",
                [user.personalInfo.firstName, user.personalInfo.lastName].join(
                  " "
                )
              )
              .replace("{leavetype}", allocation.leaveType.name) || "",
          description:
            notificationConstants[notificationType.LEAVE_REQUEST].description ||
            "",
          type: notificationType.LEAVE_REQUEST,
          sender: req.params.id,
          receiver: req.body.responder,
          dataId: request._id,
        });
        await notification.save();

        sendGrid.send(request.responder.email, "leaveRequest", { request });

        res.status(200).json({
          message: "Employee leave request sent successfully",
        });
      }
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async getLeaveBalance(req, res) {
    try {
      let leaves = await EmployeeLeaveAllocation.aggregate([
        { $match: { employee: req.user._id, isDeleted: false } },
        {
          $lookup: {
            from: "leavetypes",
            localField: "leaveType",
            foreignField: "_id",
            as: "leaveTypeObj",
          },
        },
        { $unwind: "$leaveTypeObj" },
        {
          $lookup: {
            from: "employeeleavehistories",
            localField: "leaveType",
            foreignField: "leaveType",
            as: "history",
          },
        },
        { $match: { "history.status": { $ne: leaveStatus.REJECTED } } },
        { $addFields: { consumed: { $sum: "$history.hours" } } },
        {
          $project: {
            consumed: 1,
            totalAllocation: 1,
            leaveType: 1,
            leaveTypeObj: 1,
          },
        },
        { $sort: { "leaveTypeObj.order": 1 } },
      ]);

      res.status(200).json({
        leaves,
        message: "Employee leave balance fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:getBenefit:error -", error);
      res.status(400).json(error);
    }
  },
  async offboard(req, res) {
    try {
      let user = await User.findOne({ _id: req.body.from });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }
      user = await User.findOne({ _id: req.body.to });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Provided invalid employee id." });
      }

      let relation = await EmployeePositionHistory.findOne({
        reportsTo: req.body.from,
        employee: req.body.to,
      });

      //console.log("relation = ", relation);
      if (relation) {
        return res
          .status(400)
          .json({ message: "One can't be it's own Reporting Manager." });
      }

      const offboard = await EmployeePositionHistory.updateMany(
        { reportsTo: req.body.from },
        { reportsTo: req.body.to }
      );

      // todo: pending leaves ?

      const offboarding = new Offboarding({
        ...req.body,
        doneBy: req.user._id,
      });
      await offboarding.save();

      // const filter = { from: req.body.from };
      // const update = {
      //     $setOnInsert: { doneBy: req.user._id },
      //     // Additional fields you want to update if the document is found
      // };

      // const options = { upsert: true, new: true };

      // const offboarding = await Offboarding.findOneAndUpdate({ from: req.body.from }, {
      //     ...req.body,
      //     doneBy: req.user._id,
      // }, { upsert: true, new: true });
      // //console.log(offboarding);
      res.status(200).json({
        message: "Employee responsibilities transferred successfully",
      });
    } catch (error) {
      console.error("employeeController:getBenefit:error -", error);
      res.status(400).json(error);
    }
  },
  async offboardingList(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9999;
      const startIndex = (page - 1) * limit;
      let filters = {
        isDeleted: false,
        role: { $nin: [roles.ORG_ADMIN, roles.EMPLOYEE] },
      };

      const employees = await User.aggregate([
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
            localField: "personalInfo",
            foreignField: "_id",
            as: "fromPersonalInfo",
          },
        },
        {
          $unwind: {
            path: "$fromPersonalInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "offboardings",
            localField: "_id",
            foreignField: "from",
            as: "offboardingData",
          },
        },
        {
          $unwind: {
            path: "$offboardingData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "offboardingData.to",
            foreignField: "_id",
            as: "offboardingData.to",
          },
        },
        {
          $unwind: {
            path: "$offboardingData.to",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "employeepersonalinfos",
            localField: "offboardingData.to.personalInfo",
            foreignField: "_id",
            as: "toPersonalInfo",
          },
        },
        {
          $unwind: {
            path: "$toPersonalInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $skip: startIndex,
        },
        {
          $limit: limit,
        },
      ]);
      let totalEmployees = await UserOrganization.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: "$userData",
        },
        {
          $match: {
            "userData.isActive": true,
            "userData.isDeleted": false,
            organization: req.organization?._id || null,
            "userData.role": { $nin: [roles.ORG_ADMIN, roles.EMPLOYEE] },
          },
        },
      ]).count("user");
      totalEmployees = totalEmployees.length > 0 ? totalEmployees[0].user : 0;
      const totalPages = Math.ceil(totalEmployees / req.query.limit);
      res.status(200).json({
        employees,
        totalEmployees,
        currentPage: page,
        totalPages,
        message: "Offboarding list fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:getBenefit:error -", error);
      res.status(400).json(error);
    }
  },

  async unwelcomedList(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9999;
      const startIndex = (page - 1) * limit;
      let filters = {
        organization: req.organization?._id || null,
        isActive: true,
        isDeleted: false,
        receivedWelcomeEmail: false,
        role: { $ne: roles.ORG_ADMIN },
      };
      let users = await User.find(filters)
        .populate("personalInfo")
        .skip(startIndex)
        .limit(limit);

      const totalUsers = await User.countDocuments(filters);
      const totalPages = Math.ceil(totalUsers / req.query.limit);
      res.status(200).json({
        users,
        totalUsers,
        currentPage: page,
        totalPages,
        message: "Unwelcomed employee list fetched successfully",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async sendWelcomeEmail(req, res) {
    try {
      if (req.body.users && req.body.users.length)
        await processUsers(req.body.users);
      res.status(200).json({
        message: "Welcome email sent successfully to the selected users.",
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },
};
async function processUsers(users) {
  for (let user of users) {
    console.log(user);
    // sendGrid.send(user.email, 'welcome', { user });
    let employee = await User.findOneAndUpdate(
      { _id: user },
      { receivedWelcomeEmail: true },
      { new: true }
    );
    console.log("Welcome email sent to ", employee.email);
  }
}
module.exports = employeeController;
