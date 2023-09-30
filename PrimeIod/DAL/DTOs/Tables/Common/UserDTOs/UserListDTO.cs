using System;
using Computations.Enumerators;

namespace DAL.DTOs
{
    public class UserListDTO 
    {

        public int RecId { get; set; }
        public string UserLogin { get; set; }
        public string DisplayName { get; set; }
        public DateTime? Joiningdate { get; set; }
        public DateTime? Leavingdate { get; set; }
        public bool? Active { get; set; }
        public bool? CanLogin { get; set; }
        // public int? OperatingDivisionPid { get; set; }
        public string EmailId { get; set; }
        public string EnterpriseId { get; set; }

        public string EmployeeId { get; set; }

        public int? OperatingDivisionPid { get; set; }


        public int? OfficeRegionPid { get; set; }
        public int? OfficeCountryPid { get; set; }

        public string OfficeCountryDescription { get; set; }
        public string OfficeRegionDescription { get; set; }
        public string OperatingDivisionDescription { get; set; }

    }
}