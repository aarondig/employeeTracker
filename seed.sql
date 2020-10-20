USE employeesDB;

INSERT INTO department (department_name) VALUES
    ("Sales"),
    ("Finance"),
    ("Marketing"),
    ("Engineering");

INSERT INTO roles (title, salary, department_id) VALUES
    ("Sales Associate", 60000, 1),
    ("Lead Sales Associate", 70000, 1),
    ("Sales Director", 80000, 1),
    ("Accountant", 100000, 2),
    ("Director of Treasury", 180000, 2),
    ("Data Analyst", 110000, 3),
    ("Advertisement Specialist", 120000, 3),
    ("Software Engineer", 120000, 4),
    ("Product Manager", 220000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ("Aaron", "Diggdon", 9, NULL),
    ("Christopher", "Nolan", 8, 1),
    ("Leonardo", "Dicaprio", 3, NULL),
    ("Roger", "Deakins", 5, 3);