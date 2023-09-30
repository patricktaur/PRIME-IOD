using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwCDSOutputTaskV2Tests
{

    public class vwCDSOutputTaskV2Test
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
            
        //     var vwcdsoutputtaskv2 = new vwCDSOutputTaskV2{vwCDSOutputTaskV2DisplayField = "Test Property"};
        //     _unitOfWork.vwCDSOutputTaskV2_Repo.Add(vwcdsoutputtaskv2);
        //     _unitOfWork.SaveChanges();

        //     var vwcdsoutputtaskv2s = _unitOfWork.vwCDSOutputTaskV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwcdsoutputtaskv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwCDSOutputTaskV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwcdsoutputtaskv2s.Count());
        }
    }
}
