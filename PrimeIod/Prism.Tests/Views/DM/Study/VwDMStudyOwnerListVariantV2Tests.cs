using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.VwDMStudyOwnerListV2Tests
{

    public class VwDMStudyOwnerListV2Test
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
        // [Test]
        // public void CreateTest(){
            
        //     var vwdmstudyownerlistv2 = new VwDMStudyOwnerListV2{VwDMStudyOwnerListV2DisplayField = "Test Property"};
        //     _unitOfWork.VwDMStudyOwnerListV2_Repo.Add(vwdmstudyownerlistv2);
        //     _unitOfWork.SaveChanges();

        //     var vwdmstudyownerlistv2s = _unitOfWork.VwDMStudyOwnerListV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwdmstudyownerlistv2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  VwDMStudyOwnerListVariantV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwdmstudyownerlistv2s.Count());
        }
    }
}
