
using System.Linq;
using AutoMapper;
using DAL.Models;

namespace DAL.DTOs
{
    public class TblFteDemandMapperProfile : Profile
    {
        public TblFteDemandMapperProfile(){
            CreateMap<TblFteDemand, TblFteDemandEditDTO>()
            // .ForMember(dest => dest.TotalDemandFte, opt => opt.MapFrom(src => src.TblFteDemandDetail.Sum(x => x.DemandFte)))    
            // .ForMember(dest => dest.TotalAssignedFte, opt => opt.MapFrom(src => src.TblFteDemandDetail.Sum(x => x.AssignedFte)))
            // .ForMember(dest => dest.TotalActualFte, opt => opt.MapFrom(src => src.TblFteDemandDetail.Sum(x => x.ActualFte)))
             .ForMember(dest => dest.TblFteDemandDetailDTO, opt => opt.MapFrom(src => src.TblFteDemandDetail))
            ;
            
            CreateMap<TblFteDemandDetail, TblFteDemandDetailDTO>()
                 .ForMember(dest => dest.AssignedEmployeeName, opt => opt.MapFrom(src => src.AssignedEmployee.Name))
                // .ForMember(dest => dest.AssignedEmployeeId, opt => opt.MapFrom(src => src.AssignedEmployee.Id))
                ;
        }
        
    }

    

}