using System;
using Computations.Enumerators;
using System.Collections.Generic;
namespace DAL.Models
{
    public partial class TblDepartment
    {
        //PropertiesBlockStart
        public TblDepartment()
        {
            TblStudyDepartment = new HashSet<TblStudyDepartment>();
        }

        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TblStudyDepartment> TblStudyDepartment { get; set; }
        //PropertiesBlockEnd
    }
}
