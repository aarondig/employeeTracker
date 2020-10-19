CREATE database employeesDB;

USE employeesDB;

CREATE table employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
)

SELECT * FROM employee;

CREATE table role (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
)

SELECT * FROM role;

CREATE table department (
    id INT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
)

SELECT * FROM department;