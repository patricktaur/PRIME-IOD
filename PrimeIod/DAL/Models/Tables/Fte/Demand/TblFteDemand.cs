using System;
using Computations.Enumerators;
using System.Collections.Generic;
using DAL.Models.Interfaces;
namespace DAL.Models
{
    public partial class TblFteDemand : IAuditableEntity
    {
        public TblFteDemand()
        {
            TblFteDemandDetail = new HashSet<TblFteDemandDetail>();
        }

        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public int StudyId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalDemandFte { get; set; }
        public decimal TotalAssignedFte { get; set; }
        public decimal TotalActualFte { get; set; }

        public virtual TblStudy Study { get; set; }
        public virtual ICollection<TblFteDemandDetail> TblFteDemandDetail { get; set; }
    }

    public partial class TblFteDemandDetail: IAuditableEntity
    {
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public int FteDemandId { get; set; }
        public DateTime PeriodStarting { get; set; }
        public decimal? DemandFte { get; set; }
        public decimal? AssignedFte { get; set; }
        public decimal? ActualFte { get; set; }
        public int AssignedEmployeeId { get; set; }

        public virtual TblEmployee AssignedEmployee { get; set; }
        public virtual TblFteDemand FteDemand { get; set; }
    }

}
