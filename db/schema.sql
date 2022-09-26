--create database --
DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

--all of the following code will affect department_db --
USE department_db;

--create the table --

CREATE TABLE deparment (
    --create a numeric column called "id" which will automatically increment its default value as we create new roles"
    id INT PRIMARY KEY,
    namex VARCHAR(30)
);

CREATE TABLE roles (
    id: INT PRIMARY KEY
    title: VARCHAR(30)
    salary: DECIMAL
    department_db: INT

);


CREATE TABLE employee (
    id: INT PRIMARY KEY
    first_name: VARCHAR(30)
    last_name: VARCHAR(30)
    role_id: INT
    manager_id: INT NOT NULL
);