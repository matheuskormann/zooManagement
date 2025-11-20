using Microsoft.EntityFrameworkCore;
using ZooApi.Data;
using ZooApi.Dtos;
using ZooApi.Entities;
using ZooApi.Services.Interfaces;

namespace ZooApi.Services.Implementations
{
    public class AnimalService : IAnimalService
    {
        private readonly ZooContext _context;

        public AnimalService(ZooContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AnimalDto>> GetAllAsync()
        {
            return await _context.Animais
                .Select(a => new AnimalDto
                {
                    Id = a.Id,
                    Nome = a.Nome,
                    Descricao = a.Descricao,
                    DataNascimento = a.DataNascimento,
                    Especie = a.Especie,
                    Habitat = a.Habitat,
                    PaisOrigem = a.PaisOrigem
                })
                .ToListAsync();
        }

        public async Task<AnimalDto?> GetByIdAsync(int id)
        {
            var a = await _context.Animais.FindAsync(id);
            if (a == null) return null;

            return new AnimalDto
            {
                Id = a.Id,
                Nome = a.Nome,
                Descricao = a.Descricao,
                DataNascimento = a.DataNascimento,
                Especie = a.Especie,
                Habitat = a.Habitat,
                PaisOrigem = a.PaisOrigem
            };
        }

        public async Task<AnimalDto> CreateAsync(AnimalCreateUpdateDto dto)
        {
            var entity = new Animal
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                DataNascimento = dto.DataNascimento,
                Especie = dto.Especie,
                Habitat = dto.Habitat,
                PaisOrigem = dto.PaisOrigem
            };

            _context.Animais.Add(entity);
            await _context.SaveChangesAsync();

            return new AnimalDto
            {
                Id = entity.Id,
                Nome = entity.Nome,
                Descricao = entity.Descricao,
                DataNascimento = entity.DataNascimento,
                Especie = entity.Especie,
                Habitat = entity.Habitat,
                PaisOrigem = entity.PaisOrigem
            };
        }

        public async Task<bool> UpdateAsync(int id, AnimalCreateUpdateDto dto)
        {
            var entity = await _context.Animais.FindAsync(id);
            if (entity == null) return false;

            entity.Nome = dto.Nome;
            entity.Descricao = dto.Descricao;
            entity.DataNascimento = dto.DataNascimento;
            entity.Especie = dto.Especie;
            entity.Habitat = dto.Habitat;
            entity.PaisOrigem = dto.PaisOrigem;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Animais.FindAsync(id);
            if (entity == null) return false;

            _context.Animais.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
