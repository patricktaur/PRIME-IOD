using System.Collections.Generic;
namespace DAL.DTOs {
    public class UserDTO {
        public int RecId { get; set; }
        public string DisplayName { get; set; }
        public string EmailId { get; set; }
        public string RolesString { get; set; }
        public List<RoleDTO> Roles { get; set; }
    }

    public class RoleDTO {
        public int RecId { get; set; }
        public string Name { get; set; }
    }
}