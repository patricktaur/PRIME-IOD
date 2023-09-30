using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.VwStudySummaryTests
{

    public class VwStudySummaryTest
    {

        private UnitOfWork _unitOfWork;


       //private  MasterDataCommands _masterDataCommands;
        [SetUp]
        public void Setup()
        {
            var factory = new SQLLiteDBContext();
            var dbContext = factory.CreateContextForSQLLite();

           _unitOfWork = new UnitOfWork(dbContext);

        }
        // [Test]
        // public void CreateTest(){
            
        //     var vwstudysummary = new VwStudySummary{VwStudySummaryDisplayField = "Test Property"};
        //     _unitOfWork.VwStudySummary_Repo.Add(vwstudysummary);
        //     _unitOfWork.SaveChanges();

        //     var vwstudysummarys = _unitOfWork.VwStudySummary_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwstudysummarys.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  VwStudySummary_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwstudysummarys.Count());
        }
    }
}
