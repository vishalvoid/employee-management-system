const express = require("express");
const {
  login_hr,
  verify_otp_hr,
  create_employee,
} = require("../controllers/hrController");
const { isAuthenticatedHr } = require("../utils/auth");

const router = express.Router();

router.route("/hr/login").post(login_hr);
router.route("/hr/login/verify").post(verify_otp_hr);
router.route("/hr/create/new").post(isAuthenticatedHr, create_employee);

module.exports = router;
