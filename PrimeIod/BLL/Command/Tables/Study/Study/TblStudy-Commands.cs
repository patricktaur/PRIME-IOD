using System;
using DAL;
using DAL.Models;

namespace BLL.Command
{
    public class TblStudyCommands
    {
        private IUnitOfWork _unitOfWork;
        public TblStudyCommands(IUnitOfWork unitOfWork){
            _unitOfWork = unitOfWork;
        }
        

        public TblStudy GetRecordNew (int studyId) {
            var rec = new TblStudy();
            rec.Id = studyId;
            return rec;
        }

        public TblStudy GetRecordForEdit (int recId) {
            return _unitOfWork.TblStudy_Repo.Get(recId);
            
        }
        public TblStudy Update(TblStudy TblStudy){
            _unitOfWork.TblStudy_Repo.Update(TblStudy);
            return TblStudy;
        }

        public TblStudy AddOrUpdate(TblStudy TblStudy){
           if (TblStudy.Id > 0){
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                TblStudy.UpdatedOn = DateTime.Now;
                _unitOfWork.TblStudy_Repo.Update(TblStudy);
                return TblStudy;
           }else{
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                TblStudy.CreatedOn = DateTime.Now;
                TblStudy.UpdatedOn = DateTime.Now;
                _unitOfWork.TblStudy_Repo.Add(TblStudy);
                return TblStudy;
           }
         }

        public bool Delete(int RecId){
            var TblStudy = _unitOfWork.TblStudy_Repo.Get(RecId);
            _unitOfWork.TblStudy_Repo.Remove(TblStudy);
            return true;
        }

    }
}