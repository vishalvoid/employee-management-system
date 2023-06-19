const catchAsyncError = require("../middleware/catchAsyncError");
const ADMIN = require("../models/adminModel");
const { generateOTP } = require("../utils/otp");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const HR = require("../models/hrModel");

// JSON SIGN IN FUNCTION;
const jwttoken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_FOR_ADMIN);
};

exports.login_admin = catchAsyncError(async (req, res, next) => {
  // taling email for login.
  const { email, password } = req.body;

  // to create admin if required.
  // await ADMIN.create({ fullname, email, password });

  //  finding and authenticating user to check if he is a admin or not.
  const user = await ADMIN.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User Not Found!", 400));
  }

  if (user.password != password) {
    return next(new ErrorHandler("Incorrect Password"));
  }

  // generating otp
  const otp = generateOTP(6);
  user.otp = otp;
  user.otpValidationTime = Date.now() + 10 * 60 * 1000;

  await user.save();

  // will send sms on phones -- IMPORTANT
  // await sendSMS(phone, otp);

  return res.status(200).json({
    success: true,
    message: `OTP sent to ${email}`,
    email,
  });
});

exports.create_hr = catchAsyncError(async (req, res, next) => {
  const {
    fullname,
    email,
    id,
    Password,
    fullAddress,
    mobile,
    designation,
    department,
  } = req.body;

  // checking if the current user is SuperUser or not.
  const admin = await ADMIN.findById(req.admin._id);

  if (!admin) {
    return next(
      new ErrorHandler("you are not allowed to access this route", 404)
    );
  }

  const create_hr = await HR.findOne({ email });
  if (create_hr) {
    return next(
      new ErrorHandler("Another HR with same id already exists", 400)
    );
  }

  const hr = await HR.create({
    fullname,
    email,
    hr_id: id,
    password: Password,
    fullAddress,
    mobile,
    designation,
    department,
  });

  res.status(200).json({
    success: true,
    message: "HR created successfully",
    hr,
  });
});

exports.verify_otp_admin = catchAsyncError(async (req, res, next) => {
  // destructuring
  const { email, otp } = req.body;

  // checking if user exists or not
  const user = await ADMIN.findOne({ email });

  // handling if user does not exists
  if (!user) {
    return next(new ErrorHandler("Please enter a correct mail id", 404));
  }

  // checking otp
  if (user.otp !== otp) {
    return next(new ErrorHandler("Incorrect OTP", 400));
  }

  if (user.otpValidationTime < Date.now()) {
    user.otp = "";
    user.otpValidationTime = null;
    await user.save();
    return next(
      new ErrorHandler("OTP expired : only valid for 10 minutes.", 400)
    );
  }

  // deleting otp
  user.otp = "";
  user.otpValidationTime = null;
  await user.save();

  //  generating jwt token
  const token = jwttoken(user._id);

  // adding option -- parameter to jwt token.
  const options = {
    expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: false,
  };

  res.status(200).cookie("admin_token", token, options).json({
    success: true,
    message: "OTP verified successfully",
  });
});
