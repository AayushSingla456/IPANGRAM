import React, { useEffect, useState } from "react";

import {
  getEmployees,
  deleteEmployee,
  filterEmployeesByLocationAsc,
  filterEmployeesByNameOrder,
  filterEmployeesByLocationDesc,
} from "../../utils/api";
import UpdateEmployee from "./UpdateEmployee";
import CreateEmployee from "./CreateEmployee";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./emp.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { employees } = await getEmployees();
      setEmployees(employees);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
      toast.success("Employee deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete employee. Please try again later.");
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  const handleFilterByLocation = async () => {
    try {
      const { employees } = await filterEmployeesByLocationAsc();
      setEmployees(employees);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterByName = async (order) => {
    try {
      const { employees } = await filterEmployeesByNameOrder(order);
      setEmployees(employees);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterByLocationDesc = async () => {
    try {
      const { employees } = await filterEmployeesByLocationDesc();
      setEmployees(employees);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="employee-list-container">
      <h2>Employees</h2>
      <div>
        <label>Filter by Location: </label>
        <button onClick={handleFilterByLocation}>
          Filter by Location (Asc)
        </button>
        <button onClick={handleFilterByLocationDesc}>
          Filter by Location (Desc)
        </button>
      </div>
      <br></br>

      <div>
        <label>Filter by Name : </label>
        <button onClick={() => handleFilterByName("asc")}>Ascending</button>
        <button onClick={() => handleFilterByName("desc")}>Descending</button>
      </div>
      {editingEmployee ? (
        <UpdateEmployee
          employee={editingEmployee}
          fetchEmployees={fetchEmployees}
          handleCancelEdit={handleCancelEdit}
        />
      ) : (
        <>
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Department</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                return (
                  <tr key={employee._id}>
                    <td>{employee._id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.location}</td>
                    <td>
                      {employee.department ? employee.department.name : "-"}
                    </td>
                    <td>{employee.role}</td>
                    <td>
                      <button onClick={() => handleEdit(employee)}>Edit</button>
                      <button onClick={() => handleDelete(employee._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <CreateEmployee fetchEmployees={fetchEmployees} />
        </>
      )}
    </div>
  );
};

export default EmployeeList;
