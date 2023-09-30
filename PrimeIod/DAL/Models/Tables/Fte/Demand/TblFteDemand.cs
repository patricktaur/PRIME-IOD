using System;
using Computations.Enumerators;
using System.Collections.Generic;
namespace DAL.Models
{
    public partial class TblFteDemand
    {
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public int StudyId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal DemandFte { get; set; }
        public decimal AssignedFte { get; set; }
        public decimal ActualFte { get; set; }
    }

    public partial class TblFteAssignment
    {
        public TblFteAssignment()
        {
            InverseDemand = new HashSet<TblFteAssignment>();
            TblFteTimeSheet = new HashSet<TblFteTimeSheet>();
        }

        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public int DemandId { get; set; }
        public int EmployeeId { get; set; }
        public decimal AssignedFte { get; set; }
        public decimal TimeSheetFte { get; set; }

        public virtual TblFteAssignment Demand { get; set; }
        public virtual TblEmployee Employee { get; set; }
        public virtual ICollection<TblFteAssignment> InverseDemand { get; set; }
        public virtual ICollection<TblFteTimeSheet> TblFteTimeSheet { get; set; }
    }

    public partial class TblFteTimeSheet
    {
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public int FteAssignmentId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal ActualFte { get; set; }

        public virtual TblFteAssignment FteAssignment { get; set; }
    }


}
