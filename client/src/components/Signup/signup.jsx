import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { signup } from "../../utils/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      location: "",
      role: "employee",
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
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values) => {
      try {
        await signup(
          values.name,
          values.email,
          values.password,
          values.location,
          values.role
        );
        toast.success("Signup successful");
        navigate("/login");
      } catch (err) {
        console.error(err);
        toast.error("Signup failed. Please try again later.");
      }
    },
  });

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={formik.handleSubmit}>
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
        <select
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
        {formik.touched.role && formik.errors.role ? (
          <div className="error">{formik.errors.role}</div>
        ) : null}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
