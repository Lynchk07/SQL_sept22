 
//import and require mysql2
const mysql = require('mysql2');
//get client
const inquirer = require('inquirer');
//console.table 
const cTABLE = require('console.table');
 //dotenv
require('dotenv').config()

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
                    name:department
                }, 
                function (err) {
                    if (err) throw err;
                    console.log(`${department} is added to departments.`);
                    // companyDepartments.push(department);

                    startTrackerApp();

                    }
                );
            },
      )};

    async function addRole(){
        const [departments] = await dbConnection.promise().query("SELECT * FROM department")
        const departmentArray = departments.map(department => ({name:department.name,value:department.id}))
        
        inquirer.prompt([
            {
                type:'input',
                name:'title',
                message:'What is the new roles title?'
            },
            {
                type:'input',
                name:'salary',
                message:'What is the salary?'   
            },
            {
                type:'list',
                name:'departmentid',
                message:'Please select department',
                choices:departmentArray   
            },
        ]).then(answers => {
            var roleObject = {
                title:answers.title,
                salary:answers.salary,
                department_id:answers.departmentid
            }
            dbConnection.query("INSERT INTO roles SET ?", roleObject, function (err) {
                if (err) throw err;
                startTrackerApp();
            }
                )
        })
    }
//function to add an Employee
 async function addEmployee() {
    const [roles] = await dbConnection.promise().query("SELECT * FROM roles")
        const rolesArray = roles.map(role => ({name:role.title,value:role.id}))

        const [managers] = await dbConnection.promise().query("SELECT * FROM employee")
        const managersArray = managers.map(manager=> ({name:manager.first_name+' '+manager.last_name,value:manager.id}))
        console.log(managersArray)

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
            choices:rolesArray,
            name:'roles'
            },
            {
            type: "list",
            message: "Who is the employee's manager?",
            choices:managersArray,
            name:'manager'
            },
    ])

        .then(answer=> {
            console.log(answer)
            var employeeObject = {first_name:answer.firstName,last_name:answer.lastName,role_id:answer.roles,manager_id:answer.manager}
        dbConnection.query(`INSERT INTO employee SET ?`,employeeObject,
        
        function (err){
            if (err) throw err;
            viewAllEmployees();
            
        })
    })
          
    };
// function to update an employee role 
    async function updateEmployeeRole(){
        const [roles] = await dbConnection.promise().query("SELECT * FROM roles")
        const rolesArray = roles.map(role => ({name:role.title,value:role.id}))


       
        //         const [managers] = await dbConnection.promise().query("SELECT * FROM employee")
        //         const managersArray = managers.map(manager=> ({name:manager.first_name+' '+manager.last_name,value:manager.id}))
        //         console.log(managersArray)
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
                choices: role,
                name: "roles"
            },
        ]).then(response => {
            console.log(answer)
            
            var updateRole = {first_name:answer.firstName,last_name:answer.lastName,role_id:answer.roles,manager_id:answer.manager}

            
        //     dbConnection.query(`INSERT INTO employee SET ?`,employeeObject,
            
        //     function (err){
        //         if (err) throw err;
        //         viewAllEmployees();
                
        //     })
        // })
        });
            
        });
    };

    startTrackerApp();


    


// //Initialize 
// function init() {
//     viewAllDepartments();

// }
// init();