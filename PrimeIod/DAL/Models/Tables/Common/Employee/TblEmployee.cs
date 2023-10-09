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
            TblFteDemandDetail = new HashSet<TblFteDemandDetail>();
        }

        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }        
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public string Name { get; set; }
        public virtual ICollection<TblFteDemandDetail> TblFteDemandDetail { get; set; }
        //PropertiesBlockEnd
    }
}
