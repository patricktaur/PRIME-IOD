using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.TblStudyTests
{

    public class TblStudyTest
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
            
            var tblstudy = new TblStudy{FirstIconNumber = "Test Property"};
            _unitOfWork.TblStudy_Repo.Add(tblstudy);
            _unitOfWork.SaveChanges();

            var tblstudys = _unitOfWork.TblStudy_Repo.GetAll().ToList();
            Assert.AreEqual(1, tblstudys.Count());
        }
    }
}
