// =============================
// claritytechnologies
// Tallify
// =============================

using AutoMapper;
using DAL.Core;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace WebApi.ViewModels
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ApplicationUser, UserViewModel>()
                   .ForMember(d => d.Roles, map => map.Ignore());
            CreateMap<UserViewModel, ApplicationUser>()
                .ForMember(d => d.Roles, map => map.Ignore());

            CreateMap<ApplicationUser, UserEditViewModel>()
                .ForMember(d => d.Roles, map => map.Ignore());
            CreateMap<UserEditViewModel, ApplicationUser>()
                .ForMember(d => d.Roles, map => map.Ignore());

            CreateMap<ApplicationUser, UserPatchViewModel>()
                .ReverseMap();

            CreateMap<ApplicationRole, RoleViewModel>()
                .ForMember(d => d.Permissions, map => map.MapFrom(s => s.Claims))
                .ForMember(d => d.UsersCount, map => map.MapFrom(s => s.Users != null ? s.Users.Count : 0))
                .ForMember(d => d.Permissions, map => map.Ignore())
                .ReverseMap();
            
            
            CreateMap<RoleViewModel, ApplicationRole>();

            CreateMap<IdentityRoleClaim<string>, ClaimViewModel>()
                .ForMember(d => d.Type, map => map.MapFrom(s => s.ClaimType))
                .ForMember(d => d.Value, map => map.MapFrom(s => s.ClaimValue))
                .ReverseMap();

            // CreateMap<ApplicationPermission, PermissionViewModel>()
            //     .ReverseMap();
                
                // AutoMapper 9 removed Static api 

            // CreateMap<IdentityRoleClaim<string>, PermissionViewModel>()
            //     .ConvertUsing(s => Mapper.Map<PermissionViewModeldel>(ApplicationPermissions.GetPermissionByValue(s.ClaimValue)));            
            
// CreateMap<IdentityRoleClaim<string>, PermissionViewModel>()
//                 .ConvertUsing(
//                     s => Mapper.Map<PermissionViewModel>(ApplicationPermissions.GetPermissionByValue(s.ClaimValue)));              
           
            CreateMap<ApplicationRole, UserRoleViewModel>();
            
        // CreateMap<PrismUserEditViewModel, TblUser>()
        //     .ForMember(d => d.RecId, map => map.MapFrom(s => s.Id))
        //     .ForMember(d => d.DisplayName, map => map.MapFrom(s => s.FullName))
        //     .ForMember(d => d.EmailId, map => map.MapFrom(s => s.Email))
        //     .ForMember(d => d.CanLogin, map => map.MapFrom(s => s.CanLogin))
        //     .ForMember(d => d.Active, map => map.MapFrom(s => s.Active))
        //     .ForMember(d => d.Joiningdate, map => map.MapFrom(s => s.Joiningdate))
        //     .ForMember(d => d.Leavingdate, map => map.MapFrom(s => s.Leavingdate))
        //     .ForMember(d => d.RolePid, map => map.MapFrom(s => s.RolePid))
        //     .ForMember(d => d.OperatingDivisionPid, map => map.MapFrom(s => s.OperatingDivisionPid))
        //     .ForMember(d => d.OfficeRegionPid, map => map.MapFrom(s => s.OfficeRegionPid))
        //     .ForMember(d => d.OfficeCountryPid, map => map.MapFrom(s => s.OfficeCountryPid))
        //     //.ForMember(d => d.Month, map => map.MapFrom(s => s.Month))
        //     .ForMember(d => d.TimeZoneId, map => map.MapFrom(s => s.TimeZoneId))
        // ;
                



        }
    }
}
