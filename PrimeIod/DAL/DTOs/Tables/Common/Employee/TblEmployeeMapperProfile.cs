
using System.Linq;
using AutoMapper;
using DAL.Models;

namespace DAL.DTOs
{
    public class TblEmployeeMapperProfile : Profile
    {
        public TblEmployeeMapperProfile(){
            CreateMap<TblEmployee, TblEmployeeDTO>();
            
           
        }
        
    }

    

}