const mongoose = require("mongoose");
const validator = require("validator");

const employee_Schema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Name is a required field"],
    minLength: [3, "name should have more than 5 characters"],
    maxLength: [30, "name cannot have more than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "please Enter a Password"],
    unique: [true, "email already exists"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  mobile: {
    type: String,
    minLength: [10, "mobile cannot be less than 10 characters."],
    maxLength: [10, "mobile cannot be more than 10 characters"],
  },
  emp_id: {
    type: String,
    maxLength: [12, "employee id cannot exceed 12 characters"],
    minLength: [8, "employee id cannot be less than 8 characters"],
  },
  password: {
    type: String,
    required: [true, "Please Enter a Password"],
    minlength: [8, "Password should be of 8 or more characters"],
    validate: [validator.isStrongPassword, "Please enter a strong password"],
    select: false,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HR",
  },
  fullAddress: {
    address: {
      type: String,
      minLength: [10, "address cannot be smaller than 10 chatacters"],
    },
    city: String,
    pin: String,
    state: String,
    country: String,
  },

  salary: {
    type: String,
    required: [true, "salary is a required field"],
  },
  designation: {
    type: String,
    required: [true, "designation is a required field"],
  },
  department: {
    type: String,
    required: [true, "department is a required field"],
  },
});

// matching password at the time of login.
employee_Schema.methods.match_password = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("EMPLOYEE", employee_Schema);
