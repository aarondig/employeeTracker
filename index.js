var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table")
var Table = require('cli-table');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "password",
    database: "employeesDB"

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
    start();
});

// var employeeArray = [];
// var roleArray = [];

function start() {
    inquirer.prompt([{
        type: "list",
        name: "userOptions",
        message: "What would you like to do?",
        choices: [
            "Add Employee",
            "Add Role",
            "Add Department",
            "View Employees",
            "View Roles",
            "View Department",
            "Update Employee Role"
        ]
    }]).then(function(answer) {
        switch (answer.userOptions) {
            case "Add Employee":
                addEmployee();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "View Employees":
                viewEmployees();
                break;

            case "View Roles":
                viewRoles();
                break;

            case "View Department":
                viewDepartment();
                break;

            case "Update Employee Role":
                updateEmployeeRole();
                break;

        }
    })
}

function addEmployee() {

    var roles = {}
    var managers = {}

    connection.query(`SELECT roles.title, roles.id
                    FROM roles;`, function(err, res) {

        for (var i = 0; i < res.length; i++) {
            roles[res[i].title] = res[i].id;
        }
        connection.query(`SELECT CONCAT(first_name, " ", last_name) AS Name,
                    id
                    FROM employee 
                    WHERE manager_id IS NULL;`, function(err, man) {
            for (var i = 0; i < man.length; i++) {
                managers[man[i].Name] = man[i].id;
            }

            inquirer.prompt([{
                name: "firstName",
                type: "input",
                message: "\nEnter the employee's first name:\n"
            }, {
                name: "lastName",
                type: "input",
                message: "Enter the employee's last name:\n"
            }, {
                name: "role",
                type: "list",
                message: "Enter the employee's role:\n",
                choices: Object.keys(roles)
            }, {
                name: "manager",
                type: "list",
                message: "What is the ID of your manager?\n",
                choices: Object.keys(managers)

            }]).then(function(answers) {
                connection.query("INSERT INTO employee SET ?", {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: roles[answers.role],
                    manager_id: managers[answers.manager]
                })
                connection.query("SELECT * FROM employee", function(err, res) {
                    console.table(res);
                })
            })
        })
    })
}

function addRole() {
    var departments = {}

    connection.query(`SELECT department_name, id
                    FROM department;`, function(err, res) {

        for (var i = 0; i < res.length; i++) {
            departments[res[i].department_name] = res[i].id;
        }

        inquirer.prompt([{
            name: "newRoleName",
            type: "input",
            message: "\nWhat is your new role's name?\n"
        }, {
            name: "newRoleDep",
            type: "list",
            message: "Which department is it in?\n",
            choices: Object.keys(departments)
        }, {
            name: "salary",
            type: "input",
            message: "What is the role's yearly salary?\n"
        }]).then(function(response) {
            connection.query("INSERT INTO roles SET ?", {
                title: response.newRoleName,
                department_id: departments[response.newRoleDep],
                salary: response.salary
            })
            var query = `SELECT roles.id AS ID, 
                roles.title AS Role, 
                roles.salary AS Salary,
                department.department_name AS Department
                FROM roles
                LEFT JOIN department
                ON roles.department_id = department.id;`;
            connection.query(query, function(err, res) {
                console.table(res);
            });
        })
    })
}

function addDepartment() {


}

function viewEmployees() {
    var query = `SELECT CONCAT(employee.first_name, " ", employee.last_name) AS Name,
                roles.title,
                department.department_name, 
                IF (CONCAT(employee2.first_name, " ", 
                employee2.last_name) IS NULL, 
                "Is a Manager", CONCAT(employee2.first_name, " ", employee2.last_name)) AS Manager
                FROM employee
                LEFT JOIN roles
                ON employee.role_id = roles.id
                LEFT JOIN department
                ON roles.department_id = department.id
                LEFT JOIN employee AS employee2
                ON employee2.manager_id = employee.id`;
    connection.query(query, function(err, res) {
        console.table(res);
    });
}

function viewRoles() {
    var query = `SELECT roles.id AS ID, 
                roles.title AS Role, 
                roles.salary AS Salary,
                department.department_name AS Department
                FROM roles
                LEFT JOIN department
                ON roles.department_id = department.id;`;
    connection.query(query, function(err, res) {
        console.table(res);
    });
}

function updateEmployeeRole() {
    var employeeUpdate = {}
    var roleUpdate = {}
    connection.query(`SELECT CONCAT(first_name, " ", last_name) AS names, id
                    FROM employee;`, function(err, res) {

        for (var i = 0; i < res.length; i++) {
            employeeUpdate[res[i].names] = res[i].id;
        }
        connection.query(`SELECT roles.title, roles.id
                    FROM roles;`, function(err, rol) {

            for (var i = 0; i < rol.length; i++) {
                roleUpdate[rol[i].title] = rol[i].id;
            }
            inquirer.prompt([{
                name: "employee",
                type: "list",
                message: "\nWhich employee would you like to update?\n",
                choices: Object.keys(employeeUpdate)
            }, {
                name: "role",
                type: "list",
                message: "What is their new role?\n",
                choices: Object.keys(roleUpdate)
            }]).then(function(response) {
                console.log(roleUpdate[response.role]);
                console.log(employeeUpdate[response.employee]);
                connection.query("UPDATE employee SET ? WHERE ?", [{
                    //What Updates
                    role_id: roleUpdate[response.role]
                }, {
                    //Where
                    id: employeeUpdate[response.employee]
                }])
                var query = `SELECT CONCAT(employee.first_name, " ", employee.last_name) AS Name, 
                roles.title AS Role, 
                roles.salary AS Salary,
                department.department_name AS Department
                FROM employee
                LEFT JOIN roles
                ON employee.role_id = roles.id
                LEFT JOIN department
                ON roles.department_id = department.id;`;
                connection.query(query, function(err, res) {
                    console.table(res);
                });
            })
        })
    })
}