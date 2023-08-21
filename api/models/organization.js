const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
        required: true,
    },
    size: {
        type: Number,
        default: null,
        required: true,
    },
    logo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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

orgSchema.pre('save', async function (next) {
    const org = this;
    if (!org.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    org.password = await bcrypt.hash(org.password, salt);
    next();
});

orgSchema.methods.comparePassword = async function (password) {
    const isMatch = password === this.password;
    return isMatch;
};

const Organization = mongoose.model('Organization', orgSchema);

module.exports = Organization;
