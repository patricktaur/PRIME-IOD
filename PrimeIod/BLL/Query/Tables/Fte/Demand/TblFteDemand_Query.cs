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
    public class TblFteDemand_Query {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;
        public TblFteDemand_Query (
            IUnitOfWork unitOfWork,
            IMapper mapper) {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        
        public List<TblFteDemandDTO> GetList() {
            
            var recs = _unitOfWork.TblFteDemand_Repo.GetList();
            return  _mapper.Map<List<TblFteDemandDTO>>(recs);
        }
        public List<TblFteDemandDTO> GetList(int studyId) {
            return null;
            // var recs = _unitOfWork.TblFteDemand_Repo.GetList(studyId);
            // return  _mapper.Map<List<TblFteDemandDTO>>(recs);
        }
   
        

        public TblFteDemand GetById (int RecId) {
            var record = _unitOfWork.TblFteDemand_Repo.Get(RecId);
            return record;
        }
    }
}