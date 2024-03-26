const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const errorHandler = require("../utils/errorHandler");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, location, role } = req.body;
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return errorHandler(res, 400, "Employee with this email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
      location,
      role,
    });
    const savedEmployee = await newEmployee.save();
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: savedEmployee,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return errorHandler(res, 404, "Employee with this email not found");
    }
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return errorHandler(res, 401, "Invalid email or password");
    }
    const jwt_secret = "HGFHGEAD1212432432";
    const token = jwt.sign(
      { id: employee._id },
      process.envJWT_SECRET || jwt_secret,
      {
        expiresIn: "12h",
      }
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (err) {
    next(err);
  }
};
