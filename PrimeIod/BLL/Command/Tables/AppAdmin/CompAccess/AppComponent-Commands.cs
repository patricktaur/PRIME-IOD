using System;
using DAL;
using DAL.Models;

namespace BLL.Command
{
    public class AppComponentCommands
    {
        private IUnitOfWork _unitOfWork;
        public AppComponentCommands(IUnitOfWork unitOfWork){
            _unitOfWork = unitOfWork;
        }
        

        public AppComponent GetRecordNew (int studyId) {
            var rec = new AppComponent();
            
            return rec;
        }

        public AppComponent GetRecordForEdit (int recId) {
            return _unitOfWork.AppComponent_Repo.Get(recId);
            
        }
        public AppComponent Update(AppComponent AppComponent){
            _unitOfWork.AppComponent_Repo.Update(AppComponent);
            return AppComponent;
        }

        public AppComponent AddOrUpdate(AppComponent AppComponent){
           if (AppComponent.RecId > 0){
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                AppComponent.UpdatedOn = DateTime.Now;
                _unitOfWork.AppComponent_Repo.Update(AppComponent);
                return AppComponent;
           }else{
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                AppComponent.CreatedOn = DateTime.Now;
                AppComponent.UpdatedOn = DateTime.Now;
                _unitOfWork.AppComponent_Repo.Add(AppComponent);
                return AppComponent;
           }
         }

        public bool Delete(int RecId){
            var AppComponent = _unitOfWork.AppComponent_Repo.Get(RecId);
            _unitOfWork.AppComponent_Repo.Remove(AppComponent);
            return true;
        }

    }
}