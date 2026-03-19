using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PacificKode_Backend.Models;
using System;
using System.Collections.Generic;
using System.Data;

namespace PacificKode_Backend.Repositories
{
    public interface IEmployeeRepository
    {
        IEnumerable<Employee> GetAll();
        Employee GetById(int id);
        void Add(Employee employee);
        void Update(Employee employee);
        void Delete(int id);
    }

    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly string _connectionString;
        private readonly ILogger<EmployeeRepository> _logger;

        public EmployeeRepository(IConfiguration configuration, ILogger<EmployeeRepository> logger)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            _logger = logger;
        }

        public IEnumerable<Employee> GetAll()
        {
            var employees = new List<Employee>();
            using (var conn = new SqlConnection(_connectionString))
            {
                var query = @"
                    SELECT e.*, d.DepartmentName 
                    FROM Employee e
                    INNER JOIN Department d ON e.DepartmentId = d.DepartmentId";
                
                var cmd = new SqlCommand(query, conn);
                _logger.LogInformation("Executing SQL: {Query}", query);
                try
                {
                    conn.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            employees.Add(new Employee
                            {
                                EmployeeId = (int)reader["EmployeeId"],
                                FirstName = reader["FirstName"].ToString(),
                                LastName = reader["LastName"].ToString(),
                                EmailAddress = reader["EmailAddress"].ToString(),
                                DateOfBirth = (DateTime)reader["DateOfBirth"],
                                Age = (int)reader["Age"],
                                Salary = (decimal)reader["Salary"],
                                DepartmentId = (int)reader["DepartmentId"],
                                DepartmentName = reader["DepartmentName"].ToString()
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to retrieve employees from database. Connection String: {Conn}", _connectionString);
                    throw;
                }
            }
            return employees;
        }

        public Employee GetById(int id)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var query = @"
                    SELECT e.*, d.DepartmentName 
                    FROM Employee e
                    INNER JOIN Department d ON e.DepartmentId = d.DepartmentId
                    WHERE e.EmployeeId = @Id";
                
                var cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Id", id);
                try
                {
                    conn.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Employee
                            {
                                EmployeeId = (int)reader["EmployeeId"],
                                FirstName = reader["FirstName"].ToString(),
                                LastName = reader["LastName"].ToString(),
                                EmailAddress = reader["EmailAddress"].ToString(),
                                DateOfBirth = (DateTime)reader["DateOfBirth"],
                                Age = (int)reader["Age"],
                                Salary = (decimal)reader["Salary"],
                                DepartmentId = (int)reader["DepartmentId"],
                                DepartmentName = reader["DepartmentName"].ToString()
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to get employee ID: {Id}", id);
                    throw;
                }
            }
            return null;
        }

        public void Add(Employee employee)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand(@"
                    INSERT INTO Employee (FirstName, LastName, EmailAddress, DateOfBirth, Salary, DepartmentId) 
                    VALUES (@FirstName, @LastName, @Email, @DOB, @Salary, @DeptId)", conn);
                
                cmd.Parameters.AddWithValue("@FirstName", employee.FirstName);
                cmd.Parameters.AddWithValue("@LastName", employee.LastName);
                cmd.Parameters.AddWithValue("@Email", employee.EmailAddress);
                cmd.Parameters.AddWithValue("@DOB", employee.DateOfBirth);
                cmd.Parameters.AddWithValue("@Salary", employee.Salary);
                cmd.Parameters.AddWithValue("@DeptId", employee.DepartmentId);
                
                _logger.LogInformation("Inserting employee: {FirstName} {LastName}", employee.FirstName, employee.LastName);
                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "FAILED TO DEPLOY PERSONNEL RECORD. SQL State Error.");
                    throw;
                }
            }
        }

        public void Update(Employee employee)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand(@"
                    UPDATE Employee 
                    SET FirstName = @FirstName, LastName = @LastName, EmailAddress = @Email, 
                        DateOfBirth = @DOB, Salary = @Salary, DepartmentId = @DeptId 
                    WHERE EmployeeId = @Id", conn);
                
                cmd.Parameters.AddWithValue("@FirstName", employee.FirstName);
                cmd.Parameters.AddWithValue("@LastName", employee.LastName);
                cmd.Parameters.AddWithValue("@Email", employee.EmailAddress);
                cmd.Parameters.AddWithValue("@DOB", employee.DateOfBirth);
                cmd.Parameters.AddWithValue("@Salary", employee.Salary);
                cmd.Parameters.AddWithValue("@DeptId", employee.DepartmentId);
                cmd.Parameters.AddWithValue("@Id", employee.EmployeeId);
                
                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "FAILED TO UPDATE PERSONNEL RECORD ID: {Id}", employee.EmployeeId);
                    throw;
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand("DELETE FROM Employee WHERE EmployeeId = @Id", conn);
                cmd.Parameters.AddWithValue("@Id", id);
                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "FAILED TO ABORT PERSONNEL RECORD ID: {Id}", id);
                    throw;
                }
            }
        }
    }
}
