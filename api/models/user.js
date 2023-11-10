const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const roles = require("../enum/roles");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
      required: true,
    },
    password: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: null,
      enum: Object.values(roles),
    },
    // tempPassword: {
    //   type: String,
    //   default: null,
    // },
    // tempPasswordExpiry: {
    //   type: Date,
    //   default: null,
    // },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    invitationToken: {
      type: String,
      default: null,
    },
    invitationTokenExpiry: {
      type: Date,
      default: null,
    },
    // resetPasswordToken: {
    //   type: String,
    //   default: null,
    // },
    // resetPasswordTokenExpiry: {
    //   type: Date,
    //   default: null,
    // },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isSignedup: {
      type: Boolean,
      default: false,
    },
    receivedWelcomeEmail: {
      type: Boolean,
      default: false,
    },
    personalInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeePersonalInfo",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// userSchema.methods.comparePassword = async function (password) {
//   //console.log(password ,this.password);
//   const isMatch = password === this.password;
//   return isMatch;
// };
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
