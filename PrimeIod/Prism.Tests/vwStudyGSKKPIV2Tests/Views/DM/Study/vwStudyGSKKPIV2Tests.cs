using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwStudyGSKKPIV2Tests
{

    public class vwStudyGSKKPIV2Test
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
            
        //     var vwstudygskkpiv2 = new vwStudyGSKKPIV2{vwStudyGSKKPIV2DisplayField = "Test Property"};
        //     _unitOfWork.vwStudyGSKKPIV2_Repo.Add(vwstudygskkpiv2);
        //     _unitOfWork.SaveChanges();

        //     var vwstudygskkpiv2s = _unitOfWork.vwStudyGSKKPIV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwstudygskkpiv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwStudyGSKKPIV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwstudygskkpiv2s.Count());
        }
    }
}
