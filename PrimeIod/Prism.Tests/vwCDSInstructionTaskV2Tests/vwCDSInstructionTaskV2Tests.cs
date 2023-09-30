using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwCDSInstructionTaskV2Tests
{

    public class vwCDSInstructionTaskV2Test
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
            
        //     var vwcdsinstructiontaskv2 = new vwCDSInstructionTaskV2{vwCDSInstructionTaskV2DisplayField = "Test Property"};
        //     _unitOfWork.vwCDSInstructionTaskV2_Repo.Add(vwcdsinstructiontaskv2);
        //     _unitOfWork.SaveChanges();

        //     var vwcdsinstructiontaskv2s = _unitOfWork.vwCDSInstructionTaskV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwcdsinstructiontaskv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwCDSInstructionTaskV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwcdsinstructiontaskv2s.Count());
        }
    }
}
