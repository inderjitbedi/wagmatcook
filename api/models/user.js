const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  role:{
    type: String,
    default: null,
  },
  tempPassword: {
    type: String,
    default: null,
  },
  tempPasswordExpiry: {
    type: Date,
    default: null,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordTokenExpiry: {
    type: Date,
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

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
      return next();
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const isMatch = password === this.password;
  return isMatch;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
