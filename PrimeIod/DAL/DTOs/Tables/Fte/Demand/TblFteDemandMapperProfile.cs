
using System.Linq;
using AutoMapper;
using DAL.Models;

namespace DAL.DTOs
{
    public class TblFteDemandMapperProfile : Profile
    {
        public TblFteDemandMapperProfile(){
            CreateMap<TblFteDemand, TblFteDemandDTO>();
            
           
        }
        
    }

    

}