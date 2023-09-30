using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwIMICDMSReportV2Tests
{

    public class vwIMICDMSReportV2Test
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
            
        //     var vwimicdmsreportv2 = new vwIMICDMSReportV2{vwIMICDMSReportV2DisplayField = "Test Property"};
        //     _unitOfWork.vwIMICDMSReportV2_Repo.Add(vwimicdmsreportv2);
        //     _unitOfWork.SaveChanges();

        //     var vwimicdmsreportv2s = _unitOfWork.vwIMICDMSReportV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwimicdmsreportv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwIMICDMSReportV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwimicdmsreportv2s.Count());
        }
    }
}
