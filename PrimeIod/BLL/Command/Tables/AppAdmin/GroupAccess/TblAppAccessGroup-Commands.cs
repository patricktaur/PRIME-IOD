using System.Linq;
using DAL;
using DAL.Models;

namespace BLL.Command
{
    public class TblAppAccessGroupCommands
    {
        private IUnitOfWork _unitOfWork;
        public TblAppAccessGroupCommands(IUnitOfWork unitOfWork){
            _unitOfWork = unitOfWork;
        }
        

        public TblAppAccessGroup GetRecordNew (int studyId) {
            var rec = new TblAppAccessGroup();
            
            return rec;
        }

        public TblAppAccessGroup GetRecordForEdit (int recId) {
            return _unitOfWork.TblAppAccessGroup_Repo.Get(recId);
            
        }
        public TblAppAccessGroup Update(TblAppAccessGroup TblAppAccessGroup){
            _unitOfWork.TblAppAccessGroup_Repo.Update(TblAppAccessGroup);
            return TblAppAccessGroup;
        }

        public TblAppAccessGroup AddOrUpdate(TblAppAccessGroup TblAppAccessGroup){
           if (TblAppAccessGroup.RecId > 0){
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                // TblAppAccessGroup.UpdatedOn = DateTime.Now;
                _unitOfWork.TblAppAccessGroup_Repo.Update(TblAppAccessGroup);
                return TblAppAccessGroup;
           }else{
                //todo: 
                //ApplicationDBContext.UpdateAuditEntities is not setting the dates;
                //to be resolved.
                // TblAppAccessGroup.CreatedOn = DateTime.Now;
                // TblAppAccessGroup.UpdatedOn = DateTime.Now;
                _unitOfWork.TblAppAccessGroup_Repo.Add(TblAppAccessGroup);
                return TblAppAccessGroup;
           }
         }

        public bool Delete(int RecId){
            //remove members:
            var members = _unitOfWork.tblAppAccessGroupMembers_Repo.Find(x => x.GroupId == RecId).ToList();
            foreach (var member in members)
            {
                _unitOfWork.tblAppAccessGroupMembers_Repo.Remove(member);
            }
           
            var TblAppAccessGroup = _unitOfWork.TblAppAccessGroup_Repo.Get(RecId);

            _unitOfWork.TblAppAccessGroup_Repo.Remove(TblAppAccessGroup);
            return true;
        }

    }
}