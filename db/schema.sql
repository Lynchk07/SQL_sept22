--create database --
DROP DATABASE IF EXISTS department_db;

CREATE DATABASE department_db;

--all of the following code will affect department_db --
USE department_db

--create the table --

CREATE TABLE deparment(
    --create a numeric column called "id" which will automatically increment its default value as we create new roles"
    id : INT PRIMARY KEY
    name: VARCHAR(30)
)