
using BLL.CachedData;
using WebApi.Helpers;
namespace WebApi.Authorization
{
    public class ControllerPermissions
    {
        
       private UserRolesPermissionsCache _UserRolesCache;
       private ControllerActionPermissionsCache _ControllerActionPermissionsCache;

       
        public ControllerPermissions(
             UserRolesPermissionsCache userRolesCache,
             ControllerActionPermissionsCache controllerActionPermissionsCache
            ){
                //  _UserRolesCache = userRolesCache;
                 _ControllerActionPermissionsCache = controllerActionPermissionsCache;
                 
        }
        
        public bool HasPermission(string enterpriseId, string controllerName, string actionName){
            
            
            if (controllerName.ToLower() == "WinAuthorization".ToLower() && actionName.ToLower() == "GetUserNPermissions".ToLower())
            {
                //Loading Permissions
                return true;
            }
            
            var requiredPermission = _ControllerActionPermissionsCache.GetPermissionValue(controllerName, actionName);
            if (requiredPermission == "*"){  //no permission required to access the resource
                return true;
            }
             
            // var hasPermission = _UserRolesCache.HasPermission(enterpriseId, requiredPermission);
            
             var hasPermission = true;
            return hasPermission;
        }


    }
}