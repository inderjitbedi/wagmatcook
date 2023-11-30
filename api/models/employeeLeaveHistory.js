const mongoose = require('mongoose');
const leaveStatus = require('../enum/leaveStatus');
const leaveNature = require('../enum/leaveNature');

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
    from: {
        type: Date,
        default: null,
    },
    to: {
        type: Date,
        default: null,
    },
    hours: {
        type: Number,
        default: 0,
    },
    requesterComment: {
        type: String,
        default: null,
    },
    responder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    responderComment: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        default: null,
        enum: Object.values(leaveStatus),
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    respondedOn: {
        type: Date,
        default: null,
    },
    nature: {
        type: String,
        default: leaveNature.SUBSTRACTION,
        enum: Object.values(leaveNature),
    }
}, {
    timestamps: true,
});


const EmployeeLeaveHistory = mongoose.model('EmployeeLeaveHistory', schema);

module.exports = EmployeeLeaveHistory;
