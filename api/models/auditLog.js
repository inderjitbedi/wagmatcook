const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema(
  {
    type: { type: String },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    leaveType: { type: mongoose.Schema.Types.ObjectId, ref: "LeaveType" },
    leaveAllocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeLeaveAllocation",
    }, // Leave allocation ID
    previousValue: { type: mongoose.Schema.Types.Mixed }, // Previous value of the changed field
    currentValue: { type: mongoose.Schema.Types.Mixed }, // Current value of the changed field
  },
  {
    timestamps: true,
  }
);
const EmployeeLeaveRew = mongoose.model("EmployeeLeaveRew", AuditLogSchema);

module.exports = EmployeeLeaveRew;
