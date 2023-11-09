const mongoose = require('mongoose');

const disciplinarySchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    // requiredBcr: {
    //     type: Boolean,
    //     default: false,
    // },
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
    isDefault: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
});


const Disciplinary = mongoose.model('Disciplinary', disciplinarySchema);

module.exports = Disciplinary;
