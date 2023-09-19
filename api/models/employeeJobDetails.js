
const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({


    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
    title: {
        type: String,
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
    reportsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    employeeType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeType',
        default: null
    },
    isBebEligible: {
        type: Boolean,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});


const EmployeeJobDetails = mongoose.model('EmployeeJobDetails', infoSchema);

module.exports = EmployeeJobDetails;
