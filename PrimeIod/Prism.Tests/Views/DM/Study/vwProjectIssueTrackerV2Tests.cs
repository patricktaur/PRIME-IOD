using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwProjectIssueTrackerV2Tests
{

    public class vwProjectIssueTrackerV2Test
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
            
        //     var vwprojectissuetrackerv2 = new vwProjectIssueTrackerV2{vwProjectIssueTrackerV2DisplayField = "Test Property"};
        //     _unitOfWork.vwProjectIssueTrackerV2_Repo.Add(vwprojectissuetrackerv2);
        //     _unitOfWork.SaveChanges();

        //     var vwprojectissuetrackerv2s = _unitOfWork.vwProjectIssueTrackerV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwprojectissuetrackerv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwProjectIssueTrackerV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwprojectissuetrackerv2s.Count());
        }
    }
}
