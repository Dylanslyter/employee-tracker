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
    const employees = await db.query('SELECT * FROM employee');
    return employees;
  }
  
// Function to add an employee
async function addEmployee() {
    try {
      const employeeData = await inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'Enter the first name of the employee:'
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'Enter the last name of the employee:'
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the role ID of the employee:'
        }
      ]);
  
      await db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [
        employeeData.firstName,
        employeeData.lastName,
        employeeData.roleId
      ]);
      console.log('Employee added successfully!');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  }
  
  async function updateEmployeeRole() {
    try {
      const employeeId = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter the ID of the employee whose role you want to update:'
        }
      ]);
      const newRoleId = await inquirer.prompt([
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the new role ID for the employee:'
        }
      ]);
      await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [
        newRoleId,
        employeeId
      ]);
      console.log('Employee role updated successfully!');
    } catch (error) {
      console.error('Error updating employee role:', error);
    }
  }
  
  async function viewAllRoles() {
    try {
      const roles = await db.query('SELECT * FROM role');
      console.log('\nAll Roles:\n');
      console.table(roles);
    } catch (error) {
      console.error('Error viewing all roles:', error);
    }
  }
  
  async function addRole() {
    try {
      const roleData = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role:'
        },
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID for the role:'
        }
      ]);
      await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [
        roleData.title,
        roleData.salary,
        roleData.departmentId
      ]);
      console.log('Role added successfully!');
    } catch (error) {
      console.error('Error adding role:', error);
    }
  }
  
  async function viewAllDepartments() {
    try {
      const departments = await db.query('SELECT * FROM department');
      console.log('\nAll Departments:\n');
      console.table(departments);
    } catch (error) {
      console.error('Error viewing all departments:', error);
    }
  }
  
  async function addDepartment() {
    try {
      const departmentData = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name of the department:'
        }
      ]);
      await db.query('INSERT INTO department (name) VALUES (?)', [departmentData.name]);
      console.log('Department added successfully!');
    } catch (error) {
      console.error('Error adding department:', error);
    }
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
      db.end(); // Close MySQL connection pool
      return;
  }

  start(); // Re-prompt for next action
}

start(); // Start the application
