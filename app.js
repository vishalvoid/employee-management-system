const express = require("express");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "config/config.env" });

const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// route for employee
const EMPLOYEE = require("./routers/employeeRoute");
app.use("/api/v1", EMPLOYEE);

// route for admin
const ADMIN = require("./routers/adminRoute");
app.use("/api/v1", ADMIN);

// route for hr
const HR = require("./routers/hrRoute");
app.use("/api/v1", HR);

// routes for handling all errors.
app.use(errorMiddleware);

module.exports = app;
