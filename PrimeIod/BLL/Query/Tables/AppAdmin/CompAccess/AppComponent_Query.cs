// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Linq.Expressions;
// using BLL.Helpers;
// using DAL;
// using DAL.Models;
// using DAL.DTOs;
// using AutoMapper;

// using Helpers.Extensions;
// namespace BLL.Query {
//     public class AppComponent_Query {
//         private IUnitOfWork _unitOfWork;
//         private IMapper _mapper;
//         public AppComponent_Query (
//             IUnitOfWork unitOfWork,
//             IMapper mapper) {
//             _unitOfWork = unitOfWork;
//             _mapper = mapper;
//         }

        
        
//         public List<AppComponentDTO> GetList(int studyId) {
//             var recs = _unitOfWork.AppComponent_Repo.GetList(studyId);
//             return  _mapper.Map<List<AppComponentDTO>>(recs);
//         }
   
        

//         public AppComponent GetById (int RecId) {
//             var record = _unitOfWork.AppComponent_Repo.Get(RecId);
//             return record;
//         }

        

//         public List<string> GetAppComponentPermissions(List<int> roleIds){

//             var predicate = PredicateBuilder.True<AppComponentRoles>();
//                         predicate = predicate.And(
//                     i => roleIds.Contains(i.RoleId)); 

//             var permissions = _unitOfWork.AppComponent_Repo.GetList<AppComponentRolesDTO>(predicate);
            
            
//             List<string> derivedPermissions = permissions
//             .Select(p => $"{p.AppComponentCompCode}-{(p.Mode == 0 ? "view" : "edit")}")
//             .ToList();

//             return derivedPermissions;

//         }
//     }
// }