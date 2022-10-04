// ------------------------------
// ---- EMPLOYEE TRACKER CMS ----
// ------------------------------

// ---- IMPORTS ----
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');


// ------------------------------
//  --- DATABASE CONNECTION --- 
// ------------------------------
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
);

// ------------------------------
//   ---- PROMPT FUNCTIONS ----
// ------------------------------



// ------------------------------
//    ---- USER INTERFACE ----
// ------------------------------
function init() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ]
        }]).then(({ action }) => {
            switch (action) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewDepts();
                    break;
                case "Add Department":
                    addDept();
                    break;
                case "Quit":
                    db.end();
                    break;
            }
        })
        .catch(err => err ? console.log(err) : console.log('PASSED.'))
};



// Initialize the application
init();