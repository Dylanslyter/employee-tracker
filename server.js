const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

// Create MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employeedb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to view all employees
// Assuming you have a function to fetch all employees from your database
async function getAllEmployees() {
    // Example implementation to fetch all employees from the database
    // Replace this with your actual implementation
    const employees = await db.query('SELECT * FROM employees');
    return employees;
  }
  

// Function to add an employee
async function addEmployee() {
  // Implement adding employee functionality here
}

// Function to update employee role
async function updateEmployeeRole() {
  // Implement updating employee role functionality here
}

// Function to view all roles
async function viewAllRoles() {
  // Implement viewing all roles functionality here
}

// Function to add a role
async function addRole() {
  // Implement adding a role functionality here
}

// Function to view all departments
async function viewAllDepartments() {
  // Implement viewing all departments functionality here
}

// Function to add a department
async function addDepartment() {
  // Implement adding a department functionality here
}

// Function to start the application
async function start() {
  console.log('Welcome to Employee Management System!');

  const options = [
    'View All Employees',
    'Add Employee',
    'Update Employee Role',
    'View All Roles',
    'Add Role',
    'View All Departments',
    'Add Department',
    'Quit'
  ];

  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: options
  });

  switch (action) {
    case "View All Employees":
        // Fetch all employees from the database
        getAllEmployees().then((employees) => {
          // Display the employees in a formatted table
          console.log("\nAll Employees:\n");
          console.table(employees); // Assuming employees is an array of objects
        }).catch((error) => {
          console.error("Error fetching employees:", error);
        });
        break;
    case 'Add Employee':
      await addEmployee();
      break;
    case 'Update Employee Role':
      await updateEmployeeRole();
      break;
    case 'View All Roles':
      await viewAllRoles();
      break;
    case 'Add Role':
      await addRole();
      break;
    case 'View All Departments':
      await viewAllDepartments();
      break;
    case 'Add Department':
      await addDepartment();
      break;
    case 'Quit':
      console.log('Goodbye!');
      pool.end(); // Close MySQL connection pool
      return;
  }

  start(); // Re-prompt for next action
}

start(); // Start the application
