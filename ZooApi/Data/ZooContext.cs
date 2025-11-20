using Microsoft.EntityFrameworkCore;
using ZooApi.Entities;

namespace ZooApi.Data
{
    public class ZooContext : DbContext
    {
        public ZooContext(DbContextOptions<ZooContext> options)
            : base(options)
        {
        }

        public DbSet<Animal> Animais { get; set; } = null!;
        public DbSet<Cuidado> Cuidados { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Tabela Animais
            modelBuilder.Entity<Animal>(entity =>
            {
                entity.ToTable("Animais");
                entity.HasKey(a => a.Id);

                entity.Property(a => a.Nome)
                      .HasMaxLength(100)
                      .IsRequired();

                entity.Property(a => a.Descricao)
                      .HasMaxLength(250);

                entity.Property(a => a.Especie)
                      .HasMaxLength(100);

                entity.Property(a => a.Habitat)
                      .HasMaxLength(100);

                entity.Property(a => a.PaisOrigem)
                      .HasMaxLength(100);
            });

            // Tabela Cuidados
            modelBuilder.Entity<Cuidado>(entity =>
            {
                entity.ToTable("Cuidados");
                entity.HasKey(c => c.Id);

                entity.Property(c => c.Nome)
                      .HasMaxLength(100)
                      .IsRequired();

                entity.Property(c => c.Descricao)
                      .HasMaxLength(200);

                entity.Property(c => c.Frequencia)
                      .HasMaxLength(50);

                entity.HasOne(c => c.Animal)
                      .WithMany(a => a.Cuidados)
                      .HasForeignKey(c => c.AnimalId);
            });
        }
    }
}
