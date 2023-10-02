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
    public class TblStudy_Query {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;
        public TblStudy_Query (
            IUnitOfWork unitOfWork,
            IMapper mapper) {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        
        
        public List<TblStudyDTO> GetList(int studyId) {
            var recs = _unitOfWork.TblStudy_Repo.GetList(studyId);
            return  _mapper.Map<List<TblStudyDTO>>(recs);
        }
   
        

        public TblStudy GetById (int RecId) {
            var record = _unitOfWork.TblStudy_Repo.Get(RecId);
            return record;
        }
    }
}