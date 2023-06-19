const catchAsyncError = require("../middleware/catchAsyncError");
const Employee = require("../models/employeeModel");

exports.login_employee = catchAsyncError(async (req, res, next) => {
  // checking if user exists
  const { emp_id, password } = req.body;

  if (!emp_id || !password) {
    return next(new ErrorHandler("ID and Password is required*", 400));
  }

  // error handling for user not found or have been modified.
  const user = await Employee.findOne({ emp_id }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not Found", 400));
  }

  // comparing password
  const isMatched = await user.match_password(password);
  if (!isMatched) {
    return next(new ErrorHandler("Incorrect Credentials", 400));
  }

  // creating jwt for login. and storing it in cookies.
  const token = await jwttoken(user._id);

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
    sameSite: "none",
  };

  res.cookie("employee_token", token, options);

  res.status(200).json({
    success: true,
    message: `welcome ${user.name}, Login Successfull`,
  });
});
