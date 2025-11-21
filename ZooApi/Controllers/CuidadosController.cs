using Microsoft.AspNetCore.Mvc;
using ZooApi.Dtos;
using ZooApi.Services.Interfaces;

namespace ZooApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CuidadosController : ControllerBase
    {
        private readonly ICuidadoService _cuidadoService;

        public CuidadosController(ICuidadoService cuidadoService)
        {
            _cuidadoService = cuidadoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CuidadoDto>>> Get()
        {
            var cuidados = await _cuidadoService.GetAllAsync();
            return Ok(cuidados);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CuidadoDto>> GetById(int id)
        {
            var cuidado = await _cuidadoService.GetByIdAsync(id);
            if (cuidado == null) return NotFound();
            return Ok(cuidado);
        }

        [HttpPost]
        public async Task<ActionResult<CuidadoDto>> Post([FromBody] CuidadoCreateUpdateDto dto)
        {
            var criado = await _cuidadoService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = criado.Id }, criado);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CuidadoCreateUpdateDto dto)
        {
            var ok = await _cuidadoService.UpdateAsync(id, dto);
            if (!ok) return NotFound("Cuidado not found");
            return Ok("Cuidado updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _cuidadoService.DeleteAsync(id);
            if (!ok) return NotFound("Cuidado not found");
            return Ok("Cuidado deleted successfully");
        }
    }
}
