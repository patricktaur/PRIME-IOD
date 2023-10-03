
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace DAL
{
    public partial class ApplicationDbContext
    {

        public virtual DbSet<TblFteDemand> TblFteDemand { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        protected void BuildModel_TblFteDemandContext(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblFteDemand>(entity =>
            {
                entity.ToTable("tblFteDemand");

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.TotalActualFte).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TotalAssignedFte).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TotalDemandFte).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Study)
                    .WithMany(p => p.TblFteDemand)
                    .HasForeignKey(d => d.StudyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblFteDemand_tblStudy");
            });

            modelBuilder.Entity<TblFteDemandDetail>(entity =>
            {
                entity.ToTable("tblFteDemandDetail");

                entity.Property(e => e.ActualFte).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.AssignedFte).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.DemandFte).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.PeriodStarting).HasColumnType("date");

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.AssignedEmployee)
                    .WithMany(p => p.TblFteDemandDetail)
                    .HasForeignKey(d => d.AssignedEmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblFteDemandDetails_tblEmployee");

                entity.HasOne(d => d.FteDemand)
                    .WithMany(p => p.TblFteDemandDetail)
                    .HasForeignKey(d => d.FteDemandId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblFteDemandDetails_tblFteDemand");
            });

           
        }

        
    }
}
