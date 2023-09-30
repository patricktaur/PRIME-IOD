using System;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using DAL;
namespace Shopify.Tests.Helpers  
{  
    public class SQLLiteDBContext : IDisposable  
    { 

        public ApplicationDbContext CreateContextForSQLLite(){
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();
            var option = new DbContextOptionsBuilder<ApplicationDbContext>().UseSqlite(connection).Options;
            var context = new ApplicationDbContext(option);
            if (context != null)
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
            }

            return context;

        }

        
   #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls
   protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
        }
        #endregion
   
   
    }

    
}