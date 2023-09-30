using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.VwStudyReviewComplianceV2Tests
{

    public class VwStudyReviewComplianceV2Test
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
            
        //     var vwstudyreviewcompliancev2 = new VwStudyReviewComplianceV2{VwStudyReviewComplianceV2DisplayField = "Test Property"};
        //     _unitOfWork.VwStudyReviewComplianceV2_Repo.Add(vwstudyreviewcompliancev2);
        //     _unitOfWork.SaveChanges();

        //     var vwstudyreviewcompliancev2s = _unitOfWork.VwStudyReviewComplianceV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwstudyreviewcompliancev2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  VwStudyReviewComplianceV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwstudyreviewcompliancev2s.Count());
        }
    }
}
