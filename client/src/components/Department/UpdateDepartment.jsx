import React, { useState } from "react";
import { updateDepartment } from "../../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./update.css";

const UpdateDepartment = ({
  department,
  fetchDepartments,
  handleCancelEdit,
}) => {
  const [name, setName] = useState(department.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDepartment(department._id, name);
      fetchDepartments();
      handleCancelEdit();
      toast.success("Department updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update department");
    }
  };

  return (
    <div className="department-form-container">
      <h3>Update Department</h3>
      <form className="department-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Update</button>
        <button type="button" onClick={handleCancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateDepartment;
