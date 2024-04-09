const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    leaveType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LeaveType",
      required: true,
    },
    numberOfHr: {
      type: Number,
      default: null,
    },
    adjustedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    nature: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
const EmployeeLeaveAdjustment = mongoose.model(
  "employeeLeaveAdjustment",
  schema
);

module.exports = EmployeeLeaveAdjustment;
