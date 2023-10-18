const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    version: {
        type: Number,
        required: true,
    },
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
});

const DocumentVersion = mongoose.model('DocumentVersion', documentSchema);

module.exports = DocumentVersion;