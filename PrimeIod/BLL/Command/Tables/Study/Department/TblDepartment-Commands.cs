using System;
using DAL;
using DAL.Models;

namespace BLL.Command
{
    public class TblDepartmentCommands
    {
        private IUnitOfWork _unitOfWork;
        public TblDepartmentCommands(IUnitOfWork unitOfWork){
            _unitOfWork = unitOfWork;
        }
        

        public TblDepartment GetRecordNew (int studyId) {
            var rec = new TblDepartment();
            // rec.StudyId = studyId;
            return rec;
        }

        public TblDepartment GetRecordForEdit (int recId) {
            return _unitOfWork.TblDepartment_Repo.Get(recId);
            
        }
        public TblDepartment Update(TblDepartment TblDepartment){
            _unitOfWork.TblDepartment_Repo.Update(TblDepartment);
            return TblDepartment;
        }

        public TblDepartment AddOrUpdate(TblDepartment TblDepartment){
           if (TblDepartment.Id > 0){
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                TblDepartment.UpdatedOn = DateTime.Now;
                _unitOfWork.TblDepartment_Repo.Update(TblDepartment);
                return TblDepartment;
           }else{
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                TblDepartment.CreatedOn = DateTime.Now;
                TblDepartment.UpdatedOn = DateTime.Now;
                _unitOfWork.TblDepartment_Repo.Add(TblDepartment);
                return TblDepartment;
           }
         }

        public bool Delete(int RecId){
            var TblDepartment = _unitOfWork.TblDepartment_Repo.Get(RecId);
            _unitOfWork.TblDepartment_Repo.Remove(TblDepartment);
            return true;
        }

    }
}