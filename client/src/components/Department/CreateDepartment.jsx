import React from "react";
import { createDepartment } from "../../utils/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./create.css";

const CreateDepartment = ({ fetchDepartments }) => {
  const initialValues = {
    name: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await createDepartment(values.name);
      fetchDepartments();
      resetForm();
      toast.success("Department created successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create department");
    } finally {
      setSubmitting(false);
    }
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    return errors;
  };

  return (
    <div className="create-department-container">
      <h3>Create Department</h3>
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" className="error" />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateDepartment;
