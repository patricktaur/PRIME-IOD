using System;
using System.Collections.Generic;
using DAL.Models;

namespace DAL.DTOs
{
    public class UserAndRolesDTO
    {
        public int RecId { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedById { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? DeletedOn { get; set; }
        public int? DeletedById { get; set; }
        public string UserLogin { get; set; }
        public string DisplayName { get; set; }

        public DateTime? Joiningdate { get; set; }
        public DateTime? Leavingdate { get; set; }
        public bool? Active { get; set; }
        public int? RolePid { get; set; }
        public bool? CanLogin { get; set; }
        public string TimeZoneId { get; set; }
        public int? OperatingDivisionPid { get; set; }
        public int? OfficeRegionPid { get; set; }
        public int? OfficeCountryPid { get; set; }
        public string EmailId { get; set; }
        public int? SessionTimeOut { get; set; }
        public bool? CanEdit { get; set; }

        public string Month { get; set; }
        public int? Year { get; set; }
        public string EnterpriseId { get; set; }

        public string EmployeeId { get; set; }

        //    public ICollection<TblUserRole> TblUserRole { get; set; }
        public ICollection<UserRoleDTO> Roles { get; set; }


    }
}
