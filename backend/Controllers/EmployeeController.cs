using Microsoft.AspNetCore.Mvc;
using PacificKode_Backend.Models;
using PacificKode_Backend.Repositories;

namespace PacificKode_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _repository;

        public EmployeeController(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_repository.GetAll());

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
            _repository.Delete(id);
            return NoContent();
        }
    }
}
