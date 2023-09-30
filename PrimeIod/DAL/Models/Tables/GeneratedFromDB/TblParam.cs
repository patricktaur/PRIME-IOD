using System;
using System.Collections.Generic;

namespace WebApi.GeneratedFiles
{
    public partial class TblParam
    {
        public TblParam()
        {
            
            TblUserOfficeCountryP = new HashSet<TblUser>();
            TblUserOfficeRegionP = new HashSet<TblUser>();
            TblUserOperatingDivisionP = new HashSet<TblUser>();
            TblUserRoleP = new HashSet<TblUser>();
            
        }

        public int RecId { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public DateTime? DeletedOn { get; set; }
        public int? DeletedById { get; set; }
        public int? ParId { get; set; }
        public string Description { get; set; }
        public bool? CanAdd { get; set; }
        public int? OrderNumber { get; set; }
        public bool? CanVisible { get; set; }
        public string FieldDetail { get; set; }
        public bool? Active { get; set; }
        public DateTime? GeneralDate { get; set; }

       
        public virtual ICollection<TblUser> TblUserOfficeCountryP { get; set; }
        public virtual ICollection<TblUser> TblUserOfficeRegionP { get; set; }
        public virtual ICollection<TblUser> TblUserOperatingDivisionP { get; set; }
        public virtual ICollection<TblUser> TblUserRoleP { get; set; }

        
    }
}
