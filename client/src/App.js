import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/signup";
import EmployeeList from "./components/Employee/EmployeeList";
import DepartmentList from "./components/Department/DepartmentList";
import { getLoggedInUserDetails } from "./utils/api";
import EmployeeDetails from "./components/Employee/EmployeeDetails";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (token) {
      fetchLoggedInUserDetails();
    }
  }, []);

  const fetchLoggedInUserDetails = async () => {
    try {
      const user = await getLoggedInUserDetails();
      setLoggedInUser(user);
      console.log(user);
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setLoggedInUser(null);
  };

  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <Header isAuthenticated={isAuthenticated} logout={logout} />
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/employees"
            element={
              isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/departments"
            element={
              isAuthenticated ? <DepartmentList /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <EmployeeDetails employee={loggedInUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
