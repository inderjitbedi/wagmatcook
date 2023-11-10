const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendGrid = require("../providers/sendGrid.js");
const roles = require("../enum/roles");
const UserOrganization = require("../models/userOrganization");
const EmployeePersonalInfo = require("../models/employeePersonalInfo");

const authController = {
  async register(req, res) {
    try {
      const { email } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Email already registered." });
      }
      user.role = roles.ORG_ADMIN;

      const token = crypto.randomBytes(5).toString("hex");
      user.tempPassword = token;
      user.tempPasswordExpiry = Date.now() + 3600000 * 24; // 24 hour
      await user.save();
      req.user = user;
      await sendGrid.send(user.email, "tempPassword", { req, token });

      res
        .status(201)
        .json({
          user,
          message:
            "User registered. Temp password successfully sent via email.",
        });
    } catch (error) {
      console.error("authController:register:error -", error);
      res.status(400).json(error);
    }
  },
  async resendTempPassword(req, res, next) {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }
      if (user.role !== roles.ORG_ADMIN)
        return res.status(400).json({ message: "Not an Org admin user." });

      const token = crypto.randomBytes(10).toString("hex");
      user.tempPassword = token;
      user.tempPasswordExpiry = Date.now() + 3600000 * 24; // 24 hour
      await user.save();
      req.user = user;
      await sendGrid.send(user.email, "tempPassword", { req, token });

      res
        .status(200)
        .json({
          user,
          message: "Temp password successfully resent via email.",
        });
    } catch (err) {
      next(err);
    }
  },

  async verifyUser(req, res) {
    try {
      const { email, tempPassword } = req.params;
      let user = await User.findOne({
        email,
        tempPassword,
        tempPasswordExpiry: { $gt: Date.now() },
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid or expired temp password" });
      }

      user.tempPassword = undefined;
      user.tempPasswordExpiry = undefined;
      await user.save();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      user = user.toObject();
      delete user.password;
      res
        .status(200)
        .json({ user, token, message: "User verified successfully" });
    } catch (error) {
      console.error("authController:register:error -", error);
      res.status(400).json(error);
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email, isDeleted: false });
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      user = user.toObject();
      delete user.password;

      res.json({ user, token, message: "User signed in successfully" });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
  async checkEmailUniqueness(req, res) {
    try {
      const { email } = req.params;
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      // if (existingUser) {
      //     return res.status(409).json({ isUnique: !existingUser, message: 'User already exists' });
      // }
      res.json({ isUnique: !existingUser });
    } catch (error) {
      console.error("authController:checkEmailUniqueness:error -", error);
      res.status(400).json({ message: error.toString() });
    }
  },
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const token = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordTokenExpiry = Date.now() + 3600000 * 24; // 24 hour
      await user.save();

      await sendGrid.send(user.email, "forgotPassword", { req, token });
      res.status(200).json({ user, message: "Password reset email sent" });
    } catch (err) {
      next(err);
    }
  },
  async resetPassword(req, res, next) {
    try {
      const { token } = req.params;
      //console.log(token);
      const { newPassword } = req.body;
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordTokenExpiry: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      // const isMatch = user.comparePassword(password);
      // if (!isMatch) {
      //     return res.status(400).json({ message: 'Invalid current password' });
      // }
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpiry = undefined;
      await user.save();
      res.status(200).json({ user, message: "Password changed successfully" });
    } catch (err) {
      next(err);
    }
  },

  async sendOtpForLogin(req, res) {
    try {
      const { email } = req.body;
      let user = await User.findOne({ email }).populate("personalInfo");
      if (!user) {
        return res.status(400).json({ message: "User not registered." });
      }

      const token = crypto.randomBytes(3).toString("hex");
      user.otp = token;
      user.otpExpiry = Date.now() + 3600000 * 24; // 24 hour
      await user.save();

      req.user = user;
      await sendGrid.send(user.email, "sendOtp", { req, token });
      res.status(200).json({ message: "OTP sent successfully via email." });
    } catch (error) {
      console.error("authController:register:error -", error);
      res.status(400).json(error);
    }
  },
  async resendOtpForLogin(req, res, next) {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email }).populate("personalInfo");
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }
      const token = crypto.randomBytes(3).toString("hex");
      user.otp = token;
      user.otpExpiry = Date.now() + 3600000 * 24; // 24 hour
      await user.save();
      req.user = user;
      await sendGrid.send(user.email, "sendOtp", { req, token });

      res
        .status(200)
        .json({ user, message: "OTP resent successfully via email." });
    } catch (err) {
      next(err);
    }
  },
  async loginWithOtp(req, res) {
    try {
      const { email, otp } = req.body;
      let user = await User.findOne({
        email,
        otp,
        otpExpiry: { $gt: Date.now() },
      }).populate({
        path: "personalInfo",
        populate: {
          path: "photo",
        },
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid or expired One Time Password(OTP)" });
      }
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      user = user.toObject();
      delete user.password;
      let relation = {};
      if (user.role != roles.SUPER_ADMIN) {
        relation = await UserOrganization.findOne({ user: user._id }).populate([
          {
            path: "organization",
            populate: {
              path: "logo",
            },
          },
        ]);
      }
      res
        .status(200)
        .json({
          user,
          organization: relation?.organization || {},
          token,
          message: "User signed in successfully",
        });
    } catch (error) {
      console.error("authController:register:error -", error);
      res.status(400).json(error);
    }
  },
  async loginWithOtpBypass(req, res) {
    try {
      const { email, otp } = req.body;
      let user = await User.findOne({ email }).populate({
        path: "personalInfo",
        populate: {
          path: "photo",
        },
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid or expired One Time Password(OTP)" });
      }
      // user.otp = undefined;
      // user.otpExpiry = undefined;
      // await user.save();

      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      user = user.toObject();
      delete user.password;
      let relation = {};
      if (user.role != roles.SUPER_ADMIN) {
        relation = await UserOrganization.findOne({ user: user._id }).populate([
          {
            path: "organization",
            populate: {
              path: "logo",
            },
          },
        ]);
      }
      res
        .status(200)
        .json({
          user,
          organization: relation?.organization || {},
          token,
          message: "User signed in successfully",
        });
    } catch (error) {
      console.error("authController:register:error -", error);
      res.status(400).json(error);
    }
  },
  async completeOrgAdminSignup(req, res) {
    try {
      let { token } = req.params;
      const { email, name } = req.body;
      let user = await User.findOne({
        email,
        invitationToken: token,
        invitationTokenExpiry: { $gt: Date.now() },
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid or expired invitation" });
      }

      user.name = name;
      user.invitationToken = undefined;
      user.invitationTokenExpiry = undefined;
      user.isSignedup = true;
      await user.save();
      token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      user = user.toObject();
      delete user.password;

      let relation = await UserOrganization.findOne({
        user: user._id,
        isActive: true,
        isDeleted: false,
        isPrimary: true,
      }).populate("organization");

      const personalInfo = await EmployeePersonalInfo.findOneAndUpdate(
        { employee: user._id },
        { firstName: name },
        { new: true }
      );
      user = await User.findByIdAndUpdate(
        user._id,
        { personalInfo: personalInfo._id },
        { new: true }
      );
      res
        .status(200)
        .json({
          user,
          organization: relation.organization,
          token,
          message: "User signup completed successfully",
        });
    } catch (error) {
      console.error("authController:register:error -", error);
      res.status(400).json(error);
    }
  },
};

module.exports = authController;
