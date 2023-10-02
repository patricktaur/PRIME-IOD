
using System.Linq;
using AutoMapper;
using DAL.Models;

namespace DAL.DTOs
{
    public class TblDepartmentMapperProfile : Profile
    {
        public TblDepartmentMapperProfile(){
            CreateMap<TblDepartment, TblDepartmentDTO>();
            
           
        }
        
    }

    

}