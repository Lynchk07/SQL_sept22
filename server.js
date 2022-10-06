 
//import and require mysql2
const mysql = require('mysql2');
//get client
const inquirer = require('inquirer');
//console.table 
const cTABLE = require('console.table');
 //dotenv
require('dotenv').config();



const dbConnection = mysql.createConnection({
    // "-h" host 
    host:process.env.DB_HOST,
    // port:3001,
    //mysql username "-u =user"
    user:process.env.DB_USER,
    //"-p password"
    password: process.env.DB_PASSWORD,
    database:'department_db'
    },
   
    
);

//Welcome message.
console.table(
    "\n ---------EMPLOYEE TRACKER----------\n"
)
//i
dbConnection.connect((err)=> {
    if(err)throw err;
    // console.log(`Connected as id error`);
    startTrackerApp();
});
    //edit error in function here.
    const startTrackerApp = (req,res)=>{
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
            case 'View all Employees':
                viewAllEmployees();
                break;
            case 'View All Roles':
                    viewAllRoles();
                    break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
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

    //response answer - tables 
    function viewAllDepartments(){
        dbConnection.query(`SELECT * FROM department`, (err,res) => {
            if (err) throw err;
            console.table('\n',res,'\n');
            startTrackerApp();
        
        })
    };

     function viewAllEmployees(){
        dbConnection.query(`SELECT * FROM employee`, (err, res) => {
            if (err) throw err;
            console.table('\n',res,'\n');
            startTrackerApp();
        })
    };

    function viewAllRoles(){
        dbConnection.query(`SELECT * FROM roles `, (err, res) => {
            if (err) throw err;
            console.table('\n',res,'\n');
            startTrackerApp();
        })
    };


    function addDepartment(){
        const addDepartmentQuestion=[
            {
                type:'input',
                name: 'newDepartment',
                message:'What Department would you like to add?'
            },
        ]; 

        inquirer.prompt(addDepartmentQuestion)
            .then((response)=> {
                dbConnection.query(`INSERT INTO department (department_name) VALUES (?)`,[response.newDepartment], (err,res)=>{
                    if (err) throw err;
                     else {
                        console.log(`${response.newDepartment}is added to departments`)
                        startTrackerApp();

                        }
                });
            },
      )};


    function addEmployee(){
        dbConnection.query(`INSERT INTO employee ()`, (err, res) => {
            if (err) throw err;
            console.table('\n',res,'\n');
            startTrackerApp();
        })
    };

    function updateEmployeeRole(){
        dbConnection.query(`SELECT employee FROM roles `, (err, res) => {
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