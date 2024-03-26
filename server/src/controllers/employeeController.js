const Employee = require("../models/Employee");
const Department = require("../models/Department");
const errorHandler = require("../utils/errorHandler");

exports.createEmployee = async (req, res, next) => {
  try {
    const { name, email, password, location, department, role } = req.body;

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return errorHandler(res, 400, "Email is already in use");
    }

    if (department) {
      const existingDepartment = await Department.findById(department);
      if (!existingDepartment) {
        return errorHandler(res, 404, "Department not found");
      }
    }

    const newEmployee = new Employee({
      name,
      email,
      password,
      location,
      department,
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

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().populate("department");

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id).populate("department");
    if (!employee) {
      return errorHandler(res, 404, "Employee not found");
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, location, department } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return errorHandler(res, 404, "Employee not found");
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee && existingEmployee._id.toString() !== id) {
      return errorHandler(res, 400, "Email is already in use");
    }

    if (department) {
      const existingDepartment = await Department.findById(department);
      if (!existingDepartment) {
        return errorHandler(res, 404, "Department not found");
      }
    }

    if (
      department &&
      employee.department &&
      department !== employee.department.toString()
    ) {
      const currentDepartment = await Department.findById(employee.department);
      if (currentDepartment) {
        currentDepartment.employees = currentDepartment.employees.filter(
          (employeeId) => employeeId.toString() !== id
        );
        await currentDepartment.save();
      }
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.location = location || employee.location;
    employee.department = department || employee.department;
    const updatedEmployee = await employee.save();

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return errorHandler(res, 404, "Employee not found");
    }

    if (employee.department) {
      const department = await Department.findById(employee.department);
      department.employees = department.employees.filter(
        (employeeId) => employeeId.toString() !== id
      );
      await department.save();
    }

    await Employee.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.filterEmployeesByLocationAsc = async (req, res, next) => {
  try {
    const { order } = req.query;
    const sortOrder = order === "desc" ? -1 : 1;

    const employees = await Employee.find()
      .populate("department")
      .sort({ location: sortOrder });

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (err) {
    next(err);
  }
};

exports.filterEmployeesByNameOrder = async (req, res, next) => {
  try {
    const { order } = req.query;
    const sortOrder = order === "asc" ? 1 : -1;

    const employees = await Employee.find()
      .populate("department")
      .sort({ name: sortOrder });

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (err) {
    next(err);
  }
};

exports.getLoggedInEmployeeDetails = async (req, res, next) => {
  try {
    const loggedInEmployeeId = req.user.id;

    const employee = await Employee.findById(loggedInEmployeeId).populate(
      "department"
    );
    if (!employee) {
      return errorHandler(res, 404, "Employee not found");
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (err) {
    next(err);
  }
};
