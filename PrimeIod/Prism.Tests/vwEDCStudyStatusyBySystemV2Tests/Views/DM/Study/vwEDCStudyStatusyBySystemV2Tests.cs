using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwEDCStudyStatusyBySystemV2Tests
{

    public class vwEDCStudyStatusyBySystemV2Test
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
            
        //     var vwedcstudystatusybysystemv2 = new vwEDCStudyStatusyBySystemV2{vwEDCStudyStatusyBySystemV2DisplayField = "Test Property"};
        //     _unitOfWork.vwEDCStudyStatusyBySystemV2_Repo.Add(vwedcstudystatusybysystemv2);
        //     _unitOfWork.SaveChanges();

        //     var vwedcstudystatusybysystemv2s = _unitOfWork.vwEDCStudyStatusyBySystemV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwedcstudystatusybysystemv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwEDCStudyStatusyBySystemV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwedcstudystatusybysystemv2s.Count());
        }
    }
}
