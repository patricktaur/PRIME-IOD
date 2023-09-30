using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwReportCDMSV2Tests
{

    public class vwReportCDMSV2Test
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
            
        //     var vwreportcdmsv2 = new vwReportCDMSV2{vwReportCDMSV2DisplayField = "Test Property"};
        //     _unitOfWork.vwReportCDMSV2_Repo.Add(vwreportcdmsv2);
        //     _unitOfWork.SaveChanges();

        //     var vwreportcdmsv2s = _unitOfWork.vwReportCDMSV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwreportcdmsv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwReportCDMSV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwreportcdmsv2s.Count());
        }
    }
}
