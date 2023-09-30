using System;
using Computations.Enumerators;
using System.Collections.Generic;
using DAL.Models;
namespace DAL.DTOs
{
    public class UserPermissionsDTO   {
        //PropertiesBlockStart
        public int Id { get; set; }
        public string Name { get; set; }
        public string EnterpriseId { get; set; }
        public string EmployeeId { get; set; }
        public bool Active { get; set; }
        public bool CanLogin { get; set; }

        public virtual ICollection<TblUserRole> TblUserRole { get; set; }

        //PropertiesBlockEnd
    }
}