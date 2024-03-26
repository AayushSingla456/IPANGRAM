const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  filterEmployeesByLocationAsc,
  filterEmployeesByNameOrder,
  createEmployee,
  getLoggedInEmployeeDetails,
} = require("../controllers/employeeController");
const {
  authenticate,
  authorizeManager,
} = require("../middlewares/authMiddleware");

// Get all employees
router.get("/", authenticate, authorizeManager, getAllEmployees);
router.post("/", authenticate, authorizeManager, createEmployee);
router.get("/me", authenticate, getLoggedInEmployeeDetails);
// Get employee by ID
router.get("/:id", authenticate, getEmployeeById);

// Update employee (only for managers)
router.put("/:id", authenticate, authorizeManager, updateEmployee);

// Delete employee (only for managers)
router.delete("/:id", authenticate, authorizeManager, deleteEmployee);

// Filter employees by location (ascending)
router.get(
  "/filter/location",
  authenticate,
  authorizeManager,
  filterEmployeesByLocationAsc
);

// Filter employees by name (ascending or descending)
router.get(
  "/filter/name",
  authenticate,
  authorizeManager,
  filterEmployeesByNameOrder
);

module.exports = router;
