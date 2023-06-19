const express = require("express");
const { login_employee } = require("../controllers/employeeController");

const router = express.Router();

router.route("/employee/login").post(login_employee);

module.exports = router;
