using Microsoft.AspNetCore.Mvc;
using PacificKode_Backend.Data;
using PacificKode_Backend.Models;
using MySqlConnector;
using System;
using System.Collections.Generic;

namespace PacificKode_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var db = new CONNECTION();
            var employees = new List<Employee>();

            try
            {
                db.openConnection();

                string query = @"
                    SELECT e.*, d.DepartmentName 
                    FROM Employee e
                    INNER JOIN Department d ON e.DepartmentId = d.DepartmentId";

                using (var cmd = new MySqlCommand(query, db.GetCon()))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            employees.Add(new Employee
                            {
                                EmployeeId = (int)reader["EmployeeId"],
                                FirstName = reader["FirstName"]?.ToString() ?? string.Empty,
                                LastName = reader["LastName"]?.ToString() ?? string.Empty,
                                EmailAddress = reader["EmailAddress"]?.ToString() ?? string.Empty,
                                DateOfBirth = (DateTime)reader["DateOfBirth"],
                                Age = reader["Age"] != DBNull.Value ? (int)reader["Age"] : (int?)null,
                                Salary = (decimal)reader["Salary"],
                                DepartmentId = (int)reader["DepartmentId"],
                                DepartmentName = reader["DepartmentName"]?.ToString() ?? string.Empty
                            });
                        }
                    }
                }
                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Database Connection Error", details = ex.Message });
            }
            finally
            {
                db.Close();
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var db = new CONNECTION();
            
            try
            {
                db.openConnection();

                string query = @"
                    SELECT e.*, d.DepartmentName 
                    FROM Employee e
                    INNER JOIN Department d ON e.DepartmentId = d.DepartmentId
                    WHERE e.EmployeeId = @Id";

                using (var cmd = new MySqlCommand(query, db.GetCon()))
                {
                    cmd.Parameters.AddWithValue("@Id", id);
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            var emp = new Employee
                            {
                                    EmployeeId = (int)reader["EmployeeId"],
                                    FirstName = reader["FirstName"]?.ToString() ?? string.Empty,
                                    LastName = reader["LastName"]?.ToString() ?? string.Empty,
                                    EmailAddress = reader["EmailAddress"]?.ToString() ?? string.Empty,
                                    DateOfBirth = (DateTime)reader["DateOfBirth"],
                                    Age = reader["Age"] != DBNull.Value ? (int)reader["Age"] : (int?)null,
                                    Salary = (decimal)reader["Salary"],
                                    DepartmentId = (int)reader["DepartmentId"],
                                    DepartmentName = reader["DepartmentName"]?.ToString() ?? string.Empty
                            };
                            return Ok(emp);
                        }
                    }
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Database Connection Error", details = ex.Message });
            }
            finally
            {
                db.Close();
            }
        }

        [HttpPost]
        public IActionResult Create(Employee employee)
        {
            var db = new CONNECTION();
            
            try
            {
                db.openConnection();
                string query = @"
                    INSERT INTO Employee (FirstName, LastName, EmailAddress, DateOfBirth, Salary, DepartmentId) 
                    VALUES (@FirstName, @LastName, @Email, @DOB, @Salary, @DeptId)";

                using (var cmd = new MySqlCommand(query, db.GetCon()))
                {
                    cmd.Parameters.AddWithValue("@FirstName", employee.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", employee.LastName);
                    cmd.Parameters.AddWithValue("@Email", employee.EmailAddress);
                    cmd.Parameters.AddWithValue("@DOB", employee.DateOfBirth);
                    cmd.Parameters.AddWithValue("@Salary", employee.Salary);
                    cmd.Parameters.AddWithValue("@DeptId", employee.DepartmentId);
                    cmd.ExecuteNonQuery();
                }
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Database Connection Error", details = ex.Message });
            }
            finally
            {
                db.Close();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Employee employee)
        {
            var db = new CONNECTION();
            
            try
            {
                db.openConnection();
                string query = @"
                    UPDATE Employee 
                    SET FirstName = @FirstName, LastName = @LastName, EmailAddress = @Email, 
                        DateOfBirth = @DOB, Salary = @Salary, DepartmentId = @DeptId 
                    WHERE EmployeeId = @Id";

                using (var cmd = new MySqlCommand(query, db.GetCon()))
                {
                    cmd.Parameters.AddWithValue("@FirstName", employee.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", employee.LastName);
                    cmd.Parameters.AddWithValue("@Email", employee.EmailAddress);
                    cmd.Parameters.AddWithValue("@DOB", employee.DateOfBirth);
                    cmd.Parameters.AddWithValue("@Salary", employee.Salary);
                    cmd.Parameters.AddWithValue("@DeptId", employee.DepartmentId);
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Database Connection Error", details = ex.Message });
            }
            finally
            {
                db.Close();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var db = new CONNECTION();
            
            try
            {
                db.openConnection();
                using (var cmd = new MySqlCommand("DELETE FROM Employee WHERE EmployeeId = @Id", db.GetCon()))
                {
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Database Connection Error", details = ex.Message });
            }
            finally
            {
                db.Close();
            }
        }
    }
}
