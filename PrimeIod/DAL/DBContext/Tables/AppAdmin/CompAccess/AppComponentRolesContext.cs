
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace DAL
{
    public partial class ApplicationDbContext
    {

    public virtual DbSet<AppComponentRoles> AppComponentRoles { get; set; }
        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        protected void BuildModel_AppComponentRolesContext(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppComponentRoles>(entity =>
            {
                entity.HasKey(e => e.RecId);

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.AppComponent)
                    .WithMany(p => p.AppComponentRoles)
                    .HasForeignKey(d => d.AppComponentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AppComponentRoles_AppComponent");
            });

           
        }

        
    }
}
