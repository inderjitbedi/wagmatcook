

const mongoose = require('mongoose');
const roles = require('../enum/roles');

const infoSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    employeeType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeType',
    },
    role: {
        type: String,
        default: null,
        enum: Object.values(roles),
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
    title: {
        type: String,
        default: null
    },
    reportsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    startDate: {
        type: Date,
        default: null
    },
    endDate: {
        type: Date,
        default: null
    },
    salaryScaleFrom: {
        type: Number,
        default: null
    },
    salaryScaleTo: {
        type: Number,
        default: null
    },
    salary: {
        type: Number,
        default: null
    },
    ratePer: {
        type: Number,
        default: null
    },
    hoursPerWeek: {
        type: Number,
        default: null
    },
    isBebEligible: {
        type: Boolean,
        default: false
    },
    isPrimary: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});




const EmployeePositionHistory = mongoose.model('EmployeePositionHistory', infoSchema);

module.exports = EmployeePositionHistory;
