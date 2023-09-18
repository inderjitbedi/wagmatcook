




const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true
    },
    disciplinary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disciplinary',
    },
    details: {
        type: String,
        default: null
    },
    bcr: {
        type: String,
        default: null
    },
    issueDate: {
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


const EmployeeDisciplinaries = mongoose.model('EmployeeDisciplinaries', infoSchema);

module.exports = EmployeeDisciplinaries;
