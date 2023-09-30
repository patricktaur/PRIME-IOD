using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwReportIMICDMSTaksListV2Tests
{

    public class vwReportIMICDMSTaksListV2Test
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
            
        //     var vwreportimicdmstakslistv2 = new vwReportIMICDMSTaksListV2{vwReportIMICDMSTaksListV2DisplayField = "Test Property"};
        //     _unitOfWork.vwReportIMICDMSTaksListV2_Repo.Add(vwreportimicdmstakslistv2);
        //     _unitOfWork.SaveChanges();

        //     var vwreportimicdmstakslistv2s = _unitOfWork.vwReportIMICDMSTaksListV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwreportimicdmstakslistv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwReportIMICDMSTaksListV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwreportimicdmstakslistv2s.Count());
        }
    }
}
