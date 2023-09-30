using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwComplianceOfflineValidationsRepV2Tests
{

    public class vwComplianceOfflineValidationsRepV2Test
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
            
        //     var vwcomplianceofflinevalidationsrepv2 = new vwComplianceOfflineValidationsRepV2{vwComplianceOfflineValidationsRepV2DisplayField = "Test Property"};
        //     _unitOfWork.vwComplianceOfflineValidationsRepV2_Repo.Add(vwcomplianceofflinevalidationsrepv2);
        //     _unitOfWork.SaveChanges();

        //     var vwcomplianceofflinevalidationsrepv2s = _unitOfWork.vwComplianceOfflineValidationsRepV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwcomplianceofflinevalidationsrepv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwComplianceOfflineValidationsRepV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwcomplianceofflinevalidationsrepv2s.Count());
        }
    }
}
