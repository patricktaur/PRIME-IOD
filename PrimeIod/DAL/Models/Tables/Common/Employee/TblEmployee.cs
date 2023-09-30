using System;
using Computations.Enumerators;
using System.Collections.Generic;
namespace DAL.Models
{
    public partial class TblEmployee
    {
        //PropertiesBlockStart
        public TblEmployee()
        {
            TblFteAssignment = new HashSet<TblFteAssignment>();
        }

        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }

        public virtual ICollection<TblFteAssignment> TblFteAssignment { get; set; }
        //PropertiesBlockEnd
    }
}
