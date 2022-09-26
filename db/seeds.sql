--multiple departments--
INSERT INTO department (id,namex)
VALUES
(001, 'Engineering'),
(002, 'Finance'),
(003, 'Legal' ),
(004, 'Sales' );

SELECT * FROM department;

INSERT INTO roles (id,title,salary,department_db)
VALUES ("801","Software Engineer","70000","Engineering")

SELECT * FROM roles;

--  id: INT PRIMARY KEY
--     title: VARCHAR(30)
--     salary: DECIMAL
--     department_db: INT

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUES ("801","Dwight","Schutt","456"."null")

-- id: INT PRIMARY KEY
--     first_name: VARCHAR(30)
--     last_name: VARCHAR(30)
--     role_id: INT
--     manager_id: INT NOT NULL

SELECT * FROM employee;