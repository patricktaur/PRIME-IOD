using System;
using System.Collections.Generic;
using System.Linq;
using BLL.Helpers;
using DAL;
using DAL.DTOs;
using DAL.Models;

namespace BLL.Command
{
    public class tblAppAccessGroupMembersCommands
    {
        private IUnitOfWork _unitOfWork;
        public tblAppAccessGroupMembersCommands(IUnitOfWork unitOfWork){
            _unitOfWork = unitOfWork;
        }
        

        public TblAppAccessGroupMembers GetRecordNew (int studyId) {
            var rec = new TblAppAccessGroupMembers();
            
            return rec;
        }

        public TblAppAccessGroupMembers GetRecordForEdit (int recId) {
            return _unitOfWork.tblAppAccessGroupMembers_Repo.Get(recId);
            
        }
        
        
        public TblAppAccessGroupMembers Update(TblAppAccessGroupMembers tblAppAccessGroupMembers){
            _unitOfWork.tblAppAccessGroupMembers_Repo.Update(tblAppAccessGroupMembers);
            return tblAppAccessGroupMembers;
        }

        public List<FilterItem> GetGroupMembers (int groupId) {
            // return _unitOfWork.tblAppAccessGroupMembers_Repo.Get(recId);
            var predicate = PredicateBuilder.True<TblAppAccessGroupMembers>();
            predicate = predicate.And(i => i.GroupId == groupId);
            var groupMembers = _unitOfWork.tblAppAccessGroupMembers_Repo.GetList<FilterItem>(predicate);
            
            return groupMembers;
        }
        

        public List<FilterItem> GroupMembersUpdate(int loggedInUserId, int groupId, List<FilterItem>  accessGroupMembers){
        
            var members = _unitOfWork.tblAppAccessGroupMembers_Repo.Find(x => x.GroupId == groupId).ToList();
            
            var membersToRemove = members.Where(x => !accessGroupMembers.Any(y => y.Id == x.RecId)).ToList();
            var membersToAdd = accessGroupMembers.Where(x => !members.Any(y => y.RecId == x.Id)).ToList();

            foreach (var member in membersToRemove)
            {
                _unitOfWork.tblAppAccessGroupMembers_Repo.Remove(member);
            }

            foreach (var member in membersToAdd)
            {
            _unitOfWork.tblAppAccessGroupMembers_Repo.Add(new TblAppAccessGroupMembers
            {
                CreatedOn = DateTime.Now,
                CreatedById = loggedInUserId,
                UpdatedOn = DateTime.Now,
                UpdatedById = loggedInUserId,
                GroupId = groupId,
                UserId = member.Id
            });
    }


            return accessGroupMembers;
        
         }

        public bool Delete(int RecId){
            var tblAppAccessGroupMembers = _unitOfWork.tblAppAccessGroupMembers_Repo.Get(RecId);
            _unitOfWork.tblAppAccessGroupMembers_Repo.Remove(tblAppAccessGroupMembers);
            return true;
        }

    }
}