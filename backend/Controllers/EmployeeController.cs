using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PacificKode_Backend.Models;
using PacificKode_Backend.Repositories;

namespace PacificKode_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _repository;
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(IEmployeeRepository repository, ILogger<EmployeeController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            _logger.LogInformation("Retrieving all personnel records");
            return Ok(_repository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var emp = _repository.GetById(id);
            if (emp == null) return NotFound();
            return Ok(emp);
        }

        [HttpPost]
        public IActionResult Create(Employee employee)
        {
            _logger.LogInformation("Deploying new official: {FirstName} {LastName}", employee.FirstName, employee.LastName);
            _repository.Add(employee);
            return StatusCode(201);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Employee employee)
        {
            employee.EmployeeId = id;
            _repository.Update(employee);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogWarning("Aborting personnel record ID: {Id}", id);
            _repository.Delete(id);
            return NoContent();
        }
    }
}
