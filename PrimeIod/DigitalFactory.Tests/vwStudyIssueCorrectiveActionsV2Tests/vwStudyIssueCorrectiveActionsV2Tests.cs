using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.vwStudyIssueCorrectiveActionsV2Tests
{

    public class vwStudyIssueCorrectiveActionsV2Test
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
            
        //     var vwstudyissuecorrectiveactionsv2 = new vwStudyIssueCorrectiveActionsV2{vwStudyIssueCorrectiveActionsV2DisplayField = "Test Property"};
        //     _unitOfWork.vwStudyIssueCorrectiveActionsV2_Repo.Add(vwstudyissuecorrectiveactionsv2);
        //     _unitOfWork.SaveChanges();

        //     var vwstudyissuecorrectiveactionsv2s = _unitOfWork.vwStudyIssueCorrectiveActionsV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwstudyissuecorrectiveactionsv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  vwStudyIssueCorrectiveActionsV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwstudyissuecorrectiveactionsv2s.Count());
        }
    }
}
