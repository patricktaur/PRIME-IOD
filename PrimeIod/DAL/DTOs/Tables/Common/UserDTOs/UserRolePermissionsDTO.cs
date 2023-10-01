
using System.Collections.Generic;
namespace DAL.DTOs
{
    public class UserRolePermissionsDTO
    {
        
        public UserRolePermissionsDTO(){
            Roles = new List<int>();
            ResourceRoles = new List<int>();
            Permissions = new List<string>();
            ComponentPermissions = new List<ComponentPermission>();
            
            MenuPermissions = new List<MenuPermission>();
        }
        public int Id { get; set; }
        public string UserLogin { get; set; }
        public string DisplayName { get; set; }
        public bool? Active { get; set; }
        public bool? CanLogin { get; set; }
        
        public string EmailId { get; set; }
        public string EnterpriseId { get; set; }

        public string Message { get; set; }
        public List<int> Roles { get; set; } 

        public List<int> ResourceRoles { get; set; } 
         public List<string> Permissions { get; set; } 

        // public List<MenuAppComponentPermission> ComponentPermissions  { get; set; } 
        public List<ComponentPermission> ComponentPermissions  { get; set; } 
        public List<MenuPermission> MenuPermissions  { get; set; } 

         public int UserId {
             get {
                 return Id;
             }
        }
        

    }
}