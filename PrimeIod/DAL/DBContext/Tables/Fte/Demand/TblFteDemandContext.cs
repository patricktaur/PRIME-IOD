
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
            modelBuilder.Entity<TblFteAssignment>(entity =>
            {
                entity.ToTable("tblFteAssignment");

                entity.Property(e => e.AssignedFte).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.TimeSheetFte).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Demand)
                    .WithMany(p => p.InverseDemand)
                    .HasForeignKey(d => d.DemandId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblFteAssignment_tblFteAssignment");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.TblFteAssignment)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblFteAssignment_tblEmployee");
            });

            modelBuilder.Entity<TblFteDemand>(entity =>
            {
                entity.ToTable("tblFteDemand");

                entity.Property(e => e.ActualFte).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.AssignedFte).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.DemandFte).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<TblFteTimeSheet>(entity =>
            {
                entity.ToTable("tblFteTimeSheet");

                entity.Property(e => e.ActualFte).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.FteAssignment)
                    .WithMany(p => p.TblFteTimeSheet)
                    .HasForeignKey(d => d.FteAssignmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblFteTimeSheet_tblFteAssignment");
            });

           
        }

        
    }
}
