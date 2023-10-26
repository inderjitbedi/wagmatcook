const User = require("../models/user");
const Organization = require("../models/organization");
const path = require("path");
const fs = require("fs");
const File = require("../models/file");
const roles = require("../enum/roles");
const sendGrid = require("../providers/sendGrid.js");
const UserOrganization = require("../models/userOrganization");
const crypto = require("crypto");
const fileController = require("./file");
const EmployeePersonalInfo = require("../models/employeePersonalInfo");

// Function to create a directory if it doesn't exist
const createDirectoryIfNotExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const orgController = {
  async create(req, res) {
    try {

      let file = await File.findOne({ _id: req.body.file });
      if (file) {
        req.body.logo = await fileController.moveToUploads(req, file);
      }

      req.body.createdBy = req.user._id;

      const relation = await UserOrganization.findOne({
        user: req.user._id, isActive: true, isDeleted: false, isPrimary: true
      });
      let org = null;
      if (relation) {
        org = await Organization.findOneAndUpdate({ _id: relation.organization }, req.body)
      }
      res.status(200).json({
        organization: org,
        message: "Organization updated successfully.",
      });
    } catch (error) {
      console.error("authController:register:error -", error);
      res.status(400).json(error);
    }
  },
  async checkNameUniqueness(req, res) {
    try {
      const { name } = req.params;
      // Check if user already exists
      const existingOrg = await Organization.findOne({ name });
      // if (existingUser) {
      //     return res.status(409).json({ isUnique: !existingUser, message: 'User already exists' });
      // }
      res.json({ isUnique: !existingOrg });
    } catch (error) {
      console.error("authController:checkEmailUniqueness:error -", error);
      res.status(400).json({ message: error.toString() });
    }
  },
  async list(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9999;
      const startIndex = (page - 1) * limit;

      let filters = { isDeleted: false, isActive: true };

      if (req.query.searchKey) {
        filters.$or = [
          { name: { $regex: req.query.searchKey, $options: "i" } },
          // { description: { $regex: req.query.searchKey, $options: 'i' } }
        ];
      }
      const organizations = await Organization.find(filters)
        .skip(startIndex)
        .limit(limit)
        .sort({ createdAt: -1 });

      const totalOrganizations = await Organization.countDocuments(filters);
      const totalPages = Math.ceil(totalOrganizations / req.query.limit);

      res.status(200).json({
        organizations,
        totalOrganizations,
        currentPage: page,
        totalPages,
        message: "Organizations fetched successfully",
      });
    } catch (error) {
      console.error("organizationController:list:error -", error);
      res.status(400).json(error);
    }
  },

  async listOrganizationsWithPrimaryUsers(req, res) {
    try {
      const organizations = await Organization.aggregate([
        {
          $match: { isDeleted: false, isActive: true }, // Match active and non-deleted organizations
        },
        {
          $lookup: {
            from: "userorganizations", // Name of the UserOrganization collection
            localField: "_id",
            foreignField: "organization",
            as: "users",
          },
        },
        {
          $unwind: "$users", // Unwind the users array
        },
        {
          $match: { "users.isPrimary": true }, // Filter for users with isPrimary: true
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            size: { $first: "$size" },
            logo: { $first: "$logo" },
            createdBy: { $first: "$createdBy" },
            isActive: { $first: "$isActive" },
            isDeleted: { $first: "$isDeleted" },
            primaryUser: { $first: "$users.user" },
          },
        },
        {
          $lookup: {
            from: "users", // Name of the User collection
            localField: "primaryUser",
            foreignField: "_id",
            as: "primaryUser", // Store the populated user in the 'primaryUser' field
          },
        },
        {
          $unwind: "$primaryUser", // Unwind the populated primaryUser
        },
      ]);

      res.status(200).json({
        organizations,
        message: "Organizations with primary users fetched successfully",
      });
    } catch (error) {
      console.error("listOrganizationsWithPrimaryUsers:error -", error);
      res.status(400).json(error);
    }
  },
  async initiate(req, res) {
    try {
      console.log(req.body);
      const organization = await Organization.findOne({ name: req.body.name });
      if (organization) {
        return res
          .status(400)
          .json({ message: "Organization name already registered" });
      }
      console.log(organization);
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res
          .status(400)
          .json({ message: "User email already registered" });
      }
      console.log(userExists);

      const org = new Organization({
        name: req.body.name,
        // , createdBy: req.user._id
      });
      await org.save();

      const user = new User({ email: req.body.email, role: roles.ORG_ADMIN });
      const token = crypto.randomBytes(20).toString("hex");
      user.invitationToken = token;
      user.invitationTokenExpiry = Date.now() + 3600000 * 24;
      await user.save();

      const personalInfo = new EmployeePersonalInfo({ employee: user._id });
      await personalInfo.save()

      const relation = new UserOrganization({
        user: user._id,
        organization: org._id,
        isPrimary: true,
      });
      await relation.save();

      sendGrid.send(user.email, "invite", { org, user });
      res.status(200).json({
        message: "Invitation sent successfully",
      });
    } catch (error) {
      console.error("organizationController:list:error -", error);
      res.status(400).json(error);
    }
  },
  async saUpdateOrgAdmin(req, res) {
    try {
      const user = await User.findOneAndUpdate({
        _id: req.params.userid
      }, { email: req.body.email }, { new: true });

      const org = await Organization.findOneAndUpdate({
        _id: req.params.organizationid
      }, { name: req.body.name }, { new: true });

      res.status(200).json({
        org,
        message: "Information updated successfully.",
      });
    } catch (error) {
      console.error("organizationController:update:error -", error);
      res.status(400).json(error);
    }
  },


  async update(req, res) {
    try {

      let file = await File.findOne({ _id: req.body.file });
      if (file) {
        req.body.logo = await fileController.moveToUploads(req, file);
      }
      const org = await Organization.findOneAndUpdate({
        _id: req.organization._id
      }, req.body, { new: true });

      res.status(200).json({
        org,
        message: "Organization profile updated successfully.",
      });
    } catch (error) {
      console.error("organizationController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async details(req, res) {
    try {
      const details = await Organization.findOne({
        _id: req.organization._id
      }).populate('logo');

      res.status(200).json({
        details,
        message: "Organization profile fetched successfully.",
      });
    } catch (error) {
      console.error("organizationController:update:error -", error);
      res.status(400).json(error);
    }
  },

  async sendWelcomeEmail(req, res) {
    try {

      let users = await User.find({ isActive: true, receivedWelcomeEmail: false });

      // for (const user of users) {
      sendGrid.send("lalit.kumar@quantumsystem.in", 'welcome', { req });
      // }
      res.status(200).json({
        message: 'Employee leave request sent successfully'
      });
    } catch (error) {
      console.error("employeeController:update:error -", error);
      res.status(400).json(error);
    }
  },

};

module.exports = orgController;
