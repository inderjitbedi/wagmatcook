const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        default: null,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    departments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    }],
    announcementDate: {
        type: Date,
        default: null
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: false,
        default: null
    },
    attachment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: false,
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
});


const Announcement = mongoose.model('Announcement', schema);

module.exports = Announcement;
