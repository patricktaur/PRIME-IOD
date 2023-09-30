
using System.Collections.Generic;
namespace DAL.DTOs
{
    public class ControllerActionPermissionDTO
    {
        
        public ControllerActionPermissionDTO(){
            ActionPermissions = new List<ActionPermissionsDTO>();
        }
        public string ControllerName { get; set; }
        
        public List<ActionPermissionsDTO> ActionPermissions { get; set; }
        
        
    }
}