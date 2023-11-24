const mongoose = require("mongoose");
const leaveNature = require("../enum/leaveNature");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    order: {
      type: Number,
      default: null,
    },
    maxCarryOver: {
      type: Number,
      default: null,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: false,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    cantDelete: {
      type: Boolean,
      default: false,
    },
    nature: {
      type: String,
      default: leaveNature.SUBSTRACTION,
      enum: Object.values(leaveNature),
    },
  },
  {
    timestamps: true,
  }
);

const LeaveType = mongoose.model("LeaveType", schema);

module.exports = LeaveType;
