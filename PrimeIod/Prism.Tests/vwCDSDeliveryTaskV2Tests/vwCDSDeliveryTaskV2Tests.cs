using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwCDSDeliveryTaskV2Tests
{

    public class vwCDSDeliveryTaskV2Test
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
            
        //     var vwcdsdeliverytaskv2 = new vwCDSDeliveryTaskV2{vwCDSDeliveryTaskV2DisplayField = "Test Property"};
        //     _unitOfWork.vwCDSDeliveryTaskV2_Repo.Add(vwcdsdeliverytaskv2);
        //     _unitOfWork.SaveChanges();

        //     var vwcdsdeliverytaskv2s = _unitOfWork.vwCDSDeliveryTaskV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwcdsdeliverytaskv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwCDSDeliveryTaskV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwcdsdeliverytaskv2s.Count());
        }
    }
}
