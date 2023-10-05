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
    public class TblEmployee_Query {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;
        public TblEmployee_Query (
            IUnitOfWork unitOfWork,
            IMapper mapper) {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        
        
        public List<TblEmployeeDTO> GetList() {
            var recs = _unitOfWork.TblEmployee_Repo.GetList();
            return  _mapper.Map<List<TblEmployeeDTO>>(recs);
        }
   
        

        public TblEmployee GetById (int RecId) {
            var record = _unitOfWork.TblEmployee_Repo.Get(RecId);
            return record;
        }
    }
}