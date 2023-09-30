using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwFTEResourceV2Tests
{

    public class vwFTEResourceV2Test
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
            
        //     var vwfteresourcev2 = new vwFTEResourceV2{vwFTEResourceV2DisplayField = "Test Property"};
        //     _unitOfWork.vwFTEResourceV2_Repo.Add(vwfteresourcev2);
        //     _unitOfWork.SaveChanges();

        //     var vwfteresourcev2s = _unitOfWork.vwFTEResourceV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwfteresourcev2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwFTEResourceV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwfteresourcev2s.Count());
        }
    }
}
