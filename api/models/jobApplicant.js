const mongoose = require('mongoose');
const interviewed = require('../enum/interviewed');

const schema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    appliedOn: {
        type: Date,
        required: true,
    },
    interviewDate: {
        type: Date,
        default: null,
    },
    isEligibile: {
        type: Boolean,
        default: false
    },
    interviewed: {
        type: String,
        default: null,
    },
    selectionOrder: {
        type: Number,
        default: 0,
    },
    isSelected: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
    }],
}, {
    timestamps: true,
});

const JobApplicant = mongoose.model('JobApplicant', schema);

module.exports = JobApplicant;