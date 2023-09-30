using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using BLL.Helpers;
using DAL;
using DAL.Models;
using DAL.DTOs;
using Helpers.Extensions;
using Computations.Enumerators;
namespace BLL.Query {
    public class CommonQuery {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;
        private BizLogic _bizLogic;
        public CommonQuery (
            IUnitOfWork unitOfWork,
            IMapper mapper,
            BizLogic bizLogic
            ) {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _bizLogic = bizLogic;
        }

        

        

        public List<object> GetUserRoles(int userId){
            return null;
            // var roles = _bizLogic.TblUserQuery.GetUserRoleNames(userId);
            // return roles;
        }

        

       





    }
}