const mongoose = require("mongoose");
const validator = require("validator");

const admin_Schema = mongoose.Schema({
  fullname: {
    type: String,
    maxLength: [30, "name cannot be greater than 30 characters."],
    minLength: [5, "name cannot be lesser than 5 characters."],
  },
  email: {
    type: String,
    required: [true, "please Enter a Password"],
    unique: [true, "email already exists"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter a Password"],
    minlength: [8, "Password should be of 8 or more characters"],
    validate: [validator.isStrongPassword, "Please enter a strong password"],
    select: false,
  },
  otp: String,
  otpValidationTime: Date,
});

module.exports = mongoose.model("ADMIN", admin_Schema);
