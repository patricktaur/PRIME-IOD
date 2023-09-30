using System;
using Computations.Enumerators;
using System.Collections.Generic;
namespace DAL.Models
{
    public partial class TblUser
    {
        //PropertiesBlockStart
        public TblUser()
        {
            TblUserRole = new HashSet<TblUserRole>();
        }

        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public string Name { get; set; }
        public string EnterpriseId { get; set; }
        public string EmployeeId { get; set; }
        public DateTime? HireDate { get; set; }
        public DateTime? Enddate { get; set; }
        public bool Active { get; set; }
        public bool CanLogin { get; set; }
        public string EmailId { get; set; }

        public virtual ICollection<TblUserRole> TblUserRole { get; set; }
        //PropertiesBlockEnd
    }

    public partial class TblRole
    {
        public TblRole()
        {
            TblUserRole = new HashSet<TblUserRole>();
        }

        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public string RoleName { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<TblUserRole> TblUserRole { get; set; }
    }

    public partial class TblUserRole
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }

        public virtual TblRole Role { get; set; }
        public virtual TblUser User { get; set; }
    }


}
