namespace ZooApi.Dtos
{
    // DTO de saída (lista/detalhe de cuidados)
    public class CuidadoDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public string Frequencia { get; set; } = string.Empty; // diária, semanal, mensal...
        public int AnimalId { get; set; }                      // animal relacionado
    }
}
