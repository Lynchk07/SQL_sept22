SELECT *
From roles
JOIN department ON roles.department = department_id;

SELECT * 
FROM employee
JOIN roles ON employee.role_id = employee.id;

SELECT *
FROM employee
JOIN roles ON employee.manager_id = manager.id;