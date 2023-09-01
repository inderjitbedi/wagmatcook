const mongoose = require('mongoose');
const roles = require('../enum/roles');

const userOrganizationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
});


const UserOrganization = mongoose.model('UserOrganization', userOrganizationSchema);

module.exports = UserOrganization;
