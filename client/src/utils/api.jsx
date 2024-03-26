import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api";

export const signup = async (name, email, password, location, role) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signup`, {
      name,
      email,
      password,
      location,
      role,
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};

export const createDepartment = async (name) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${API_URL}/departments`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};

export const getDepartments = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/departments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};

export const updateDepartment = async (id, name) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${API_URL}/departments/${id}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};

export const deleteDepartment = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API_URL}/departments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};

export const assignEmployeesToDepartment = async (id, employeeIds) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${API_URL}/departments/${id}/assign-employees`,
      { employeeIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};

export const createEmployee = async (
  name,
  email,
  password,
  location,
  departmentId
) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${API_URL}/employees`,
      { name, email, password, location, department: departmentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};

export const getEmployees = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};

export const updateEmployee = async (
  id,
  name,
  email,
  location,
  departmentId
) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${API_URL}/employees/${id}`,
      { name, email, location, department: departmentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};
export const deleteEmployee = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API_URL}/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};

export const filterEmployeesByLocationAsc = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/employees/filter/location`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};

export const filterEmployeesByNameOrder = async (order) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${API_URL}/employees/filter/name?order=${order}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};

export const filterEmployeesByLocationDesc = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${API_URL}/employees/filter/location?order=desc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};

export const getLoggedInUserDetails = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/employees/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
    throw new Error(error.response.data.message || error.message);
  }
};
