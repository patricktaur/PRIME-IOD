using System;
using DAL;
using DAL.Models;

namespace BLL.Command
{
    public class TblUserCommands
    {
        private IUnitOfWork _unitOfWork;
        public TblUserCommands(IUnitOfWork unitOfWork){
            _unitOfWork = unitOfWork;
        }
        

        public TblUser GetRecordNew (int studyId) {
            // var rec = new TblUser();
            // rec.StudyId = studyId;
            // return rec;
            return null;
        }

        public TblUser GetRecordForEdit (int recId) {
            return _unitOfWork.TblUser_Repo.Get(recId);
            
        }
        public TblUser Update(TblUser TblUser){
            _unitOfWork.TblUser_Repo.Update(TblUser);
            return TblUser;
        }

        public TblUser AddOrUpdate(TblUser TblUser){
           if (TblUser.Id > 0){
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                TblUser.UpdatedOn = DateTime.Now;
                _unitOfWork.TblUser_Repo.Update(TblUser);
                return TblUser;
           }else{
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                TblUser.CreatedOn = DateTime.Now;
                TblUser.UpdatedOn = DateTime.Now;
                _unitOfWork.TblUser_Repo.Add(TblUser);
                return TblUser;
           }
         }

        public bool Delete(int RecId){
            var TblUser = _unitOfWork.TblUser_Repo.Get(RecId);
            _unitOfWork.TblUser_Repo.Remove(TblUser);
            return true;
        }

    }
}