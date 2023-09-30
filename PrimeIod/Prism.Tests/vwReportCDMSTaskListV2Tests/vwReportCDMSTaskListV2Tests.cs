using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwReportCDMSTaskListV2Tests
{

    public class vwReportCDMSTaskListV2Test
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
            
        //     var vwreportcdmstasklistv2 = new vwReportCDMSTaskListV2{vwReportCDMSTaskListV2DisplayField = "Test Property"};
        //     _unitOfWork.vwReportCDMSTaskListV2_Repo.Add(vwreportcdmstasklistv2);
        //     _unitOfWork.SaveChanges();

        //     var vwreportcdmstasklistv2s = _unitOfWork.vwReportCDMSTaskListV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwreportcdmstasklistv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwReportCDMSTaskListV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwreportcdmstasklistv2s.Count());
        }
    }
}
