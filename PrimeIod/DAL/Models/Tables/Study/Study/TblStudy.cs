using System;
using Computations.Enumerators;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class TblStudy
    {
        //PropertiesBlockStart
        public TblStudy()
        {
            TblFteDemand = new HashSet<TblFteDemand>();
            TblStudyDepartment = new HashSet<TblStudyDepartment>();
        }

        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public string IconStudyNumber { get; set; }

        public virtual ICollection<TblFteDemand> TblFteDemand { get; set; }
        public virtual ICollection<TblStudyDepartment> TblStudyDepartment { get; set; }
        //PropertiesBlockEnd
    }

     public partial class TblStudyDepartment
    {
        public int StudyId { get; set; }
        public int DepartmentId { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }

        public virtual TblDepartment Department { get; set; }
        public virtual TblStudy Study { get; set; }
    }
}
