using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PacificKode_Backend.Models;
using System;
using System.Collections.Generic;
using System.Data;

namespace PacificKode_Backend.Repositories
{
    public interface IDepartmentRepository
    {
        IEnumerable<Department> GetAll();
        Department GetById(int id);
        void Add(Department department);
        void Update(Department department);
        void Delete(int id);
    }

    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly string _connectionString;
        private readonly ILogger<DepartmentRepository> _logger;

        public DepartmentRepository(IConfiguration configuration, ILogger<DepartmentRepository> logger)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            _logger = logger;
        }

        public IEnumerable<Department> GetAll()
        {
            var departments = new List<Department>();
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand("SELECT * FROM Department", conn);
                _logger.LogInformation("Fetching all departments from database");
                try
                {
                    conn.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            departments.Add(new Department
                            {
                                DepartmentId = (int)reader["DepartmentId"],
                                DepartmentCode = reader["DepartmentCode"].ToString(),
                                DepartmentName = reader["DepartmentName"].ToString()
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to fetch departments. Ensure database 'PacificKode_DB' exists.");
                    throw;
                }
            }
            return departments;
        }

        public Department GetById(int id)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand("SELECT * FROM Department WHERE DepartmentId = @Id", conn);
                cmd.Parameters.AddWithValue("@Id", id);
                try
                {
                    conn.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Department
                            {
                                DepartmentId = (int)reader["DepartmentId"],
                                DepartmentCode = reader["DepartmentCode"].ToString(),
                                DepartmentName = reader["DepartmentName"].ToString()
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to get department ID: {Id}", id);
                    throw;
                }
            }
            return null;
        }

        public void Add(Department department)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand("INSERT INTO Department (DepartmentCode, DepartmentName) VALUES (@Code, @Name)", conn);
                cmd.Parameters.AddWithValue("@Code", department.DepartmentCode);
                cmd.Parameters.AddWithValue("@Name", department.DepartmentName);
                _logger.LogInformation("Creating department: {Name} ({Code})", department.DepartmentName, department.DepartmentCode);
                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "FAILED TO INITIALIZE COMPONENT SEQUENCE.");
                    throw;
                }
            }
        }

        public void Update(Department department)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand("UPDATE Department SET DepartmentCode = @Code, DepartmentName = @Name WHERE DepartmentId = @Id", conn);
                cmd.Parameters.AddWithValue("@Code", department.DepartmentCode);
                cmd.Parameters.AddWithValue("@Name", department.DepartmentName);
                cmd.Parameters.AddWithValue("@Id", department.DepartmentId);
                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "FAILED TO UPDATE COMPONENT SEQUENCE ID: {Id}", department.DepartmentId);
                    throw;
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand("DELETE FROM Department WHERE DepartmentId = @Id", conn);
                cmd.Parameters.AddWithValue("@Id", id);
                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "FAILED TO TERMINATE COMPONENT SEQUENCE ID: {Id}", id);
                    throw;
                }
            }
        }
    }
}
