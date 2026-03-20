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
    public class DepartmentController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var db = new CONNECTION();
            var departments = new List<Department>();

            try
            {
                db.openConnection();

                using (var cmd = new MySqlCommand("SELECT * FROM Department", db.GetCon()))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            departments.Add(new Department
                            {
                                DepartmentId = (int)reader["DepartmentId"],
                                DepartmentCode = reader["DepartmentCode"]?.ToString() ?? string.Empty,
                                DepartmentName = reader["DepartmentName"]?.ToString() ?? string.Empty
                            });
                        }
                    }
                }
                return Ok(departments);
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
                using (var cmd = new MySqlCommand("SELECT * FROM Department WHERE DepartmentId = @Id", db.GetCon()))
                {
                    cmd.Parameters.AddWithValue("@Id", id);
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            var dept = new Department
                            {
                                DepartmentId = (int)reader["DepartmentId"],
                                DepartmentCode = reader["DepartmentCode"]?.ToString() ?? string.Empty,
                                DepartmentName = reader["DepartmentName"]?.ToString() ?? string.Empty
                            };
                            return Ok(dept);
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
        public IActionResult Create(Department department)
        {
            var db = new CONNECTION();
            
            try
            {
                db.openConnection();
                using (var cmd = new MySqlCommand("INSERT INTO Department (DepartmentCode, DepartmentName) VALUES (@Code, @Name)", db.GetCon()))
                {
                    cmd.Parameters.AddWithValue("@Code", department.DepartmentCode);
                    cmd.Parameters.AddWithValue("@Name", department.DepartmentName);
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
        public IActionResult Update(int id, Department department)
        {
            var db = new CONNECTION();
            
            try
            {
                db.openConnection();
                using (var cmd = new MySqlCommand("UPDATE Department SET DepartmentCode = @Code, DepartmentName = @Name WHERE DepartmentId = @Id", db.GetCon()))
                {
                    cmd.Parameters.AddWithValue("@Code", department.DepartmentCode);
                    cmd.Parameters.AddWithValue("@Name", department.DepartmentName);
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
                using (var cmd = new MySqlCommand("DELETE FROM Department WHERE DepartmentId = @Id", db.GetCon()))
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
