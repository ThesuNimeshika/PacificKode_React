using Microsoft.AspNetCore.Mvc;
using PacificKode_Backend.Models;
using PacificKode_Backend.Repositories;

namespace PacificKode_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepository _repository;

        public DepartmentController(IDepartmentRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_repository.GetAll());

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
            _repository.Delete(id);
            return NoContent();
        }
    }
}
