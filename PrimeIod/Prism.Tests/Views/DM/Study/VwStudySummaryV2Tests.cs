using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.VwStudySummaryV2Tests
{

    public class VwStudySummaryV2Test
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
            
        //     var vwstudysummaryv2 = new VwStudySummaryV2{VwStudySummaryV2DisplayField = "Test Property"};
        //     _unitOfWork.VwStudySummaryV2_Repo.Add(vwstudysummaryv2);
        //     _unitOfWork.SaveChanges();

        //     var vwstudysummaryv2s = _unitOfWork.VwStudySummaryV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwstudysummaryv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  VwStudySummaryV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwstudysummaryv2s.Count());
        }
    }
}
