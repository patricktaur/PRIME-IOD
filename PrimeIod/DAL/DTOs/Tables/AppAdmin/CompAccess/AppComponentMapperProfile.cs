
using System.Linq;
using AutoMapper;
using DAL.Models;

namespace DAL.DTOs
{
    public class AppComponentMapperProfile : Profile
    {
        public AppComponentMapperProfile(){
            CreateMap<AppComponent, AppComponentDTO>();
            
            CreateMap<AppComponentRoles, AppComponentRolesDTO>();
        }
        
    }

    

}