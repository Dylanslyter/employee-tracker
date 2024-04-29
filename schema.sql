SET FOREIGN_KEY_CHECKS=0;

-- Create Department table
CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

-- Create Role table
CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create Employee table
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Alter Department table to add auto-increment to id column
ALTER TABLE department MODIFY COLUMN id INT AUTO_INCREMENT;

-- Alter Role table to add auto-increment to id column
ALTER TABLE role MODIFY COLUMN id INT AUTO_INCREMENT;

-- Alter Employee table to add auto-increment to id column
ALTER TABLE employee MODIFY COLUMN id INT AUTO_INCREMENT;

SET FOREIGN_KEY_CHECKS=1;