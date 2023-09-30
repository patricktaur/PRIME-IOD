using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.TblStudyTimelineInterimLocksTests
{

    public class TblStudyTimelineInterimLocksTest
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
            
            var tblstudytimelineinterimlocks = new TblStudyTimelineInterimLocks{InterimDate = "Test Property"};
            _unitOfWork.TblStudyTimelineInterimLocks_Repo.Add(tblstudytimelineinterimlocks);
            _unitOfWork.SaveChanges();

            var tblstudytimelineinterimlockss = _unitOfWork.TblStudyTimelineInterimLocks_Repo.GetAll().ToList();
            Assert.AreEqual(1, tblstudytimelineinterimlockss.Count());
        }
    }
}
