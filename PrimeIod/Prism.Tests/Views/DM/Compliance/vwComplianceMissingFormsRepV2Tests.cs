using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwComplianceMissingFormsRepV2Tests
{

    public class vwComplianceMissingFormsRepV2Test
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
            
        //     var vwcompliancemissingformsrepv2 = new vwComplianceMissingFormsRepV2{vwComplianceMissingFormsRepV2DisplayField = "Test Property"};
        //     _unitOfWork.vwComplianceMissingFormsRepV2_Repo.Add(vwcompliancemissingformsrepv2);
        //     _unitOfWork.SaveChanges();

        //     var vwcompliancemissingformsrepv2s = _unitOfWork.vwComplianceMissingFormsRepV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwcompliancemissingformsrepv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwComplianceMissingFormsRepV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwcompliancemissingformsrepv2s.Count());
        }
    }
}
