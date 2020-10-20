DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE table department (
    id INT NOT NULL,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

SELECT * FROM department;

CREATE table roles (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(60,4),
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

SELECT * FROM roles;

CREATE table employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (roles_id) REFERENCES roles(id)
);

SELECT * FROM employee;






