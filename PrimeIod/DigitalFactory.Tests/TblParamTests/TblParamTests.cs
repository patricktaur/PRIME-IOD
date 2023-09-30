using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.TblParamTests
{

    public class TblParamTest
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
            
            var tblparam = new TblParam{Description = "Test Property"};
            _unitOfWork.TblParam_Repo.Add(tblparam);
            _unitOfWork.SaveChanges();

            var tblparams = _unitOfWork.TblParam_Repo.GetAll().ToList();
            Assert.AreEqual(1, tblparams.Count());
        }
    }
}
