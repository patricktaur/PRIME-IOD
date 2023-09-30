
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace DAL
{
    public partial class ApplicationDbContext
    {

        public virtual DbSet<tblLoginDetailsV2> tblLoginDetailsV2 { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        protected void BuildModel_tblLoginDetailsV2Context(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tblLoginDetailsV2>(entity =>
            {
                //CodeBlockStart
                
                entity.HasKey(e => e.RecId);

                entity.ToTable("tblLoginDetailsV2");

                entity.Property(e => e.BlnSuccessfull).HasColumnName("blnSuccessfull");

                entity.Property(e => e.CreatedOn)
                    .HasColumnName("_CreatedOn")
                    .HasColumnType("datetime");

                entity.Property(e => e.EnterpriseId).HasMaxLength(100);

                entity.Property(e => e.HostAddress).HasMaxLength(15);

                entity.Property(e => e.Https)
                    .HasColumnName("HTTPS")
                    .HasMaxLength(3);

                entity.Property(e => e.LocalAddr).HasMaxLength(15);

                entity.Property(e => e.RequestMethod)
                    .HasColumnName("Request_Method")
                    .HasMaxLength(5);

                entity.Property(e => e.RoleId).HasColumnName("_RoleId");

                entity.Property(e => e.Url)
                    .HasColumnName("URL")
                    .HasMaxLength(400);

                entity.Property(e => e.UserAgent).HasMaxLength(255);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(100);
                //CodeBlockEnd

            });

           
        }

        
    }
}
