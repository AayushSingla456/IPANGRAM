const express = require("express");
const router = express.Router();
const {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  assignEmployeesToDepartment,
} = require("../controllers/departmentController");
const {
  authenticate,
  authorizeManager,
} = require("../middlewares/authMiddleware");

// Route to create a new department (only accessible for managers)
router.post("/", authenticate, authorizeManager, createDepartment);

// Route to get all departments
router.get("/", authenticate, authorizeManager, getAllDepartments);

// Route to update a department (only accessible for managers)
router.put("/:id", authenticate, authorizeManager, updateDepartment);

// Route to delete a department (only accessible for managers)
router.delete("/:id", authenticate, authorizeManager, deleteDepartment);

// Route to assign employees to a department (only accessible for managers)
router.put(
  "/:id/assign-employees",
  authenticate,
  authorizeManager,
  assignEmployeesToDepartment
);

module.exports = router;
