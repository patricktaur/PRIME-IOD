using System.Collections.Immutable;
// =============================
// claritytechnologies
// Tallify
// =============================


using Microsoft.EntityFrameworkCore;


namespace DAL
{
    public partial class ApplicationViewContext :DbContext
    {
        // public string CurrentUserId { get; set; }
        public string CurrentUserId { get; set; }

        public ApplicationViewContext(DbContextOptions options) : base(options)
        { 
            
        }

        protected override  void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // BuildModel_Prism_View(builder);
             

        }
    }
}
