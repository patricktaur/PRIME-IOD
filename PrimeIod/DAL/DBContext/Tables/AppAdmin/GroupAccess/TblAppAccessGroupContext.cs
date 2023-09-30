
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace DAL
{
    public partial class ApplicationDbContext
    {

        public virtual DbSet<TblAppAccessGroup> TblAppAccessGroup { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        protected void BuildModel_TblAppAccessGroupContext(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblAppAccessGroup>(entity =>
            {
                //CodeBlockStart
                entity.HasKey(e => e.RecId);

                entity.ToTable("tblAppAccessGroup");

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.DeletedById).HasColumnName("_DeletedById");

                entity.Property(e => e.DeletedOn)
                    .HasColumnName("_DeletedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsFixedLength();

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");
                //CodeBlockEnd

            });

           
        }

        
    }
}
