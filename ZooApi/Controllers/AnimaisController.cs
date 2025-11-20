using Microsoft.AspNetCore.Mvc;
using ZooApi.Dtos;
using ZooApi.Services.Interfaces;

namespace ZooApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnimaisController : ControllerBase
    {
        private readonly IAnimalService _animalService;

        public AnimaisController(IAnimalService animalService)
        {
            _animalService = animalService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnimalDto>>> Get()
        {
            var animais = await _animalService.GetAllAsync();
            return Ok(animais);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AnimalDto>> GetById(int id)
        {
            var animal = await _animalService.GetByIdAsync(id);
            if (animal == null) return NotFound();
            return Ok(animal);
        }

        [HttpPost]
        public async Task<ActionResult<AnimalDto>> Post([FromBody] AnimalCreateUpdateDto dto)
        {
            var criado = await _animalService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = criado.Id }, criado);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] AnimalCreateUpdateDto dto)
        {
            var ok = await _animalService.UpdateAsync(id, dto);
            if (!ok) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _animalService.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
