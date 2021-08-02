DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

CREATE TAbLE departemnts(
    id INT PRIMARY KEY AUTO_INCREMENT,
    departments_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT
    CONSTRAINT fk_departemnt FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CRETAE TABLE employees(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
    manager_id INT
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
),