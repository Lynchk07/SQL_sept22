//get client 
const mysql = require('mysql2');

const inquirer = require('inquirer.js')

//prompt to view all departments 
inquirer
    .prompt([
        {type:'list',
        message: 'What would you like to do?',
        options:'View all Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department'}
    ])


const ctable = require('console.table');

console.table([
    {
        Department: 'id',

    }
]

// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role