const Department = require("../models/Department");
const Employee = require("../models/Employee");
const errorHandler = require("../utils/errorHandler");

exports.createDepartment = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return errorHandler(res, 400, "Department with this name already exists");
    }
    const newDepartment = new Department({ name });
    const savedDepartment = await newDepartment.save();
    res.status(201).json({
      success: true,
      message: "Department created successfully",
      department: savedDepartment,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find().populate("employees");
    res.status(200).json({
      success: true,
      departments,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const department = await Department.findById(id);
    if (!department) {
      return errorHandler(res, 404, "Department not found");
    }
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment && existingDepartment._id.toString() !== id) {
      return errorHandler(res, 400, "Department name is already in use");
    }
    department.name = name;
    const updatedDepartment = await department.save();
    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      department: updatedDepartment,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return errorHandler(res, 404, "Department not found");
    }
    await Employee.updateMany(
      { department: id },
      { $unset: { department: 1 } }
    );
    await Department.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.assignEmployeesToDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { employeeIds } = req.body;
    const department = await Department.findById(id);
    if (!department) {
      return errorHandler(res, 404, "Department not found");
    }
    const employees = await Employee.find({ _id: { $in: employeeIds } });
    if (employees.length !== employeeIds.length) {
      return errorHandler(res, 404, "One or more employees not found");
    }
    department.employees = [...department.employees, ...employeeIds];
    const updatedDepartment = await department.save();
    await Employee.updateMany(
      { _id: { $in: employeeIds } },
      { $set: { department: department._id } }
    );
    res.status(200).json({
      success: true,
      message: "Employees assigned to department successfully",
      department: updatedDepartment,
    });
  } catch (err) {
    next(err);
  }
};
