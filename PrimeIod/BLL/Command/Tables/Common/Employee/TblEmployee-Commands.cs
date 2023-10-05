using System;
using DAL;
using DAL.Models;

namespace BLL.Command
{
    public class TblEmployeeCommands
    {
        private IUnitOfWork _unitOfWork;
        public TblEmployeeCommands(IUnitOfWork unitOfWork){
            _unitOfWork = unitOfWork;
        }
        

        public TblEmployee GetRecordNew () {
            var rec = new TblEmployee();
            // rec.StudyId = studyId;
            return rec;
        }

        public TblEmployee GetRecordForEdit (int recId) {
            return _unitOfWork.TblEmployee_Repo.Get(recId);
            
        }
        public TblEmployee Update(TblEmployee TblEmployee){
            _unitOfWork.TblEmployee_Repo.Update(TblEmployee);
            return TblEmployee;
        }

        public TblEmployee AddOrUpdate(TblEmployee TblEmployee){
           if (TblEmployee.Id > 0){
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                TblEmployee.UpdatedOn = DateTime.Now;
                _unitOfWork.TblEmployee_Repo.Update(TblEmployee);
                return TblEmployee;
           }else{
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                TblEmployee.CreatedOn = DateTime.Now;
                TblEmployee.UpdatedOn = DateTime.Now;
                _unitOfWork.TblEmployee_Repo.Add(TblEmployee);
                return TblEmployee;
           }
         }

        public bool Delete(int RecId){
            var TblEmployee = _unitOfWork.TblEmployee_Repo.Get(RecId);
            _unitOfWork.TblEmployee_Repo.Remove(TblEmployee);
            return true;
        }

    }
}