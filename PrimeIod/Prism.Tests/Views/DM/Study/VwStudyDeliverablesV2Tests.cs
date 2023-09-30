using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.VwStudyDeliverablesV2Tests
{

    public class VwStudyDeliverablesV2Test
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
            
        //     var vwstudydeliverablesv2 = new VwStudyDeliverablesV2{VwStudyDeliverablesV2DisplayField = "Test Property"};
        //     _unitOfWork.VwStudyDeliverablesV2_Repo.Add(vwstudydeliverablesv2);
        //     _unitOfWork.SaveChanges();

        //     var vwstudydeliverablesv2s = _unitOfWork.VwStudyDeliverablesV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwstudydeliverablesv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  VwStudyDeliverablesV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwstudydeliverablesv2s.Count());
        }
    }
}
