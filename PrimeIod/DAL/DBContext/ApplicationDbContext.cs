using System.Collections.Immutable;
// =============================
// claritytechnologies
// Tallify
// =============================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DAL.Models;
using DAL.Models.Interfaces;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL {
    public partial class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string> {
        // public string CurrentUserId { get; set; }
        public string CurrentUserId { get; set; }

        public ApplicationDbContext (DbContextOptions options) : base (options) {

        }

        public ApplicationDbContext()
        {
        }

        protected override void OnModelCreating (ModelBuilder builder) {

            base.OnModelCreating (builder);
  
            // BuildModel_PrismDBContext (builder);
            
            
            BuildModel_TblAppAccessGroupContext(builder);
            BuildModel_tblAppAccessGroupMembersContext(builder);
            
            BuildModel_AppComponentContext(builder);
            BuildModel_AppComponentRolesContext(builder);

            BuildModel_tblLoginDetailsV2Context(builder);

            BuildModel_TblUserContext(builder);
            BuildModel_TblFteDemandContext(builder);

            
            
           
//--BuildModel_ insert above this line
            builder.Entity<ApplicationUser> ().HasMany (u => u.Claims).WithOne ().HasForeignKey (c => c.UserId).IsRequired ().OnDelete (DeleteBehavior.Cascade);
            builder.Entity<ApplicationUser> ().HasMany (u => u.Roles).WithOne ().HasForeignKey (r => r.UserId).IsRequired ().OnDelete (DeleteBehavior.Cascade);

            builder.Entity<ApplicationRole> ().HasMany (r => r.Claims).WithOne ().HasForeignKey (c => c.RoleId).IsRequired ().OnDelete (DeleteBehavior.Cascade);
            builder.Entity<ApplicationRole> ().HasMany (r => r.Users).WithOne ().HasForeignKey (r => r.RoleId).IsRequired ().OnDelete (DeleteBehavior.Cascade);
        }

        // partial void BuildModel(ModelBuilder builder);

        public override int SaveChanges () {
            UpdateAuditEntities ();
            return base.SaveChanges ();
        }

        public override int SaveChanges (bool acceptAllChangesOnSuccess) {
            UpdateAuditEntities ();
            return base.SaveChanges (acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync (CancellationToken cancellationToken = default (CancellationToken)) {
            UpdateAuditEntities ();
            return base.SaveChangesAsync (cancellationToken);
        }

        public override Task<int> SaveChangesAsync (bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default (CancellationToken)) {
            UpdateAuditEntities ();
            return base.SaveChangesAsync (acceptAllChangesOnSuccess, cancellationToken);
        }

        private void UpdateAuditEntities () {
            var modifiedEntries = ChangeTracker.Entries ()
                .Where (x => x.Entity is IAuditableEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));
            int intTempCurrentUserId = 0;
            int intCurrentUserId = 0;
            bool isInt = Int32.TryParse (CurrentUserId, out intTempCurrentUserId);
            if (isInt) {
                intCurrentUserId = intTempCurrentUserId;
            }

            foreach (var entry in modifiedEntries) {
                var entity = (IAuditableEntity) entry.Entity;
                DateTime now = DateTime.Now;

                if (entry.State == EntityState.Added) {
                    entity.CreatedOn = now;
                    entity.CreatedById = intCurrentUserId;

                } else {
                    base.Entry (entity).Property (x => x.CreatedById).IsModified = false;
                    base.Entry (entity).Property (x => x.CreatedOn).IsModified = false;
                }

                entity.UpdatedOn = now;

                entity.UpdatedById = intCurrentUserId; //CurrentUserId;
            }
        }
    }
}



























































































