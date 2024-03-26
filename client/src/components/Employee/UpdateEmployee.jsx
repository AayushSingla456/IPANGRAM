import React, { useState } from "react";
import { updateEmployee } from "../../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./updateEmp.css";

const UpdateEmployee = ({ employee, fetchEmployees, handleCancelEdit }) => {
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [location, setLocation] = useState(employee.location);
  const [departmentId, setDepartmentId] = useState(
    employee.department ? employee.department._id : ""
  );
  const [role, setRole] = useState(employee.role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(
        employee._id,
        name,
        email,
        location,
        departmentId,
        role
      );
      fetchEmployees();
      handleCancelEdit();
      toast.success("Employee updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update employee");
    }
  };

  return (
    <div className="update-employee-container">
      <h3>Update Employee</h3>
      <form className="update-employee-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="departmentId">Department ID:</label>
          <input
            type="text"
            id="departmentId"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={handleCancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
