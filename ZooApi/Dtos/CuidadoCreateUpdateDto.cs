namespace ZooApi.Dtos
{
    // DTO de entrada (criar/atualizar cuidado)
    public class CuidadoCreateUpdateDto
    {
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public string Frequencia { get; set; } = string.Empty;
        public int AnimalId { get; set; }
    }
}
