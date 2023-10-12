const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    assigner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
});


const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;
