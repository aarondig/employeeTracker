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