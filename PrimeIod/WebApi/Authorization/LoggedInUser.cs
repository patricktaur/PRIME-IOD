
using BLL.CachedData;
using WebApi.Helpers;
using Microsoft.Extensions.Configuration;
using DAL.DTOs;
namespace WebApi.Authorization
{
    public class LoggedInUser
    {
        
       private UserRolesPermissionsCache _UserRolesCache;
       
        IConfiguration _config;
       
        public LoggedInUser(
             UserRolesPermissionsCache userRolesCache,
             IConfiguration config
             
            ){
            //  _UserRolesCache = userRolesCache;
            _config = config;
                 
        }
        

        // public int GetLoggedInUserId(string enterpriseId ){
            
        // }
        public UserNRolesDTO GetLoggedInUserDto(string enterpriseId ){
            if (enterpriseId == null || enterpriseId.Trim().Length == 0){
                enterpriseId = GetEnterpriseIdInDevelopment();
            }
            var userDto = _UserRolesCache.GetUserRolesPermissions(enterpriseId);
            if (userDto == null){
                throw new System.Exception("Enterprie Id not detected");
            }
            return userDto;
        }

        public string GetEnterpriseIdInDevelopment(){
            var site = _config["Site"] + "";
            var enterpriseId = "";
            if (site.ToLower() == "devp"){
                 enterpriseId = _config["test-enterpriseId"] + "";
            }
            //returns empty if site is not marked for devp. 
            return enterpriseId;
        }




    }
}