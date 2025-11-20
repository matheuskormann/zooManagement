namespace ZooApi.Dtos
{
    // DTO de saída (o que a API devolve para o frontend)
    public class AnimalDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public DateTime DataNascimento { get; set; }
        public string Especie { get; set; } = string.Empty;
        public string Habitat { get; set; } = string.Empty;
        public string PaisOrigem { get; set; } = string.Empty;
    }
}
