
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace DAL
{
    public partial class ApplicationDbContext
    {

        public virtual DbSet<TblUser> TblUser { get; set; }
        public virtual DbSet<TblRole> TblRole { get; set; }
        public virtual DbSet<TblUserRole> TblUserRole { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        protected void BuildModel_TblUserContext(ModelBuilder modelBuilder)
        {
           modelBuilder.Entity<TblRole>(entity =>
            {
                entity.ToTable("tblRole");

                entity.HasIndex(e => e.RoleName)
                    .HasName("UQ_tblRole_RoleName")
                    .IsUnique();

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.RoleName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");
            }); 
           
           modelBuilder.Entity<TblUser>(entity =>
            {
                entity.ToTable("tblUser");

                entity.HasIndex(e => e.EnterpriseId)
                    .HasName("UQ_tblUser_EnterpriseId")
                    .IsUnique();

                entity.HasIndex(e => e.Name)
                    .HasName("UQ_tblUser_Name")
                    .IsUnique();

                entity.Property(e => e.CanLogin).HasColumnName("Can_Login");

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.EmailId).HasMaxLength(320);

                entity.Property(e => e.EmployeeId).HasMaxLength(100);

                entity.Property(e => e.Enddate).HasColumnType("smalldatetime");

                entity.Property(e => e.EnterpriseId)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.HireDate).HasColumnType("smalldatetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");
            });



            modelBuilder.Entity<TblUserRole>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId })
                    .HasName("PK_tblUserRole_1");

                entity.ToTable("tblUserRole");

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.TblUserRole)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblUserRole_tblRole");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TblUserRole)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblUserRole_tblUser");
            });
        }

        
    }
}
