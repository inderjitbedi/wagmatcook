const mongoose = require('mongoose');

const benefitSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
        required: true,
    },
    description: {
        type: String,
        default: null,
    }, order: {
        type: Number,
        default: null,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
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


const Benefit = mongoose.model('Benefit', benefitSchema);

module.exports = Benefit;
