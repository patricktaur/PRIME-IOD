using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.TblStudyResourcesTests
{

    public class TblStudyResourcesTest
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
            
            var tblstudyresources = new TblStudyResources{StartDate = "Test Property"};
            _unitOfWork.TblStudyResources_Repo.Add(tblstudyresources);
            _unitOfWork.SaveChanges();

            var tblstudyresourcess = _unitOfWork.TblStudyResources_Repo.GetAll().ToList();
            Assert.AreEqual(1, tblstudyresourcess.Count());
        }
    }
}
