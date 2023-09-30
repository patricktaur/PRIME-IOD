using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwComplianceOfflineValidationsV2Tests
{

    public class vwComplianceOfflineValidationsV2Test
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
            
        //     var vwcomplianceofflinevalidationsv2 = new vwComplianceOfflineValidationsV2{vwComplianceOfflineValidationsV2DisplayField = "Test Property"};
        //     _unitOfWork.vwComplianceOfflineValidationsV2_Repo.Add(vwcomplianceofflinevalidationsv2);
        //     _unitOfWork.SaveChanges();

        //     var vwcomplianceofflinevalidationsv2s = _unitOfWork.vwComplianceOfflineValidationsV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwcomplianceofflinevalidationsv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwComplianceOfflineValidationsV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwcomplianceofflinevalidationsv2s.Count());
        }
    }
}
