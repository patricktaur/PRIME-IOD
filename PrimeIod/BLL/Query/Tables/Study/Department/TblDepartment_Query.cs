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
    public class TblDepartment_Query {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;
        public TblDepartment_Query (
            IUnitOfWork unitOfWork,
            IMapper mapper) {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        
        
        public List<TblDepartmentDTO> GetList(int studyId) {
            var recs = _unitOfWork.TblDepartment_Repo.GetList(studyId);
            return  _mapper.Map<List<TblDepartmentDTO>>(recs);
        }
   
        

        public TblDepartment GetById (int RecId) {
            var record = _unitOfWork.TblDepartment_Repo.Get(RecId);
            return record;
        }
    }
}