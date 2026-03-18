using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
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

        public DepartmentRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public IEnumerable<Department> GetAll()
        {
            var departments = new List<Department>();
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand("SELECT * FROM Department", conn);
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
            return departments;
        }

        public Department GetById(int id)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand("SELECT * FROM Department WHERE DepartmentId = @Id", conn);
                cmd.Parameters.AddWithValue("@Id", id);
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
            return null;
        }

        public void Add(Department department)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand("INSERT INTO Department (DepartmentCode, DepartmentName) VALUES (@Code, @Name)", conn);
                cmd.Parameters.AddWithValue("@Code", department.DepartmentCode);
                cmd.Parameters.AddWithValue("@Name", department.DepartmentName);
                conn.Open();
                cmd.ExecuteNonQuery();
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
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void Delete(int id)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var cmd = new SqlCommand("DELETE FROM Department WHERE DepartmentId = @Id", conn);
                cmd.Parameters.AddWithValue("@Id", id);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}
