
using System.Linq;
using AutoMapper;
using DAL.Models;

namespace DAL.DTOs
{
    public class TblUserMapperProfile : Profile
    {
        public TblUserMapperProfile(){
            CreateMap<TblUser, TblUserDTO>();

            CreateMap<TblUser, UserNRolesDTO>();
            // .ForMember(dest => dest.TblUserRole, opt => opt.MapFrom(src => src.TblUserRole.Select(x => x.Role)));
                
            
           
        }
        
    }

    

}