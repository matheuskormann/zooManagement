namespace ZooApi.Entities
{
    public class Cuidado
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;      // Alimentação, Vacinação, etc.
        public string Descricao { get; set; } = string.Empty;
        public string Frequencia { get; set; } = string.Empty; // diária, semanal, mensal...

        public int AnimalId { get; set; }
        public Animal? Animal { get; set; }
    }
}
