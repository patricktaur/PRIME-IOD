using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.VwStudyDMOwnerListV2Tests
{

    public class VwStudyDMOwnerListV2Test
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
            
        //     var vwstudydmownerlistv2 = new VwStudyDMOwnerListV2{VwStudyDMOwnerListV2DisplayField = "Test Property"};
        //     _unitOfWork.VwStudyDMOwnerListV2_Repo.Add(vwstudydmownerlistv2);
        //     _unitOfWork.SaveChanges();

        //     var vwstudydmownerlistv2s = _unitOfWork.VwStudyDMOwnerListV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwstudydmownerlistv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  VwStudyDMOwnerListV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwstudydmownerlistv2s.Count());
        }
    }
}
