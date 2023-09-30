using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwCDSValidationTaskV2Tests
{

    public class vwCDSValidationTaskV2Test
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
            
        //     var vwcdsvalidationtaskv2 = new vwCDSValidationTaskV2{vwCDSValidationTaskV2DisplayField = "Test Property"};
        //     _unitOfWork.vwCDSValidationTaskV2_Repo.Add(vwcdsvalidationtaskv2);
        //     _unitOfWork.SaveChanges();

        //     var vwcdsvalidationtaskv2s = _unitOfWork.vwCDSValidationTaskV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwcdsvalidationtaskv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwCDSValidationTaskV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwcdsvalidationtaskv2s.Count());
        }
    }
}
