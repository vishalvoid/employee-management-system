const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ADMIN = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const HR = require("../models/hrModel");

exports.isAuthenticatedAdmin = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.admin_token;

  if (!token) {
    return next(new ErrorHandler("Please login to access this feature.", 400));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET_FOR_ADMIN);

  req.admin = await ADMIN.findById(decoded._id);

  next();
});

exports.isAuthenticatedHr = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.hr_token;

  if (!token) {
    return next(new ErrorHandler("Please login to access this feature.", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_FOR_HR);

  req.hr = await HR.findById(decoded._id);

  next();
});
