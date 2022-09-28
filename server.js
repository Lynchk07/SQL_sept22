 
//import and require mysql2
const mysql = require('mysql2');
//get client
const inquirer = require('inquirer')
//console.table 
const cTABLE = require('console.table');

//Welcome message.
console.table(
    "\n ---------EMPLOYEE TRACKER----------\n"
)
const dbConnection = mysql.createConnection({
    // "-h" host 
    host:'localhost',
    // port:3001,
    //mysql username "-u =user"
    user:'root',
    //"-p password"
    password: '@Jacubr47!',
    database:'department_db'
    },
    console.log('Connected to the department_db database'
    )
    
);
//is this required?
dbConnection.connect((err)=> {
    if(err)throw err;
    console.log(`Connected as id error`);
    startTrackerApp();
});

    //edit error in function here.
    const startTrackerApp =(req,res) => {
    //prompt to view all departments 
    inquirer
        .prompt([
            {
            name: 'userChoice',
            type:'list',
            message: 'What would you like to do?',
            choices:['View All Departments','Add Department','View all Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department','exit']
            },
    ]).then((response) => {
        switch (response.userChoice) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'View all Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                    addRole();
                    break;
            case 'Exit':
                dbConnection.end();
                console.timeLog('\n Exit Employee Tracker.\n');
                return;
                default:
                break;
            }
        })
    };

    viewAllDepartments = () => {
        dbConnection.query(`SELECT * FROM department`, (err,res) => {
            if (err) throw err;
            console.table('\n',res,'\n');
        
        })
    };

    addDepartment = () => {
        dbConnection.query(`SELECT * FROM department`, (err, res) => {
            if (err) throw err;
            console.table('\n',res,'\n');
            startTrackerApp();
        })
    };

    viewAllEmployees = () => {
        dbConnection.query(`SELECT * FROM employees`, (err, res) => {
            if (err) throw err;
            console.table('\n',res,'\n');
            startTrackerApp();
        })
    };

    addEmployee = () => {
        dbConnection.query(`SELECT * FROM employee`, (err, res) => {
            if (err) throw err;
            console.table('\n',res,'\n');
            startTrackerApp();
        })
    };

    updateEmployeeRole = () => {
        dbConnection.query(`SELECT * FROM roles `, (err, res) => {
            if (err) throw err;
            console.table('\n',res,'\n');
            startTrackerApp();
        })
    };


    viewAllRoles = () => {
        dbConnection.query(`SELECT * FROM roles `, (err, res) => {
            if (err) throw err;
            console.table('\n',res,'\n');
            startTrackerApp();
        })
    };


   

// //Initialize 
// function init() {
//     viewAllDepartments();

// }
// init();