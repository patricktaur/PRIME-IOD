using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.TblUserTests
{

    public class TblUserTest
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
            
            var tbluser = new TblUser{DisplayName = "Test Property"};
            _unitOfWork.TblUser_Repo.Add(tbluser);
            _unitOfWork.SaveChanges();

            var tblusers = _unitOfWork.TblUser_Repo.GetAll().ToList();
            Assert.AreEqual(1, tblusers.Count());
        }
    }
}
