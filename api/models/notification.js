const mongoose = require('mongoose');
const notificationType = require('../enum/notificationType');

const benefitSchema = new mongoose.Schema({
    title: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        default: null,
        enum: Object.values(notificationType),
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    isRead: {
        type: Boolean,
        default: false
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
