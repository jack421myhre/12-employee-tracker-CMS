INSERT INTO department (name)
VALUES ('Sales'), 
       ('Accounting'), 
       ('Activations'), 
       ('Human Resources'),
       ('IT');

INSERT INTO role (title, salary, department_id)
VALUES ('Head of Sales', 80000, 1),
       ('Account Manager', 60000, 2),
       ('Activations Coordinator', 45000, 3),
       ('Onboarding', 60000, 4),
       ('Advisor', 75000, 4),
       ('Admin', 95000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sarah', 'Fuller', 1, 1),
       ('John', 'Smith', 2, 1),
       ('Vincent', 'Castro', 3, 1),
       ('Jane', 'Doe', 4, 1),
       ('Chris', 'Hansen', 4, 1),
       ('Elliot', 'Alderson', 5, 1);