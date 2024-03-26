const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const errorHandler = require("../utils/errorHandler");

exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorHandler(res, 401, "Authorization token is missing");
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET || "HGFHGEAD1212432432";
    const decoded = jwt.verify(token, jwtSecret);
    req.user = await Employee.findById(decoded.id);

    next();
  } catch (err) {
    next(err);
  }
};

exports.authorizeManager = (req, res, next) => {
  if (!req.user || req.user.role !== "manager") {
    return errorHandler(
      res,
      403,
      "Access denied. Only managers can perform this action"
    );
  }

  next();
};
