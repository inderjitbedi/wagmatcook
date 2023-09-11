

const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        default: null
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
    startDate: {
        type: Date,
        default: null
    },
    endDate: {
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


const EmployeePositionHistory = mongoose.model('EmployeePositionHistory', infoSchema);

module.exports = EmployeePositionHistory;
