using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwCDSV2Tests
{

    public class vwCDSV2Test
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
            
        //     var vwcdsv2 = new vwCDSV2{vwCDSV2DisplayField = "Test Property"};
        //     _unitOfWork.vwCDSV2_Repo.Add(vwcdsv2);
        //     _unitOfWork.SaveChanges();

        //     var vwcdsv2s = _unitOfWork.vwCDSV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwcdsv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwCDSV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwcdsv2s.Count());
        }
    }
}
