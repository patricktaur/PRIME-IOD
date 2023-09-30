
using System.Linq;
using AutoMapper;
using DAL.Models;

namespace DAL.DTOs
{
    public class tblAppAccessGroupMembersMapperProfile : Profile
    {
        public tblAppAccessGroupMembersMapperProfile(){
            CreateMap<TblAppAccessGroupMembers, tblAppAccessGroupMembersDTO>();
            
            // CreateMap<TblAppAccessGroupMembers, FilterItem>()
            // .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.RecId))
            // .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.User.DisplayName));
  
           
        }
        
    }

    

}