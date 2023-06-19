const mongoose = require("mongoose");
const validator = require("validator");

const hr_Schema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: [3, "name cannot be less than 3 characters"],
    maxLength: [30, "name canoot be greater than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "please Enter a Password"],
    unique: [true, "email already exists"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  hr_id: {
    type: String,
    maxLength: [12, "Hr id cannot exceed 12 characters"],
    minLength: [8, "Hr id cannot be less than 8 characters"],
  },

  password: {
    type: String,
    required: [true, "Please Enter a Password"],
    minlength: [8, "Password should be of 8 or more characters"],
    validate: [validator.isStrongPassword, "Please enter a strong password"],
    select: false,
  },

  fullAddress: {
    address: {
      type: String,
      minLength: [2, "address cannot be smaller than 10 chatacters"],
    },
    city: String,
    pin: String,
    state: String,
    country: String,
  },
  mobile: {
    type: String,
    maxLength: [10, "mobile cannot be greater than 10 characters"],
    minLength: [10, "mobile cannot be less than 10 characters"],
    required: [true, "mobile is a required field"],
  },
  designation: String,
  department: String,
  otp: String,
  otpValidationTime: Date,
});

module.exports = mongoose.model("HR", hr_Schema);
