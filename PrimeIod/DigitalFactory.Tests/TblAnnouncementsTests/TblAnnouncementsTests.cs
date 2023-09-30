using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.TblAnnouncementsTests
{

    public class TblAnnouncementsTest
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
            
            var tblannouncements = new TblAnnouncements{Title = "Test Property"};
            _unitOfWork.TblAnnouncements_Repo.Add(tblannouncements);
            _unitOfWork.SaveChanges();

            var tblannouncementss = _unitOfWork.TblAnnouncements_Repo.GetAll().ToList();
            Assert.AreEqual(1, tblannouncementss.Count());
        }
    }
}
