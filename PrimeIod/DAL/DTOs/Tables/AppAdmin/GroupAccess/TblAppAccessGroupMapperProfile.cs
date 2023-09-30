
using System.Linq;
using AutoMapper;
using DAL.Models;

namespace DAL.DTOs
{
    public class TblAppAccessGroupMapperProfile : Profile
    {
        public TblAppAccessGroupMapperProfile(){
            CreateMap<TblAppAccessGroup, TblAppAccessGroupDTO>();
            
           
        }
        
    }

    

}