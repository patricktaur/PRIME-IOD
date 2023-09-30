using System.Linq;
using System.Collections.Generic;
using AutoMapper;
using DAL.Models;

namespace DAL.DTOs
{
    public class UserDTOMapperProfile : Profile
    {
        public UserDTOMapperProfile(){
        //     CreateMap<TblUser, UserListDTO>().ReverseMap();
        //     CreateMap<TblUser, UserNRolesDTO>();
        //     CreateMap<TblUser, UserViewDTO>();
        //     CreateMap<TblUser, UserDetailsDTO>()
        //     .ForMember(d => d.Roles, opt => opt.MapFrom(src => src.TblUserRole.Select(ur => ur.Role.Description).ToList()));
            
            
        //     CreateMap<TblUser, UserAndRolesDTO>()
        //     .ForMember(d => d.Roles,
        //     opt => opt.MapFrom(
        //         src => src.TblUserRole
        //     )
            
        //     )
        //     ;
        //    CreateMap<TblUserRole, UserRoleDTO>();


            

        }
        
    }

    

}