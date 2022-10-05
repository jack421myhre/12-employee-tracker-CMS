// ------------------------------
// ---- EMPLOYEE TRACKER CMS ----
// ------------------------------

// ---- IMPORTS ----
const inquirer = require('inquirer');
const mysql = require('mysql2');


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
        .catch(err => err ? console.log(err) : console.log('PASSED.'));
};

// ------------------------------
//   ---- PROMPT FUNCTIONS ----
// ------------------------------
function viewEmployees() {
    db.query(`SELECT * FROM employee`, (err, response) => {
        if (err) throw err;
        console.table(response);
        init();
    })
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Employee first name?',
                name: 'employeeFirstName',
            },
            {
                type: 'input',
                message: 'Employee last name?',
                name: 'employeeLastName',
            },
            {
                type: 'input',
                message: 'Employee Role ID number?',
                name: 'roleId'
            },
            {
                type: 'input',
                message: 'Manager ID number?',
                name: 'managerId'
            }
        ])
        .then(({ employeeFirstName, employeeLastName, roleId, managerId }) => {
            db.query(
                `INSERT INTO employee 
                (first_name, 
                    last_name,
                    role_id,
                    manager_id) VALUES (?, ?, ?, ?)`,
                [
                    employeeFirstName,
                    employeeLastName,
                    roleId,
                    managerId
                ], (err, response) => {
                    if (err) throw err;
                    console.table(response);
                    init();
                });
        });
}

function updateEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Name employee to update.',
                name: 'employeeToUpdate'
            },
            {
                type: 'input',
                message: "What is the employee's new role?",
                name: 'newEmployeeRole'
            }
        ])
        .then(({ employeeToUpdate, newEmployeeRole }) => {
            db.query(`UPDATE employee SET role_id = ? WHERE first_name = ?`, [newEmployeeRole, employeeToUpdate], (err, response) => {
                if (err) throw err;
                console.table(response);
                init();
            });
        });
}

function viewAllRoles() {
    db.query(`SELECT * FROM role`, (err, response) => {
        if (err) throw err;
        console.table(response);
        init();
    });
}



// Initialize the application
init();