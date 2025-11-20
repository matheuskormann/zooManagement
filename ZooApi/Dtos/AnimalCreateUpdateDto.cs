namespace ZooApi.Dtos
{
    // DTO de entrada (para criar/atualizar animal)
    public class AnimalCreateUpdateDto
    {
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public DateTime DataNascimento { get; set; }
        public string Especie { get; set; } = string.Empty;
        public string Habitat { get; set; } = string.Empty;
        public string PaisOrigem { get; set; } = string.Empty;
    }
}
