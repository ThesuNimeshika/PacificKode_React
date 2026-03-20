using System;
using System.Data;
using MySqlConnector;

namespace PacificKode_Backend.Data
{
    public class CONNECTION
    {
        public CONNECTION()
        {
        }

        public MySqlConnection Conn;

        /// <summary>
        /// Opens a MySql connection using hardcoded credentials.
        /// </summary>
        public void openConnection()
        {
            // Hardcoded connection credentials for MariaDB
            string dbServer = "127.0.0.1";
            string dbPort = "3306";
            string dbDatabase = "PacificKode_DB";
            string dbUser = "root";
            string dbPwd = "";

            try
            {
                string connectionString = $"Server={dbServer};Port={dbPort};Database={dbDatabase};Uid={dbUser};Pwd={dbPwd};SslMode=none;";
                Conn = new MySqlConnection(connectionString);
                Conn.Open();
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to open connection: {ex.Message}", ex);
            }
        }

        public MySqlConnection GetCon()
        {
            return Conn;
        }

        public void Close()
        {
            try
            {
                if (Conn != null && Conn.State == ConnectionState.Open)
                {
                    Conn.Close();
                    Conn.Dispose();
                }
            }
            catch (Exception)
            {
                // Ignore errors on close
            }
        }
    }
}
