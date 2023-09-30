using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwResourceAssignmentReportV2Tests
{

    public class vwResourceAssignmentReportV2Test
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
            
        //     var vwresourceassignmentreportv2 = new vwResourceAssignmentReportV2{vwResourceAssignmentReportV2DisplayField = "Test Property"};
        //     _unitOfWork.vwResourceAssignmentReportV2_Repo.Add(vwresourceassignmentreportv2);
        //     _unitOfWork.SaveChanges();

        //     var vwresourceassignmentreportv2s = _unitOfWork.vwResourceAssignmentReportV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwresourceassignmentreportv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwResourceAssignmentReportV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwresourceassignmentreportv2s.Count());
        }
    }
}
