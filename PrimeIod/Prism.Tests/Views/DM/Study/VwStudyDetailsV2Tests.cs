using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.VwStudyDetailsV2Tests
{

    public class VwStudyDetailsV2Test
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
            
        //     var vwstudydetailsv2 = new VwStudyDetailsV2{VwStudyDetailsV2DisplayField = "Test Property"};
        //     _unitOfWork.VwStudyDetailsV2_Repo.Add(vwstudydetailsv2);
        //     _unitOfWork.SaveChanges();

        //     var vwstudydetailsv2s = _unitOfWork.VwStudyDetailsV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwstudydetailsv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  VwStudyDetailsV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwstudydetailsv2s.Count());
        }
    }
}
