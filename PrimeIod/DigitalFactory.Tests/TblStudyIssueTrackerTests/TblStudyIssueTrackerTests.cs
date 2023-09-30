using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.TblStudyIssueTrackerTests
{

    public class TblStudyIssueTrackerTest
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
        [Test]
        public void CreateTest(){
            
            var tblstudyissuetracker = new TblStudyIssueTracker{IssueDescription = "Test Property"};
            _unitOfWork.TblStudyIssueTracker_Repo.Add(tblstudyissuetracker);
            _unitOfWork.SaveChanges();

            var tblstudyissuetrackers = _unitOfWork.TblStudyIssueTracker_Repo.GetAll().ToList();
            Assert.AreEqual(1, tblstudyissuetrackers.Count());
        }
    }
}
