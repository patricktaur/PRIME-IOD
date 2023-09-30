// =============================
// claritytechnologies
// Tallify
// =============================

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using DAL;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WebApi.Helpers;
using Serilog;

namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();


            //Seed database
            // using (var scope = host.Services.CreateScope())
            // {
            //     var services = scope.ServiceProvider;

            //     try
            //     {
            //         var databaseInitializer = services.GetRequiredService<IDatabaseInitializer>();
            //         databaseInitializer.SeedAsync().Wait();
            //     }
            //     catch (Exception ex)
            //     {
            //         var logger = services.GetRequiredService<ILogger<Program>>();
            //         logger.LogCritical(LoggingEvents.INIT_DATABASE, ex, LoggingEvents.INIT_DATABASE.Name);

            //         throw new Exception(LoggingEvents.INIT_DATABASE.Name, ex);
            //     }
            // }

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) {

            // string port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
            // string url = String.Concat("http://0.0.0.0:", port);

            var port = Environment.GetEnvironmentVariable("PORT") ?? "8090";
            // debugging statement in case the port didn't get passed correctly
            Console.WriteLine($"env PORT is {port ?? ("not found")}");

            return WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseKestrel()
                .ConfigureKestrel((context, options) =>
                {
                    options.Listen(IPAddress.IPv6Any, Convert.ToInt32(port));
                })
                // .ConfigureLogging((hostingContext, logging) =>
                // {
                //     logging.ClearProviders();
                //     logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                //     logging.AddConsole();
                //     logging.AddDebug();
                //     logging.AddEventSourceLogger();
                //     logging.AddFile(hostingContext.Configuration.GetSection("Logging"));
                // })
                .UseSerilog((hostingContext, loggerConfig) =>
                loggerConfig.ReadFrom.Configuration(hostingContext.Configuration)
            );
        }
    }
}
