using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.TblTaskCategoryTests
{

    public class TblTaskCategoryTest
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
            
            var tbltaskcategory = new TblTaskCategory{TaskCategory = "Test Property"};
            _unitOfWork.TblTaskCategory_Repo.Add(tbltaskcategory);
            _unitOfWork.SaveChanges();

            var tbltaskcategorys = _unitOfWork.TblTaskCategory_Repo.GetAll().ToList();
            Assert.AreEqual(1, tbltaskcategorys.Count());
        }
    }
}
