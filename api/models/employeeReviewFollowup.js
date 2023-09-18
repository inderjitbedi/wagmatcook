



const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeReviews', required: true
    },
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true
    },
    completedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    details: {
        type: String,
        default: null
    },
    reviewDate: {
        type: Date,
        default: null
    },
    nextReviewDate: {
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


const EmployeeReviewFollowups = mongoose.model('EmployeeReviewFollowups', infoSchema);

module.exports = EmployeeReviewFollowups;
