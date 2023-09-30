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
    public class TblAppAccessGroup_Query {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;
        public TblAppAccessGroup_Query (
            IUnitOfWork unitOfWork,
            IMapper mapper) {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        
        
        public List<TblAppAccessGroupDTO> GetList() {
            var recs = _unitOfWork.TblAppAccessGroup_Repo.GetList();
            return  _mapper.Map<List<TblAppAccessGroupDTO>>(recs);
        }
   
        

        public TblAppAccessGroup GetById (int RecId) {
            var record = _unitOfWork.TblAppAccessGroup_Repo.Get(RecId);
            return record;
        }
    }
}