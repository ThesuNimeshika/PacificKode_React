-- Database: PacificKode_DB
-- SQL Server 2014 or higher

CREATE DATABASE PacificKode_DB;
GO

USE PacificKode_DB;
GO

-- Department Table
CREATE TABLE Department (
    DepartmentId INT PRIMARY KEY IDENTITY(1,1),
    DepartmentCode NVARCHAR(50) NOT NULL UNIQUE,
    DepartmentName NVARCHAR(100) NOT NULL
);
GO

-- Employee Table
CREATE TABLE Employee (
    EmployeeId INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    EmailAddress NVARCHAR(255) NOT NULL UNIQUE,
    DateOfBirth DATE NOT NULL,
    Age AS (DATEDIFF(YEAR, DateOfBirth, GETDATE())),
    Salary DECIMAL(18, 2) NOT NULL,
    DepartmentId INT NOT NULL,
    FOREIGN KEY (DepartmentId) REFERENCES Department(DepartmentId)
);
GO

-- Insert Initial Data
INSERT INTO Department (DepartmentCode, DepartmentName) VALUES ('IT', 'Information Technology');
INSERT INTO Department (DepartmentCode, DepartmentName) VALUES ('HR', 'Human Resources');
INSERT INTO Department (DepartmentCode, DepartmentName) VALUES ('FIN', 'Finance');
GO

INSERT INTO Employee (FirstName, LastName, EmailAddress, DateOfBirth, Salary, DepartmentId)
VALUES ('John', 'Doe', 'john.doe@example.com', '1990-05-15', 50000.00, 1);
GO
