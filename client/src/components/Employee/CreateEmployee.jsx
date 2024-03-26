import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createEmployee } from "../../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./createEmp.css";

const CreateEmployee = ({ fetchEmployees }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      location: "",
      departmentId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      location: Yup.string().required("Location is required"),
      departmentId: Yup.string().required("Department ID is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await createEmployee(
          values.name,
          values.email,
          values.password,
          values.location,
          values.departmentId
        );
        fetchEmployees();
        resetForm();
        toast.success("Employee created successfully");
      } catch (err) {
        console.error(err);
        toast.error("Failed to create employee. Please try again later.");
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
  };

  return (
    <div className="create-employee-container">
      <h3>Create Employee</h3>
      <form className="create-employee-form" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.location && formik.errors.location ? (
          <div className="error">{formik.errors.location}</div>
        ) : null}
        <input
          type="text"
          placeholder="Department ID"
          name="departmentId"
          value={formik.values.departmentId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.departmentId && formik.errors.departmentId ? (
          <div className="error">{formik.errors.departmentId}</div>
        ) : null}
        <button type="submit">Create</button>
        <button type="button" onClick={handleCancel} className="cancel-button">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
