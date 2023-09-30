using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwCelgenceDeliverablesV2Tests
{

    public class vwCelgenceDeliverablesV2Test
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
            
        //     var vwcelgencedeliverablesv2 = new vwCelgenceDeliverablesV2{vwCelgenceDeliverablesV2DisplayField = "Test Property"};
        //     _unitOfWork.vwCelgenceDeliverablesV2_Repo.Add(vwcelgencedeliverablesv2);
        //     _unitOfWork.SaveChanges();

        //     var vwcelgencedeliverablesv2s = _unitOfWork.vwCelgenceDeliverablesV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwcelgencedeliverablesv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwCelgenceDeliverablesV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwcelgencedeliverablesv2s.Count());
        }
    }
}
