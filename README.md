# MERN stack admin pannel assignment

This is a full-stack application built with React.js for the frontend and Node.js with Express.js for the backend. It allows employees and managers to manage employee information and departments within an organization.

## Features

### Frontend

- **Signup/Login Page**: Employees and managers can sign up or log in to the system. Form validation is implemented using Formik and Yup.
- **Department Management**: Managers can create, update, delete, and assign employees to departments. The department list displays the assigned employees for each department.
- **Employee List**: Displays a list of employees with options to filter by location (ascending and descending) and name (ascending and descending). Filtering is done on the server-side using API endpoints.
- **Employee Details**: Employees can view their own details, while managers can view details of all employees.
- **Employee CRUD**: Managers can create, update, and delete employee records. Form validation is implemented using Formik and Yup.

### Backend

- **Authentication**: Secure authentication system with JSON Web Tokens (JWT) for login and signup. Password hashing is implemented using bcryptjs.
- **Department Management**: APIs for creating, reading, updating, and deleting departments (accessible only to managers). Departments have a reference to associated employees.
- **Employee Management**: APIs for creating, reading, updating, and deleting employees (updating and deleting accessible only to managers). Employees have a reference to their department.
- **Filtering**: APIs to filter employees based on their location (ascending and descending) and name (ascending and descending).
- **Error Handling**: Custom error handling middleware for consistent error responses.

## Technologies Used

### Frontend

- React.js
- React Router (for client-side routing)
- Formik (form handling and validation)
- Yup (schema validation for forms)
- Axios (HTTP requests)
- react-toastify (notifications)

### Backend

- Node.js
- Express.js
- MongoDB (database)
- Mongoose (Object Data Modeling library)
- JSON Web Tokens (JWT) for authentication
- bcryptjs (password hashing)

## Installation

1. Clone the repository
2. Navigate to the project directory

### Backend Setup

1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file in the server directory and add the following environment variables:
  - MONGODB_URI=your_mongodb_uri
  -JWT_SECRET=your_jwt_secret
4. Start the server: `nodemon/node app.js`

### Frontend Setup

1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Code Structure

client/
├── src/
│   ├── components/
│   │   ├── Department/
│   │   ├── Employee/
│   │   ├── Header/
│   │   ├── Login/
│   │   └── Signup/
│   ├── utils/
│   │   └── api.js
│   └── App.js
└── package.json
server/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── departmentController.js
│   └── employeeController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── Department.js
│   └── Employee.js
├── routes/
│   ├── authRoutes.js
│   ├── departmentRoutes.js
│   └── employeeRoutes.js
├── utils/
│   └── errorHandler.js
├── index.js
└── package.json
