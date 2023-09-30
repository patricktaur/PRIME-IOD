using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using BLL.Helpers;
using DAL;
using DAL.Models;
using DAL.DTOs;
using AutoMapper;

using Helpers.Extensions;
namespace BLL.Query {
    public class tblAppAccessGroupMembers_Query {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;
        public tblAppAccessGroupMembers_Query (
            IUnitOfWork unitOfWork,
            IMapper mapper) {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        
        
        public List<tblAppAccessGroupMembersDTO> GetList(int studyId) {
            var recs = _unitOfWork.tblAppAccessGroupMembers_Repo.GetList(studyId);
            return  _mapper.Map<List<tblAppAccessGroupMembersDTO>>(recs);
        }

        public bool UserIsInActiveGroup(int userId){
            var predicate = PredicateBuilder.True<TblAppAccessGroupMembers>();
            predicate = predicate.And(i => i.UserId == userId);
            predicate = predicate.And(i => i.Group.Active == true);
            var groupMembers = _unitOfWork.tblAppAccessGroupMembers_Repo.Find(predicate) ;
            
            return groupMembers.Count() > 0 ? true : false; 
        }
   
        

        public TblAppAccessGroupMembers GetById (int RecId) {
            var record = _unitOfWork.tblAppAccessGroupMembers_Repo.Get(RecId);
            return record;
        }
    }
}