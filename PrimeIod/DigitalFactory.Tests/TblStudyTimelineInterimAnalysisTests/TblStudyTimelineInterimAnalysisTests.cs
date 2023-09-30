using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.TblStudyTimelineInterimAnalysisTests
{

    public class TblStudyTimelineInterimAnalysisTest
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
            
            var tblstudytimelineinterimanalysis = new TblStudyTimelineInterimAnalysis{AnalysisInterimDate = "Test Property"};
            _unitOfWork.TblStudyTimelineInterimAnalysis_Repo.Add(tblstudytimelineinterimanalysis);
            _unitOfWork.SaveChanges();

            var tblstudytimelineinterimanalysiss = _unitOfWork.TblStudyTimelineInterimAnalysis_Repo.GetAll().ToList();
            Assert.AreEqual(1, tblstudytimelineinterimanalysiss.Count());
        }
    }
}
