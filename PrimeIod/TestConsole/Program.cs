using System;
using System.Linq;
using System.IO;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Caching.Memory;
using DAL;

using BLL;
using BLL.CachedData;
using BLL.CachedData;

using System.Collections.Generic;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using DAL.Models;
using BLL.Query;
using DAL.View;
using DAL.DTOs;
using AutoMapper;
using System.Diagnostics;

using BLL.MenuAccess;
using WebApi.Authorization;

namespace TestConsole
{
    class Program
    {
        //private readonly ApplicationDbContext _context;
        static void Main(string[] args)
        {

            //     IConfiguration config = new ConfigurationBuilder()
            //   .AddJsonFile("appsettings.json", true, true)
            //   .Build();

            var builder = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json");

            IConfiguration config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, true)
                .Build();


            var conn = config["ConnectionStrings:DefaultConnection"];

           var mapperConfiguration = new MapperConfiguration(cfg =>
            {
                // cfg.AddProfiles(typeof(Startup).Assembly);
                // cfg.AddMaps(typeof(Startup).Assembly);
                cfg.AddMaps(typeof(DAL.UnitOfWork).Assembly);
            });
            var mapper = mapperConfiguration.CreateMapper();
           
           
            var serviceProvider = new ServiceCollection()
            .AddDbContext<ApplicationDbContext>(options =>
           //options.UseNpgsql(config["ConnectionStrings:DefaultConnection"]))
           options.UseSqlServer(config["ConnectionStrings:DefaultConnection"]))

           .AddScoped<IUnitOfWork, UnitOfWork>()
           .AddScoped<Services.IServices, Services.Services>()
           .AddScoped<BizLogic>()
           .AddSingleton<IMapper>(sp => mapperConfiguration.CreateMapper())
           .AddScoped<IViews, Views>()
        //    .AddScoped<Services.EMail.IEmailSender, Services.EMail.EmailSender>()
           .AddMemoryCache()
            .BuildServiceProvider();

            //services.AddScoped<Services.EMail.IEmailSender, Services.EMail.EmailSender>();
            
            var uow = serviceProvider.GetService<IUnitOfWork>();
            //  var bizLogic = serviceProvider.GetService<BizLogic>(); //error: 'Unable to resolve service for type 'Microsoft.Extensions.Logging.ILogger`1[BLL.BizLogic]'
            var views = serviceProvider.GetService<IViews>();

            var memoryCache = serviceProvider.GetService<IMemoryCache>();

            //Test Method:
           

            // for (int i = 0; i < 5; i++) 
            // {
            //     TestReport(views, mapper, uow);
            // }


            // TestReport1(views, mapper, uow, bizLogic);
            TestRoleMatrixCsv();
            
            Console.WriteLine("Completeted");

        }

        static void TestOMRViews(IViews views, IMapper mapper, IUnitOfWork uow){
              var watch = Stopwatch.StartNew();
              var sut = new VwOmrdashboardReportV2Query(views, mapper, uow);
            var recs = sut.OMRReport();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
        }
        
        static void TestReport(IViews views, IMapper mapper, IUnitOfWork uow){
              var watch = Stopwatch.StartNew();
            //   var sut = new  VwStudyReportSummary_Query(views);
              var sut = new  vwIMIStudyReviewV2_Query(views, mapper);
             var filters = new vwIMIStudyReviewReaderPerformanceSelectedFilters();
             filters.PageNumber = 1;
             filters.PageSize = 100;
             var test = sut.ReportList_S(filters);   

            // var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Console.WriteLine("elapsedTime : " + elapsedTime) ;
        }


        static void TestReport1(IViews views, IMapper mapper, IUnitOfWork uow, BizLogic bizLogic){
              var watch = Stopwatch.StartNew();
            //   var sut = new  VwStudyReportSummary_Query(views);
              var sut = new  vwReportIMICDMSTasksGroupV2_Query(views, mapper, bizLogic);
            //  var filters = new vwIMIStudyReviewReaderPerformanceSelectedFilters();
            //  filters.PageNumber = 1;
            //  filters.PageSize = 100;
            //  var test = sut.ReportList_S(filters);   

            // var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Console.WriteLine("elapsedTime : " + elapsedTime) ;
        }


        

        static void TestRoleMatrixCsv(){

           var roleMatrixFileName = @"C:\Development\p935-icon-prism-core\Prism\WebApi\AppSettings\RoleMatrixTest.csv";
           var menuDataFileName = @"C:\Development\p935-icon-prism-core\Prism\WebApi\AppSettings\MenuConfigTest.csv";
           
           var roleIds = new List<int> { 1801, 201};
            var appComponentObj = new AppComponentCsvData(roleMatrixFileName);
            var appComponents = appComponentObj.GetRoleMatrix();
            
            var menuAccessGenerator = new MenuAccessGenerator();
            var userCompPermissions = menuAccessGenerator.GetComponentPermissions(roleIds, appComponents);
            
            var menuAccessData = new MenuItemCsvData(menuDataFileName);
            var menuItems = menuAccessData.GetMenuConfigData();

            var menuAccessPermissions = menuAccessGenerator.GetMenuPmerissions(menuItems, userCompPermissions);
            
            // var permissions = menuAccessGenerator.GetMenuAppComponentPermissions(userCompPermissions, appComponents, menuItems);

        }


        

        public void TestCreateProjectGovernanceReview(){
            var uow = serviceProvider.GetService<IUnitOfWork>();
            var views = serviceProvider.GetService<IViews>();
            var mapper = serviceProvider.GetService<IMapper>();
            var bizLogic = serviceProvider.GetService<BizLogic>();

            // var sut = new vwProjReviewCompliance_Query(views, mapper, bizLogic);
            var sut = new TblCrmProjectGovernanceReviewCommands(uow);
        }
    }
}
