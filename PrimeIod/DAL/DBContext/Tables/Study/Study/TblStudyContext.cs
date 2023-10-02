
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace DAL
{
    public partial class ApplicationDbContext
    {

        public virtual DbSet<TblStudy> TblStudy { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        protected void BuildModel_TblStudyContext(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblStudy>(entity =>
            {
                //CodeBlockStart
                entity.ToTable("tblStudy");

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.IconStudyNumber)
                    .IsRequired()
                    .HasColumnName("ICON_StudyNumber")
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");
                //CodeBlockEnd

            });

           modelBuilder.Entity<TblStudyDepartment>(entity =>
            {
                entity.HasKey(e => new { e.StudyId, e.DepartmentId });

                entity.ToTable("tblStudyDepartment");

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.TblStudyDepartment)
                    .HasForeignKey(d => d.DepartmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblStudyDepartment_tblDepartment");

                entity.HasOne(d => d.Study)
                    .WithMany(p => p.TblStudyDepartment)
                    .HasForeignKey(d => d.StudyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblStudyDepartment_tblStudyDepartment");
            });
        }

        
    }
}
