using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Identity;
using Computations.Enumerators;
using DAL.Models;
using DAL.DTOs;
using AutoMapper;
using Helpers.Extensions;
using BLL.MenuAccess;


namespace BLL.CachedData
{
    
    public class UserRolesPermissionsCache
    {
        private const string _key = "userRoles";
        private readonly IMemoryCache _memoryCache;
        private readonly BizLogic _bizLogic;
        private IMapper _mapper;

        // private MenuAccessGenerator _menuAccessGenerator;
        private AppComponentMenuPermissions _appCompAndMenuPermissions;

        private readonly RoleManager<ApplicationRole> _roleManager;
        public UserRolesPermissionsCache(
            BizLogic bizLogic,
            IMemoryCache memoryCache,
            IMapper mapper,
            RoleManager<ApplicationRole> roleManager,
            // MenuAccessGenerator menuGenerator
            AppComponentMenuPermissions appCompAndMenuPermissions
        ){
            _bizLogic = bizLogic;
            _memoryCache = memoryCache;
            _mapper = mapper;
            _roleManager = roleManager;
            // _menuAccessGenerator = menuGenerator;
            _appCompAndMenuPermissions = appCompAndMenuPermissions;
        }

        private List<UserRolePermissionsDTO> _UsersNrolesCached = new List<UserRolePermissionsDTO>();
        public List<UserRolePermissionsDTO> UsersNrolesCached { 
            get{
                //Pending CAching
                
                return _UsersNrolesCached;
            }
        }

        

        

        public UserRolePermissionsDTO GetUserRolesPermissions(string enterpriseId){
            UserRolePermissionsDTO retUserRolePermissionsDTO;
            retUserRolePermissionsDTO = _UsersNrolesCached.Where(x => x.EnterpriseId == enterpriseId).FirstOrDefault();
            if (retUserRolePermissionsDTO != null){
                return retUserRolePermissionsDTO;
            }
            var userNRoles  = AddUserRolesPermissions(enterpriseId);
            if (userNRoles.Permissions.Count > 0 ){
                _UsersNrolesCached.Add(userNRoles);
            }
            return userNRoles;
        }

        public bool HasPermission(string enterpriseId, string requiredPermissions){
            var userPermissionsDTO = GetUserRolesPermissions(enterpriseId);

            var userPermissions = 
            userPermissionsDTO.Permissions
            .Select(p => p.Trim())
                .Select(p => p.ToLower())
                .ToList();
            ;
            //array1.Intersect(array2).Any()
            //string[] parts= Array.ConvertAll(line.Split(','), p => p.Trim());
            // var requiredPermissionsArray = requiredPermissions.Split(",").ToList();
            var requiredPermissionsArray = 
                requiredPermissions.Split(",")
                .Select(p => p.Trim())
                .Select(p => p.ToLower())
                .ToList();

            var matchFound = requiredPermissionsArray.Intersect(userPermissions).Any();
            if (matchFound == true){
                return true;
            }else{
               
                //global:
                var retValue = false;
                foreach(var rqdPer in requiredPermissionsArray){
                    var rqdPerTrimmed = rqdPer.Trim();
                   
                    if (rqdPerTrimmed == "*" && userPermissions.Count > 0){
                        retValue = true;
                    }
                    if (rqdPerTrimmed == "rol.*" && userPermissions.Any(x => x.StartsWith("rol."))){
                        retValue = true;
                    }
                    //any study, any resource role
                    if (rqdPerTrimmed == "res.*" && userPermissions.Any(x => x.StartsWith("res."))  ){
                        retValue = true;
                    }
                    if (retValue == true){
                        return retValue;
                    }
                }

                return retValue;
            }
            
            // return  userPermissions.Permissions.Contains(requiredPermissions);
        }
        public UserRolePermissionsDTO AddUserRolesPermissions(string enterpriseId){
            var userNRoles = _bizLogic.TblUser_Query.GetUserNRoles(enterpriseId);
            if (userNRoles == null){
                return new UserRolePermissionsDTO();
            }
            return AddUserRolesPermissions(userNRoles);
        }
        

        public UserRolePermissionsDTO AddUserRolesPermissions(UserNRolesDTO userNRolesDTO){
            
             UserRolePermissionsDTO userRolePermissionsDTO = new UserRolePermissionsDTO();
            userRolePermissionsDTO.Active = userNRolesDTO.Active;

            userRolePermissionsDTO.CanLogin = userNRolesDTO.CanLogin;
            userRolePermissionsDTO.DisplayName = userNRolesDTO.Name;
            // userNRolesDTO = _mapper.Map<UserNRolesDTO>(user);
            // if (userNRolesDTO != null){
            //     var roleIds = _bizLogic.TblUserQuery.GetUserRoleIds(userNRolesDTO.RecId);
            //     userNRolesDTO.Roles = roleIds;

                
                var permissions = new List<string>();

            //     //Roles are from tblParam:
            //     // foreach(int roleId in roleIds){
            //     //     var p = _bizLogic.AspNetRoleClaimsQuery.GetPermissions(roleId);
            //     //     if (p?.Count > 0){
            //     //         permissions.AddRange(p);
            //     //     }
            //     //     //YourEnum foo = (YourEnum)yourInt;
            //     //    // nameof(MyEnum.EnumValue);
            //     //     var roleEnum =  (Roles)roleId;
            //     //     var per = "rol." + roleEnum.ToString(); 
            //     //     permissions.Add(per);   

            //     // }

                // foreach(int roleId in roleIds){
                //     var per = "rol." + roleId; 
                //      permissions.Add(per); 
                // }
                var roleIds = new List<int>();
                foreach(TblUserRole tblUserRole in userNRolesDTO.TblUserRole){
                    var per = "rol." + tblUserRole.RoleId; 
                     permissions.Add(per); 
                     roleIds.Add(tblUserRole.RoleId);
                }


                //menu permissions:
                //todo:
                var componentPermissions = _appCompAndMenuPermissions.GetComponentPermissions(userNRolesDTO.Id, roleIds); 

                var menuPermissions = _appCompAndMenuPermissions.GetMenuPermissions(componentPermissions);
                
                 userRolePermissionsDTO.ComponentPermissions =  componentPermissions;

                 userRolePermissionsDTO.MenuPermissions = menuPermissions;
        
            //     var perms = permissions.Distinct().ToList();
            //     userNRolesDTO.Permissions = perms;
               
            // }
            return userRolePermissionsDTO;            
            
        }

        public UserRolePermissionsDTO UpdateUserRolesPermissions(string enterpriseId){
            RemoveUserRolesPermissions(enterpriseId);
            return AddUserRolesPermissions(enterpriseId);
        }


        public void RemoveUserRolesPermissions(string enterpriseId){
            var userNRoles = _UsersNrolesCached.Where(x => x.EnterpriseId == enterpriseId).FirstOrDefault();
            if (userNRoles != null){
                _UsersNrolesCached.Remove(userNRoles);
            }
        }
        
                
        


    }
}