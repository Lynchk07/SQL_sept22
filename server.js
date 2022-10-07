 
//import and require mysql2
const mysql = require('mysql2');
//get client
const inquirer = require('inquirer');
//console.table 
const cTABLE = require('console.table');
 //dotenv
require('dotenv').config();

//Arrays created for department and roles:
const companyDepartments = [];
const companyRoles = [];



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
    // startTrackerApp();
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
    //function called when user select "view all departments"
    function viewAllDepartments(){
        dbConnection.query(`SELECT * FROM department`, (err,res) => {
            if (err) throw err;
            console.table('\n',res,'\n');
            startTrackerApp();
        
        })
    };
    //function called when user select "view all employees"
     function viewAllEmployees(){
        dbConnection.query(`SELECT * FROM employee`, (err, res) => {
            if (err) throw err;
            console.table('\n',res,'\n');
            startTrackerApp();
        })
    };
    //function called when user select "view all roles"
    function viewAllRoles(){
        dbConnection.query(`SELECT * FROM roles `, (err, res) => {
            if (err) throw err;
            console.table('\n',res,'\n');
            startTrackerApp();
        })
    };

//Function called when "Add Department" is choosen.
    function addDepartment(){
       inquirer.prompt([
            {
                type:'input',
                message:'What Department would you like to add?',
                name: 'department'
            },
        ])
        .then(({department})=> {
                dbConnection.query(`INSERT INTO department SET ?`,
                {
                    name:'department'
                }, 
                function (err) {
                    if (err) throw err;
                    console.log(`${department} is added to departments.`);
                    companyDepartments.push(department);

                    startTrackerApp();

                    }
                );
            },
      )};

//function to add an Employee
    function addEmployee() {
        inquirer.prompt([
            {
            type: "input",
            message: "Employee's first name?",
            name:'firstName'
            },
            {
            type: "input",
            message: "Employee's last name?",
            name:'lastName'
            },
            {
            type: "list",
            message: "What is the employee's role?",
            choices:'roles',
            name:'roles'
            },
            {
            type: "list",
            message: "Who is the employee's manager?",
            choices:["null"],
            name:'manager'
            },
    ])

        .then(answer=> {
            emplFirstName = answer.firstName;
            emplLastName = answer.lastName;

        dbConnection.query(`INSERT INTO employee SET ?`, {
            emplFirstName: employee.first_name,
            emplLastName: employee.last_name,
            role_id: res [0].id

        },
        
        function (err){
            if (err) throw err;
            console.table('\n',res,'\n');
        })
    })
            startTrackerApp();
        
    };
// function to update an employee role 
    function updateEmployeeRole(){
        let employeeDataList

        dbConnection.query(`SELECT first_name, last_name FROM employee `, 
        function (err, res){
            if (err) throw err;
            console.table('\n',res,'\n');
            employeeDataList = res.map(employee => {
                return `${employee.first_name}${employee.last_name}`
            })
            console.table(employeeDataList);
            inquirer.prompt([
                {
                type:"list",
                messages: "Who's role would you like to update?",
                choices: employeeDataList,
                name: "employee"
            },
            {
                type:"list",
                messages: "What role do you want to assign?",
                choices: roles,
                name: "roles"
            },
        ]).then(response => {});
            
        });
    };

    startTrackerApp();


    


// //Initialize 
// function init() {
//     viewAllDepartments();

// }
// init();