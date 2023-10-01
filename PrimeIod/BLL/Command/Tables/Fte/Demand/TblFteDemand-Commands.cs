using System;
using DAL;
using DAL.Models;

namespace BLL.Command
{
    public class TblFteDemandCommands
    {
        private IUnitOfWork _unitOfWork;
        public TblFteDemandCommands(IUnitOfWork unitOfWork){
            _unitOfWork = unitOfWork;
        }
        

        public TblFteDemand GetRecordNew (int studyId) {
            var rec = new TblFteDemand
            {
               
                StudyId = studyId,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now
            };
            return rec;
        }

        public TblFteDemand GetRecordForEdit (int recId) {
            return _unitOfWork.TblFteDemand_Repo.Get(recId);
            
        }
        public TblFteDemand Update(TblFteDemand TblFteDemand){
            _unitOfWork.TblFteDemand_Repo.Update(TblFteDemand);
            return TblFteDemand;
        }

        public TblFteDemand AddOrUpdate(TblFteDemand TblFteDemand){
           if (TblFteDemand.Id > 0){
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                TblFteDemand.UpdatedOn = DateTime.Now;
                _unitOfWork.TblFteDemand_Repo.Update(TblFteDemand);
                return TblFteDemand;
           }else{
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                TblFteDemand.CreatedOn = DateTime.Now;
                TblFteDemand.UpdatedOn = DateTime.Now;
                _unitOfWork.TblFteDemand_Repo.Add(TblFteDemand);
                return TblFteDemand;
           }
         }

        public bool Delete(int RecId){
            var TblFteDemand = _unitOfWork.TblFteDemand_Repo.Get(RecId);
            _unitOfWork.TblFteDemand_Repo.Remove(TblFteDemand);
            return true;
        }

    }
}