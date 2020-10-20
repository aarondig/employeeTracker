var mysql = require("mysql");
var inquirer = require("inquirer");
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

    var rolesArray = [];
    connection.query("SELECT title FROM employee INNER JOIN roles ON employee.role_id = roles.id", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            rolesArray.push(res[i].title);
        }
    })

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
        choices: rolesArray
    }, {
        name: "manager",
        type: "list",
        message: "Is your employee a manager?\n",
        choices: ["Yes", "No"]

    }]).then(function(answers) {
        // switch (answer.manager) {
        //     case "Yes":
        //         answer.manager = null;
        //         break;

        //     case "No":
        //         connection.query("SELECT first_name FROM employee INNER JOIN roles ON employee.role_id = roles.id", function(err, res) {
        //             for (var i = 0; i < res.length; i++) {
        //                 managersArray.push(res[i].first_name);
        //             }
        //         which();
        //         function which() {
        //             inquirer.prompt([{

        //             name: "manager",
        //             type: "list",
        //             message: "Who is your manager??\n",
        //             choices: 
        //             }])
        //         }
        //         break;
        // }
        connection.query("INSERT INTO employee SET ?", {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.role,
            manager_id: answers.manager
        })
        connection.query("SELECT * FROM employee", function(err, res) {
            console.log(res);
        })
        start();
    })
}

function addRole() {


}

function addDepartment() {


}

function viewEmployees() {
    connection.query("SELECT * FROM employee LEFT JOIN roles LEFT JOIN department ", function(err, res) {
        console.table(res);
    });
}

function viewRoles() {
    connection.query("SELECT * FROM roles", function(err, res) {
        console.table(res);
    });
}






// connection.query("SELECT * FROM employee", function (err, res) {
//     var table = new Table({
//         //You can name these table heads chicken if you'd like. They are simply the headers for a table we're putting our data in
//         head: ["ID", "First Name", "Last Name", "Role", "Manager"],
//         //These are just the width of the columns. Only mess with these if you want to change the cosmetics of our response
//         colWidths: [10, 20, 15, 10, 10]

//     });
//     for (var i = 0; i < res.length; i++) {
//         table.push(
//             [res[i].id, res[i].first_name, res[i].last_name, res[i].roles_id, res[i].manager_id],
//         );
//     }
//     console.table(table);
// });
// }