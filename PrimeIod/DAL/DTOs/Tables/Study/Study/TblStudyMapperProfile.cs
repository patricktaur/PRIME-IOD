
using System.Linq;
using AutoMapper;
using DAL.Models;

namespace DAL.DTOs
{
    public class TblStudyMapperProfile : Profile
    {
        public TblStudyMapperProfile(){
            CreateMap<TblStudy, TblStudyListDTO>();
            
           
        }
        
    }

    

}