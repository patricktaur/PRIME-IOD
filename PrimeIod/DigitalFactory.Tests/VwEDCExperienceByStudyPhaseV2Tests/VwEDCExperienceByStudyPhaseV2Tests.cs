using NUnit.Framework;
using DAL;
using DAL.Models;
using DigitalFactory.Tests.Helpers ;
using System.Linq;

namespace DigitalFactory.Tests.VwEDCExperienceByStudyPhaseV2Tests
{

    public class VwEDCExperienceByStudyPhaseV2Test
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
            
        //     var vwedcexperiencebystudyphasev2 = new VwEDCExperienceByStudyPhaseV2{VwEDCExperienceByStudyPhaseV2DisplayField = "Test Property"};
        //     _unitOfWork.VwEDCExperienceByStudyPhaseV2_Repo.Add(vwedcexperiencebystudyphasev2);
        //     _unitOfWork.SaveChanges();

        //     var vwedcexperiencebystudyphasev2s = _unitOfWork.VwEDCExperienceByStudyPhaseV2_Repo.GetAll().ToList();
        //     Assert.AreEqual(1, vwedcexperiencebystudyphasev2s.Count());
        // }

        [Test]
        public void RunReport(){
            var watch = Stopwatch.StartNew();
              var sut = new  VwEDCExperienceByStudyPhaseV2_Query(views);
            var recs = sut.ReportOne();
            watch.Stop();
            var elapsedTime = watch.ElapsedMilliseconds;
            Assert.AreEqual(1, vwedcexperiencebystudyphasev2s.Count());
        }
    }
}
