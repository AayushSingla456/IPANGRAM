import React, { useEffect, useState } from "react";
import {
  getDepartments,
  deleteDepartment,
  assignEmployeesToDepartment,
} from "../../utils/api";
import UpdateDepartment from "./UpdateDepartment";
import CreateDepartment from "./CreateDepartment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./list.css";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [employeeIdsMap, setEmployeeIdsMap] = useState({});

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const { departments } = await getDepartments();
      setDepartments(departments);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch departments");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      fetchDepartments();
      toast.success("Department deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete department");
    }
  };

  const handleAssignEmployees = async (id) => {
    try {
      await assignEmployeesToDepartment(id, employeeIdsMap[id].split(","));
      fetchDepartments();
      setEmployeeIdsMap({ ...employeeIdsMap, [id]: "" });
      toast.success("Employees assigned successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign employees");
    }
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
  };

  const handleCancelEdit = () => {
    setEditingDepartment(null);
  };

  return (
    <div className="department-list-container">
      <h2>Departments</h2>
      {editingDepartment ? (
        <UpdateDepartment
          department={editingDepartment}
          fetchDepartments={fetchDepartments}
          handleCancelEdit={handleCancelEdit}
        />
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Employees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department._id}>
                  <td>{department._id}</td>
                  <td>{department.name}</td>
                  <td>
                    {department.employees
                      .map((employee) => employee.name)
                      .join(", ")}
                  </td>
                  <td className="actions-buttons">
                    <button onClick={() => handleEdit(department)}>Edit</button>
                    <button onClick={() => handleDelete(department._id)}>
                      Delete
                    </button>
                    <div className="assign-employees-container">
                      <input
                        type="text"
                        placeholder="Employee IDs (comma-separated)"
                        value={employeeIdsMap[department._id] || ""}
                        onChange={(e) =>
                          setEmployeeIdsMap({
                            ...employeeIdsMap,
                            [department._id]: e.target.value,
                          })
                        }
                      />
                      <button
                        onClick={() => handleAssignEmployees(department._id)}
                      >
                        Assign Employees
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <CreateDepartment fetchDepartments={fetchDepartments} />
        </>
      )}
    </div>
  );
};

export default DepartmentList;
