const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
        required: true,
    },
    size: {
        type: Number,
        default: null,
        // required: true,
    },
    logo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
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

const Organization = mongoose.model('Organization', orgSchema);

module.exports = Organization;
