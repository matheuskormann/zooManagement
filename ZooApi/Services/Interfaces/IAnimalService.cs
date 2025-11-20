using ZooApi.Dtos;

namespace ZooApi.Services.Interfaces
{
    public interface IAnimalService
    {
        Task<IEnumerable<AnimalDto>> GetAllAsync();
        Task<AnimalDto?> GetByIdAsync(int id);
        Task<AnimalDto> CreateAsync(AnimalCreateUpdateDto dto);
        Task<bool> UpdateAsync(int id, AnimalCreateUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
