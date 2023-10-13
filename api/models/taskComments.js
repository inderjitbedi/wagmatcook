const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        default: null,
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: null,
    },
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    isEdited: {
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


const TaskComments = mongoose.model('TaskComments', taskSchema);

module.exports = TaskComments;
