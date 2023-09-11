


const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    certificate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required:true
    },
    title: {
        type: String,
        default: null
    },
    provider: {
        type: String,
        default: null
    },
    completionDate: {
        type: Date,
        default: null
    },
    expiryDate: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});


const EmployeeBenefits = mongoose.model('EmployeeBenefits', infoSchema);

module.exports = EmployeeBenefits;
