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
    public class TblUser_Query {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;
        public TblUser_Query (
            IUnitOfWork unitOfWork,
            IMapper mapper) {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public UserNRolesDTO GetUserNRoles(string enterpriseId){
            var predicate = PredicateBuilder.True<TblUser>();
            predicate = predicate.And(i => i.EnterpriseId == enterpriseId);
            return _unitOfWork.TblUser_Repo.GetRecordDto<UserNRolesDTO>(predicate);
        }

        public TblUser GetUserByEnterpriseId(string EnterpriseId){
                return _unitOfWork.TblUser_Repo
                .Find(x => x.EnterpriseId == EnterpriseId)
                .FirstOrDefault();
            
        }
        
        public List<TblUserDTO> GetList(int studyId) {
            // var recs = _unitOfWork.TblUser_Repo.GetList(studyId);
            // return  _mapper.Map<List<TblUserDTO>>(recs);
            return null;
        }
   
        

        public TblUser GetById (int RecId) {
            var record = _unitOfWork.TblUser_Repo.Get(RecId);
            return record;
        }


        public List<int> GetUserRoleIds(int userId){
            
            // return  _unitOfWork.TblUserRole_Repo
            //     .Find( x=> x.UserId ==userId)
            //     .Select(x=> x.RoleId).ToList();

            var predicate = PredicateBuilder.True<TblUser>();
            predicate = predicate.And(i => i.Id == userId);
            var tblUser = _unitOfWork.TblUser_Repo.GetRecordDto<UserNRolesDTO>(predicate);
            if (tblUser == null){
                return null;
            }
            return tblUser.TblUserRole.Select(x => x.RoleId).ToList();
            
        }


    }
}