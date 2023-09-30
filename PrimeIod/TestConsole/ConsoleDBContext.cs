using Microsoft.EntityFrameworkCore;
using DAL;
namespace  TestConsole
{
    public class ConsoleDBContext : ApplicationDbContext
    {
       public ConsoleDBContext(DbContextOptions options) : base(options)
       {}
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
            //optionsBuilder.UseNpgsql(@"Server=.\;Database=EFCoreDemo;Trusted_Connection=True;MultipleActiveResultSets=true");
            //optionsBuilder.UseNpgsql(@"Host=postgres_image;Port=5432;Username=postgres;Password=clarity2148;Database=Shopify;");
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=PRISM_Staging;Trusted_Connection=True;");
        
        }
    }
}