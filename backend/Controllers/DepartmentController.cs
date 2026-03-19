using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PacificKode_Backend.Models;
using PacificKode_Backend.Repositories;

namespace PacificKode_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepository _repository;
        private readonly ILogger<DepartmentController> _logger;

        public DepartmentController(IDepartmentRepository repository, ILogger<DepartmentController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            _logger.LogInformation("Retrieving all departments");
            return Ok(_repository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var dept = _repository.GetById(id);
            if (dept == null) return NotFound();
            return Ok(dept);
        }

        [HttpPost]
        public IActionResult Create(Department department)
        {
            _logger.LogInformation("Creating new department: {Name}", department.DepartmentName);
            _repository.Add(department);
            return StatusCode(201);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Department department)
        {
            department.DepartmentId = id;
            _repository.Update(department);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogWarning("Deleting department ID: {Id}", id);
            _repository.Delete(id);
            return NoContent();
        }
    }
}
