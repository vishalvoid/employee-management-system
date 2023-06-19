const express = require("express");
const {
  login_admin,
  verify_otp_admin,
  create_hr,
} = require("../controllers/adminController");
const { isAuthenticatedAdmin } = require("../utils/auth");

const router = express.Router();

router.route("/admin/login").post(login_admin);
router.route("/admin/login/verify").post(verify_otp_admin);
router.route("/admin/create/hr").post(isAuthenticatedAdmin, create_hr);

module.exports = router;
