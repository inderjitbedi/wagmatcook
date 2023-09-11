

const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    benefit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Benefit',
    },
    description: {
        type: String,
        default: null
    },
    startDate: {
        type: Date,
        default: null
    },
    endDate: {
        type: Date,
        default: null
    },
    cost: {
        type: Number,
        default: null
    },
    contributionRate: {
        type: Number,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});


const EmployeeBenefits = mongoose.model('EmployeeBenefits', infoSchema);

module.exports = EmployeeBenefits;
