const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({

    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    province: {
        type: String,
        default: null
    },
    postalCode: {
        type: String,
        default: null
    },
    homePhone: {
        type: Number,
        default: null
    },
    mobile: {
        type: Number,
        default: null
    },
    personalEmail: {
        type: String,
        default: null
    },
    emergencyContact: {
        type: String,
        default: null
    },
    emergencyContactNumber: {
        type: Number,
        default: null
    },
    employeeId: {
        type: String,
        default: null
    },
    sin: {
        type: Number,
        default: null
    },
    gender: {
        type: Number,
        default: null
    },
    pronouns: {
        type: String,
        default: null
    },
    dob: {
        type: Date,
        default: null
    },
    photo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isSignedup: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});


const EmployeePersonalInfo = mongoose.model('EmployeePersonalInfo', infoSchema);

module.exports = EmployeePersonalInfo;
