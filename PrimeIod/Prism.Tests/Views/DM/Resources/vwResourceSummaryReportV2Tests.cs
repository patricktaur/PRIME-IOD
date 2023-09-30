using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwResourceSummaryReportV2Tests
{

    public class vwResourceSummaryReportV2Test
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
            
        //     var vwresourcesummaryreportv2 = new vwResourceSummaryReportV2{vwResourceSummaryReportV2DisplayField = "Test Property"};
        //     _unitOfWork.vwResourceSummaryReportV2_Repo.Add(vwresourcesummaryreportv2);
        //     _unitOfWork.SaveChanges();

        //     var vwresourcesummaryreportv2s = _unitOfWork.vwResourceSummaryReportV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwresourcesummaryreportv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwResourceSummaryReportV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwresourcesummaryreportv2s.Count());
        }
    }
}
