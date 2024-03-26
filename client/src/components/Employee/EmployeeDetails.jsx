import React from "react";
import "./details.css";

const EmployeeDetails = ({ employee }) => {
  if (!employee) {
    return (
      <div className="employee-details-container no-data-message">
        LOADING... OR NO DATA FOUND
      </div>
    );
  }

  return (
    <div className="employee-details-container">
      <h1>Welcome, {employee.employee.name}!</h1>
      <p>
        <strong>Email:</strong> {employee.employee.email}
      </p>
      <p>
        <strong>Location:</strong> {employee.employee.location}
      </p>
      <p>
        <strong>Department:</strong>{" "}
        {employee.employee.department
          ? employee.employee.department.name
          : "NULL"}
      </p>
      <p>
        <strong>Role:</strong> {employee.employee.role}
      </p>
    </div>
  );
};

export default EmployeeDetails;
