const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    leaveType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LeaveType',
        required: true,
    },
    totalAllocation: {
        type: Number,
        default: null,
    },
    balance: {
        type: Number,
        default: null,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
});


const EmployeeLeaveAllocation = mongoose.model('EmployeeLeaveAllocation', schema);

module.exports = EmployeeLeaveAllocation;
