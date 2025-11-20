using Microsoft.EntityFrameworkCore;
using ZooApi.Data;
using ZooApi.Dtos;
using ZooApi.Entities;
using ZooApi.Services.Interfaces;

namespace ZooApi.Services.Implementations
{
    public class CuidadoService : ICuidadoService
    {
        private readonly ZooContext _context;

        public CuidadoService(ZooContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CuidadoDto>> GetAllAsync()
        {
            return await _context.Cuidados
                .Select(c => new CuidadoDto
                {
                    Id = c.Id,
                    Nome = c.Nome,
                    Descricao = c.Descricao,
                    Frequencia = c.Frequencia,
                    AnimalId = c.AnimalId
                })
                .ToListAsync();
        }

        public async Task<CuidadoDto?> GetByIdAsync(int id)
        {
            var c = await _context.Cuidados.FindAsync(id);
            if (c == null) return null;

            return new CuidadoDto
            {
                Id = c.Id,
                Nome = c.Nome,
                Descricao = c.Descricao,
                Frequencia = c.Frequencia,
                AnimalId = c.AnimalId
            };
        }

        public async Task<CuidadoDto> CreateAsync(CuidadoCreateUpdateDto dto)
        {
            var entity = new Cuidado
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                Frequencia = dto.Frequencia,
                AnimalId = dto.AnimalId
            };

            _context.Cuidados.Add(entity);
            await _context.SaveChangesAsync();

            return new CuidadoDto
            {
                Id = entity.Id,
                Nome = entity.Nome,
                Descricao = entity.Descricao,
                Frequencia = entity.Frequencia,
                AnimalId = entity.AnimalId
            };
        }

        public async Task<bool> UpdateAsync(int id, CuidadoCreateUpdateDto dto)
        {
            var entity = await _context.Cuidados.FindAsync(id);
            if (entity == null) return false;

            entity.Nome = dto.Nome;
            entity.Descricao = dto.Descricao;
            entity.Frequencia = dto.Frequencia;
            entity.AnimalId = dto.AnimalId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Cuidados.FindAsync(id);
            if (entity == null) return false;

            _context.Cuidados.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
