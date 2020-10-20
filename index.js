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

connection.connect(function (err){
    if (err) throw err;
    console.log("Connected");
    runPrompts();
});

function runPrompts(){
    // connection.query("SELECT * FROM employees", function (err, res) {
    //     var table = new Table({
    //         //You can name these table heads chicken if you'd like. They are simply the headers for a table we're putting our data in
    //         head: ["ID", "First Name", "Last Name", "Role", "ManagerID"],
    //         //These are just the width of the columns. Only mess with these if you want to change the cosmetics of our response
    //         colWidths: [10, 20, 15, 10, 10]
        
    //     });
    // });
}