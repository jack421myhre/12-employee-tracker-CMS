// ------------------------------
// ---- EMPLOYEE TRACKER CMS ----
// ------------------------------

// ---- IMPORTS ----
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
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
    // The main CLI. The user navigates this to control the employee database. Each option has a function to manipulate the data for the user.
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

// Adds a new employee by accessing user answers
// then inserting the new employee into the database
// via db.query
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
                    // Shows the changes table
                    console.table(response);
                    // Brings the options back up
                    init();
                });
        });
}

// Updates the employee role after asking for the name of the employee to change. Searches by last name and changes the role ID.
function updateEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Last name of employee to update?',
                name: 'employeeToUpdate'
            },
            {
                type: 'input',
                message: "What is the employee's new role?",
                name: 'newEmployeeRole'
            }
        ])
        .then(({ employeeToUpdate, newEmployeeRole }) => {
            db.query(`UPDATE employee SET role_id = ? WHERE last_name = ?`, [newEmployeeRole, employeeToUpdate], (err, response) => {
                if (err) throw err;
                console.table(response);
                init();
            });
        });
}

// Populates all roles to the CLI. 
function viewAllRoles() {
    db.query(`SELECT * FROM role`, (err, response) => {
        if (err) throw err;
        console.table(response);
        init();
    });
}

// Adds a new role. Gets the new role title, salary, and the department ID. 
// NOTE: The department MUST exist prior to adding the role. A new error will be thrown if the user tries to add a new department through this action.
function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Which role?',
                name: 'newRole'
            },
            {
                type: 'input',
                message: 'Role salary?',
                name: 'newSalary'
            },
            {
                type: 'input',
                message: 'Department ID?',
                name: 'departmentId'
            }
        ])
        .then(({ newRole, newSalary, departmentId }) => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [newRole, newSalary, departmentId], (err, response) => {
                if (err) {
                    // CUSTOM ERROR
                    throw new Error('Unable to add role to department that does not exist. Add department first.');
                };
                console.table(response);
                init();
            });
        });
}

// Populates all departments to the CLI.
function viewDepts() {
    db.query(`SELECT * FROM department`, (err, response) => {
        if (err) throw err;
        console.table(response);
        init();
    });
}

// Adds a department to the existing list. After this action is taken, the user can then add new roles to this department.
function addDept() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Department name?',
                name: 'newDeptName'
            }
        ]).then(({ newDeptName }) => {
            db.query(`INSERT INTO department (name) VALUES (?)`, newDeptName, (err, response) => {
                if (err) throw err;
                console.table(response);
                init();
            });
        });
}

// Initialize the application
init();