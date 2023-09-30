
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace DAL
{
    public partial class ApplicationDbContext
    {

        public virtual DbSet<TblAppAccessGroupMembers> tblAppAccessGroupMembers { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        protected void BuildModel_tblAppAccessGroupMembersContext(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblAppAccessGroupMembers>(entity =>
            {
                //CodeBlockStart
                entity.HasKey(e => e.RecId);

                entity.ToTable("tblAppAccessGroupMembers");

                entity.Property(e => e.CreatedById).HasColumnName("_CreatedById");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.DeletedById).HasColumnName("_DeletedById");

                entity.Property(e => e.DeletedOn)
                    .HasColumnName("_DeletedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.UpdatedById).HasColumnName("_UpdatedById");

                entity.Property(e => e.UpdatedOn)
                    .HasColumnName("_UpdatedOn")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.TblAppAccessGroupMembers)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblAppAccessGroupMembers_tblAppAccessGroup");
                
                // entity.HasOne(d => d.User)
                //     .WithMany(p => p.TblAppAccessGroupMembers)
                //     .HasForeignKey(d => d.UserId)
                //     .OnDelete(DeleteBehavior.ClientSetNull)
                //     .HasConstraintName("FK_tblAppAccessGroupMembers_tblUser");
                
                //CodeBlockEnd

            });

           
        }

        
    }
}
