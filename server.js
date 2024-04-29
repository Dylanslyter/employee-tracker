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
  
      // Access the roleId and id values from the objects returned by inquirer.prompt
      const roleId = newRoleId.roleId;
      const id = employeeId.id;
  
      // Execute the SQL query with placeholders and pass the values as an array
      await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [
        roleId,
        id
      ]);
      console.log('Employee role updated successfully!');
    } catch (error) {
      console.error('Error updating employee role:', error);
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
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        console.error('Error adding role: The specified department ID does not exist.');
      } else {
        console.error('Error adding role:', error);
      }
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
  
async function viewAllDepartments() {
  try {
    const [departments] = await db.query('SELECT * FROM department');
    console.log('\nAll Departments:\n');
    departments.forEach(department => {
      console.log(`Department ID: ${department.id}`);
      console.log(`Name: ${department.name}`);
      console.log('---------------------'); 
    });
  } catch (error) {
    console.error('Error viewing all departments:', error);
  }
}

async function viewAllRoles() {
  try {
    const [roles] = await db.query('SELECT * FROM role');
    console.log('\nAll Roles:\n');
    roles.forEach(role => {
      console.log(`Role ID: ${role.id}`);
      console.log(`Title: ${role.title}`);
      console.log(`Salary: ${role.salary}`);
      console.log(`Department ID: ${role.department_id}`);
      console.log('---------------------');
    });
  } catch (error) {
    console.error('Error viewing all roles:', error);
  }
}

async function getAllEmployees() {
  try {
    const [employees] = await db.query('SELECT * FROM employee');
    console.log('\nAll Employees:\n');
    employees.forEach(employee => {
      console.log(`Employee ID: ${employee.id}`);
      console.log(`First Name: ${employee.first_name}`);
      console.log(`Last Name: ${employee.last_name}`);
      console.log(`Role ID: ${employee.role_id}`);
      console.log('---------------------');
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}

  
async function start() {
  console.log('Welcome to Employee Management System!');

  try {
    while (true) {
      const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'Add Employee',
          'Update Employee Role',
          'View All Roles',
          'Add Role',
          'View All Departments',
          'Add Department',
          'Quit'
        ]
      });

      switch (action) {
        case "View All Employees":
          await getAllEmployees();
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
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

start(); // Start the applicationstart(); // Start the application
