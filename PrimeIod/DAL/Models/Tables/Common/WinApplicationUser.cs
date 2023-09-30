using System.Collections.Generic;
namespace DAL.Models
{
    public class WinApplicationUser : ApplicationUser
    {
        public WinApplicationUser(){
           AppRoles =  new List<string>();
            
        }
        public virtual IList<string> AppRoles { get; set; }
    }
}
