
using AutoMapper;
using DAL.Models;
using WebApi.ViewModels;
namespace WebApi.MapperProfiles
{
    public class TblUserMapperProfile : Profile
    {
        public TblUserMapperProfile(){
            CreateMap<TblUser, TblUserViewModel>().ReverseMap();
        }
    }

    

}