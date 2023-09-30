using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwReportCDMSTaskGroupV2Tests
{

    public class vwReportCDMSTaskGroupV2Test
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
            
        //     var vwreportcdmstaskgroupv2 = new vwReportCDMSTaskGroupV2{vwReportCDMSTaskGroupV2DisplayField = "Test Property"};
        //     _unitOfWork.vwReportCDMSTaskGroupV2_Repo.Add(vwreportcdmstaskgroupv2);
        //     _unitOfWork.SaveChanges();

        //     var vwreportcdmstaskgroupv2s = _unitOfWork.vwReportCDMSTaskGroupV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwreportcdmstaskgroupv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwReportCDMSTaskGroupV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwreportcdmstaskgroupv2s.Count());
        }
    }
}
