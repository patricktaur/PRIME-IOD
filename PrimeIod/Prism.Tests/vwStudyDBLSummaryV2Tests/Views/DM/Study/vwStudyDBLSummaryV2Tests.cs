using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwStudyDBLSummaryV2Tests
{

    public class vwStudyDBLSummaryV2Test
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
            
        //     var vwstudydblsummaryv2 = new vwStudyDBLSummaryV2{vwStudyDBLSummaryV2DisplayField = "Test Property"};
        //     _unitOfWork.vwStudyDBLSummaryV2_Repo.Add(vwstudydblsummaryv2);
        //     _unitOfWork.SaveChanges();

        //     var vwstudydblsummaryv2s = _unitOfWork.vwStudyDBLSummaryV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwstudydblsummaryv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwStudyDBLSummaryV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwstudydblsummaryv2s.Count());
        }
    }
}
