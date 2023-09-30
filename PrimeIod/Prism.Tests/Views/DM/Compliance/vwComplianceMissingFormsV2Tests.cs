using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwComplianceMissingFormsV2Tests
{

    public class vwComplianceMissingFormsV2Test
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
            
        //     var vwcompliancemissingformsv2 = new vwComplianceMissingFormsV2{vwComplianceMissingFormsV2DisplayField = "Test Property"};
        //     _unitOfWork.vwComplianceMissingFormsV2_Repo.Add(vwcompliancemissingformsv2);
        //     _unitOfWork.SaveChanges();

        //     var vwcompliancemissingformsv2s = _unitOfWork.vwComplianceMissingFormsV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwcompliancemissingformsv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwComplianceMissingFormsV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwcompliancemissingformsv2s.Count());
        }
    }
}
