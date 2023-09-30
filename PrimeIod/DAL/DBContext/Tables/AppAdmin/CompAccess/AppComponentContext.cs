
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace DAL
{
    public partial class ApplicationDbContext
    {

        public virtual DbSet<AppComponent> AppComponent { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        protected void BuildModel_AppComponentContext(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppComponent>(entity =>
            {
                //CodeBlockStart
                entity.HasKey(e => e.RecId)
                    .IsClustered(false);

                entity.HasIndex(e => e.CompCode)
                    .HasName("ClusteredIndex-20230227-164905")
                    .IsClustered();

                entity.Property(e => e.CompCode)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");
                //CodeBlockEnd

            });

           
        }

        
    }
}
