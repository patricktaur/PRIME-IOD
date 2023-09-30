// =============================
// claritytechnologies
// WebApi
// =============================

using AutoMapper;
using DAL;
using DAL.Core;
using DAL.Core.Interfaces;
using DAL.Models;

using BLL;
using Services;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using WebApi.Authorization;
using WebApi.ViewModels;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Collections.Generic;
using System.Collections;

using DAL.Repositories.Interfaces;
using AspNet.Security.OpenIdConnect.Primitives;
using OpenIddict.Abstractions;
using Microsoft.OpenApi.Models;
using DAL.Repositories;
using BLL.CachedData;
using Microsoft.AspNetCore.Server.IISIntegration;

 using WebApi.Helpers;
using CsvHelper;
using CsvHelper.TypeConversion;
using System.IO;
using Services.EMail;
using BLL.MenuAccess;

namespace WebApi
{
    public class Startup
    {
        private IWebHostEnvironment _env { get; }
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            _env = env;
            Configuration = configuration;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            GeneralConfiguration(services);
            ConfigureDatabase(services);
            // add identity
            services.AddSwagger();

            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Configure Identity options and password complexity here
            services.Configure<IdentityOptions>(options =>
            {
                // User settings
                options.User.RequireUniqueEmail = true;

                //    //// Password settings
                //    //options.Password.RequireDigit = true;
                //    //options.Password.RequiredLength = 8;
                //    //options.Password.RequireNonAlphanumeric = false;
                //    //options.Password.RequireUppercase = true;
                //    //options.Password.RequireLowercase = false;

                //    //// Lockout settings
                //    //options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                //    //options.Lockout.MaxFailedAccessAttempts = 10;

                options.ClaimsIdentity.UserNameClaimType = OpenIdConnectConstants.Claims.Name;
                options.ClaimsIdentity.UserIdClaimType = OpenIdConnectConstants.Claims.Subject;
                options.ClaimsIdentity.RoleClaimType = OpenIdConnectConstants.Claims.Role;

            });

            // Register the OpenIddict services.
            services.AddOpenIddict()
                .AddCore(options =>
                {
                    options.UseEntityFrameworkCore().UseDbContext<ApplicationDbContext>();
                })
                .AddServer(options =>
                {
                    options.UseMvc();
                    // options.EnableEndpointRouting = false;
                    options.EnableTokenEndpoint("/connect/token-combo");
                    // options.EnableAuthorizationEndpoint("/connect/win-auth");
                    // options.EnableTokenEndpoint("/connect/win-auth");
                    
                    options.AllowPasswordFlow();
                    options.AllowRefreshTokenFlow();
                    options.AcceptAnonymousClients();
                    options.DisableHttpsRequirement(); // Note: Comment this out in production
                    options.RegisterScopes(
                        OpenIdConnectConstants.Scopes.OpenId,
                        OpenIdConnectConstants.Scopes.Email,
                        OpenIdConnectConstants.Scopes.Phone,
                        OpenIdConnectConstants.Scopes.Profile,
                        OpenIdConnectConstants.Scopes.OfflineAccess,
                        OpenIddictConstants.Scopes.Roles);

                    // options.UseRollingTokens(); //Uncomment to renew refresh tokens on every refreshToken request
                    // Note: to use JWT access tokens instead of the default encrypted format, the following lines are required:
                    // options.UseJsonWebTokens();
                })
                .AddValidation(); //Only compatible with the default token format. For JWT tokens, use the Microsoft JWT bearer handler.

            // services.AddPolicies();
            
            //Injectable IMapper Configuration
            //21Feb2020 - Patrick
            //Use IMapper Configuration for all newer mappings
            var mapperConfiguration = new MapperConfiguration(cfg =>
            {
                // cfg.AddProfiles(typeof(Startup).Assembly);
                cfg.AddMaps(typeof(Startup).Assembly);
                cfg.AddMaps(typeof(DAL.UnitOfWork).Assembly);
            });
            var mapper = mapperConfiguration.CreateMapper();
            services.AddSingleton<IMapper>(sp => mapperConfiguration.CreateMapper());            

            // Add cors
            // services.AddCors();
            // services.AddCors(c =>
            // {
            //     c.AddPolicy("CorsPolicy", 
            //     options => 
            //         options.AllowAnyOrigin()
            //         .AllowAnyMethod()
            //         .AllowAnyHeader()
            //         .AllowCredentials()
            //     );
            // });
            
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder => 
                     builder
                     .SetIsOriginAllowed(_ => true)
                    
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());

                 


            });
            
            services.AddRazorPages();

            //WinAuth: 
            services.AddAuthentication(IISDefaults.AuthenticationScheme);
            services.AddMvcCore()
            .AddApiExplorer().AddNewtonsoftJson();

            services.AddControllers(config => 
            {//
                     config.Filters.Add<WindowsAuthActionFilter>();
            });



            services.AddMemoryCache();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "../ClientApp/dist";
            });


            // The port to use for https redirection in production
            if (!_env.IsDevelopment() && !string.IsNullOrWhiteSpace(Configuration["HttpsRedirectionPort"]))
            {
                services.AddHttpsRedirection(options =>
                {
                    options.HttpsPort = int.Parse(Configuration["HttpsRedirectionPort"]);
                });
            }

            // services.AddSwaggerGen(c =>
            // {
            //     c.SwaggerDoc("v1", new OpenApiInfo { Title = "Shopify Api", Version = "v1" });
            // });

            // Configurations
            services.Configure<AppSettings>(Configuration);

            services.Configure<Services.AppSettings>(Configuration);
            // Business Services
            services.AddScoped<Services.EMail.IEmailSender, Services.EMail.EmailSender>();
            // services.AddScoped<Emailer>();
            services.AddScoped<Services.EMail.EmailTemplates>(
                _ =>{
              var folderPath = Configuration.GetSection("EMailConfig").GetSection("TemplateFolder").Value;
              var templateFoldere = String.Format(@"{0}\{1}", _env.ContentRootPath, folderPath);  
              return new Services.EMail.EmailTemplates(templateFoldere );
            ;
            });

            // Repositories
            services.AddScoped<IUnitOfWork, HttpUnitOfWork>();
            //services.AddScoped<IBizLogic, BizLogic>();
            services.AddScoped<BizLogic>();
            services.AddScoped<FiltersCache>();
            // services.AddScoped<StudyListCache>();
            
            
            services.AddScoped<AppComponentCache>();
            services.AddScoped<AppComponentCsvData>(provider =>
                new AppComponentCsvData("AppSettings/RoleMatrix.csv")
            );

            services.AddScoped<ApplicationMenuCache>();
            services.AddScoped<MenuAccessGenerator>();
            services.AddScoped<MenuItemCsvData>(provider =>
                new MenuItemCsvData("AppSettings/MenuConfig.csv")
            );

            services.AddScoped<AppComponentMenuPermissions>();


            services.AddScoped<ApplicationMenuCache>();
            services.AddScoped<ControllerPermissions>();
            services.AddScoped<ControllerActionPermissionsCache>();
            services.AddScoped<UserRolesPermissionsCache>();
            services.AddScoped<LoggedInUser>();

            

            services.AddScoped<IServices, Services.Services>();

    
            // Auth Handlers
            




            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IWebHostEnvironment>(_env);


        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            Utilities.ConfigureLogger(loggerFactory);
            // EmailTemplates.Initialize(env);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }


            //Configure Cors
            // app.UseCors(builder => builder
            //     // .WithOrigins("http://localhost:4200")
            //     .AllowAnyOrigin()
            //     .AllowAnyHeader()
            //     .AllowAnyMethod()
            //     .AllowCredentials()
            //     )
            
            //     ;
            app.UseCors();
            
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            //app.UseIdentityServer();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCustomSwagger();
            // app.UseSwagger();
            // app.UseSwaggerUI(c =>
            // {
            //     c.SwaggerEndpoint("/swagger/v1/swagger.json", $"{IdentityServerConfig.ApiFriendlyName} Version: V1");
            //     c.RoutePrefix = string.Empty;
            // });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            
            app.UseSpa(spa =>
            {
            // To learn more about options for serving an Angular SPA from ASP.NET Core,
            // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "../ClientApp";

                // if (env.IsDevelopment())
                // {
                //     spa.UseAngularCliServer(npmScript: "start");
                //     spa.Options.StartupTimeout = TimeSpan.FromSeconds(120); // Increase the timeout if angular app is taking longer to startup
                //                                                             //spa.UseProxyToSpaDevelopmentServer("http://localhost:4200"); // Use this instead to use the angular cli server
                // }
             });

           

            }
        public virtual void GeneralConfiguration(IServiceCollection services)
        {
            //For use with TestStartUp
        }
        public virtual void ConfigureDatabase(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Configuration["ConnectionStrings:DefaultConnection"], b => b.MigrationsAssembly("WebApi"));
                options.UseOpenIddict();
            });
            // services.AddDbContext<ApplicationViewContext>(options =>
            // {
            //     options.UseSqlServer(Configuration["ConnectionStrings:DefaultConnection"], b => b.MigrationsAssembly("WebApi"));
            // });


        }
    }
    public static class SwaggerExtension
    {
        public static void AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "My API",
                    Description = "My First ASP.NET Core Web API",
                    TermsOfService = new System.Uri("https://www.talkingdotnet.com"),
                    Contact = new OpenApiContact() { Name = "Talking Dotnet", Email = "contact@talkingdotnet.com" }
                });

                c.SwaggerDoc("v2", new OpenApiInfo
                {
                    Version = "v2",
                    Title = "New API V2",
                    Description = "Sample Web API",
                    TermsOfService = new System.Uri("https://www.talkingdotnet.com"),
                    Contact = new OpenApiContact() { Name = "Talking Dotnet", Email = "contact@talkingdotnet.com" }
                });

                // c.DescribeAllEnumsAsStrings();
                // c.DescribeStringEnumsInCamelCase();
            });
        }
        public static void UseCustomSwagger(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.SwaggerEndpoint("/swagger/v2/swagger.json", "My API V2");
            });
        }
    }
}
