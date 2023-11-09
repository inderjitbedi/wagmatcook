const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
        required: true,
    },

    order: {
        type: Number,
        default: null,
    },

    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
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
    isDefault: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
});


const DocumentTags = mongoose.model('DocumentTags', schema);

module.exports = DocumentTags;
