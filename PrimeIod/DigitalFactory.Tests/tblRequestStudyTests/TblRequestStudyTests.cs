using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.TblRequestStudyTests
{

    public class TblRequestStudyTest
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
            
            var tblrequeststudy = new TblRequestStudy{ApprovedBy = "Test Property"};
            _unitOfWork.TblRequestStudy_Repo.Add(tblrequeststudy);
            _unitOfWork.SaveChanges();

            var tblrequeststudys = _unitOfWork.TblRequestStudy_Repo.GetAll().ToList();
            Assert.AreEqual(1, tblrequeststudys.Count());
        }
    }
}
