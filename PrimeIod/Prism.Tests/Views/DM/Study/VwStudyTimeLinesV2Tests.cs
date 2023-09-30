using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.VwStudyTimeLinesV2Tests
{

    public class VwStudyTimeLinesV2Test
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
            
        //     var vwstudytimelinesv2 = new VwStudyTimeLinesV2{VwStudyTimeLinesV2DisplayField = "Test Property"};
        //     _unitOfWork.VwStudyTimeLinesV2_Repo.Add(vwstudytimelinesv2);
        //     _unitOfWork.SaveChanges();

        //     var vwstudytimelinesv2s = _unitOfWork.VwStudyTimeLinesV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwstudytimelinesv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  VwStudyTimeLinesV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwstudytimelinesv2s.Count());
        }
    }
}
