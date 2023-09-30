using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwCDSCodingTaskV2Tests
{

    public class vwCDSCodingTaskV2Test
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
            
        //     var vwcdscodingtaskv2 = new vwCDSCodingTaskV2{vwCDSCodingTaskV2DisplayField = "Test Property"};
        //     _unitOfWork.vwCDSCodingTaskV2_Repo.Add(vwcdscodingtaskv2);
        //     _unitOfWork.SaveChanges();

        //     var vwcdscodingtaskv2s = _unitOfWork.vwCDSCodingTaskV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwcdscodingtaskv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwCDSCodingTaskV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwcdscodingtaskv2s.Count());
        }
    }
}
