-- Create Database
CREATE DATABASE PacificKode_DB;

-- Use Database
USE PacificKode_DB;

-- Department Table
CREATE TABLE Department (
    DepartmentId INT AUTO_INCREMENT PRIMARY KEY,
    DepartmentCode VARCHAR(50) NOT NULL UNIQUE,
    DepartmentName VARCHAR(100) NOT NULL
);

-- Employee Table
CREATE TABLE Employee (
    EmployeeId INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    EmailAddress VARCHAR(255) NOT NULL UNIQUE,
    DateOfBirth DATE NOT NULL,
    Age INT,
    Salary DECIMAL(18,2) NOT NULL,
    DepartmentId INT NOT NULL,
    FOREIGN KEY (DepartmentId) REFERENCES Department(DepartmentId)
);

-- Insert Departments
INSERT INTO Department (DepartmentCode, DepartmentName) 
VALUES 
('IT', 'Information Technology'),
('HR', 'Human Resources'),
('FIN', 'Finance');

-- Insert Employee
INSERT INTO Employee 
(FirstName, LastName, EmailAddress, DateOfBirth, Age, Salary, DepartmentId)
VALUES 
('John', 'Doe', 'john.doe@example.com', '1990-05-15', 
TIMESTAMPDIFF(YEAR, '1990-05-15', CURDATE()), 
50000.00, 
1);