using ZooApi.Dtos;

namespace ZooApi.Services.Interfaces
{
    public interface ICuidadoService
    {
        Task<IEnumerable<CuidadoDto>> GetAllAsync();
        Task<CuidadoDto?> GetByIdAsync(int id);
        Task<CuidadoDto> CreateAsync(CuidadoCreateUpdateDto dto);
        Task<bool> UpdateAsync(int id, CuidadoCreateUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
