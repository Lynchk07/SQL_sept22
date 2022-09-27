use department_db;
INSERT INTO department (name)
VALUES
('Engineering'),
('Finance'),
('Legal' ),
('Sales' );


INSERT INTO roles (title,salary,department_id)
VALUES ("Software Engineer","70000", 1),
("Accountant","90000",2),
("Lawyer","70000",3),
("Account Manager","70000",4);


INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Dwight","Schrutt",1,null),
("Michael","Scott",2,null),
("Andy","Bernard",3,2),
("Jim","Halpert",4,2);


