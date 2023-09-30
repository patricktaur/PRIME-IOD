using System;
using System.Collections.Generic;
using DAL.Models;

namespace DAL.DTOs
{
    public  class UserRoleDTO
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public int RecId { get; set; }

        public string UserDisplayName { get; set; }

        public string RoleDescription { get; set; }

    }
}
