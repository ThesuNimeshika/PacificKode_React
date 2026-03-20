using System.Data;
using Microsoft.Extensions.Configuration;
using MySqlConnector;

namespace PacificKode_Backend.Repositories
{
    public class DatabaseConnection
    {
        private readonly string? _connectionString;

        public DatabaseConnection(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public IDbConnection CreateConnection()
        {
            return new MySqlConnection(_connectionString);
        }
    }
}
