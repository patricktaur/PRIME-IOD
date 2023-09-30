using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwProjectReviewV2Tests
{

    public class vwProjectReviewV2Test
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
            
        //     var vwprojectreviewv2 = new vwProjectReviewV2{vwProjectReviewV2DisplayField = "Test Property"};
        //     _unitOfWork.vwProjectReviewV2_Repo.Add(vwprojectreviewv2);
        //     _unitOfWork.SaveChanges();

        //     var vwprojectreviewv2s = _unitOfWork.vwProjectReviewV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwprojectreviewv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwProjectReviewV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwprojectreviewv2s.Count());
        }
    }
}
