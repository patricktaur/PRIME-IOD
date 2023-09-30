using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwCDSDevelopmentTaskV2Tests
{

    public class vwCDSDevelopmentTaskV2Test
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
            
        //     var vwcdsdevelopmenttaskv2 = new vwCDSDevelopmentTaskV2{vwCDSDevelopmentTaskV2DisplayField = "Test Property"};
        //     _unitOfWork.vwCDSDevelopmentTaskV2_Repo.Add(vwcdsdevelopmenttaskv2);
        //     _unitOfWork.SaveChanges();

        //     var vwcdsdevelopmenttaskv2s = _unitOfWork.vwCDSDevelopmentTaskV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwcdsdevelopmenttaskv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwCDSDevelopmentTaskV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwcdsdevelopmenttaskv2s.Count());
        }
    }
}
