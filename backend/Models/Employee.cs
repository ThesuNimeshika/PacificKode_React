using System;

namespace PacificKode_Backend.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string EmailAddress { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public int? Age { get; set; }
        public decimal Salary { get; set; }
        public int DepartmentId { get; set; }
        
        // Navigation-like property for UI
        public string DepartmentName { get; set; } = string.Empty;
    }
}
