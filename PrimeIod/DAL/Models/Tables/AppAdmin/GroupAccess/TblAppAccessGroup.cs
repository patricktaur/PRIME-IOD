using System;
using Computations.Enumerators;
using System.Collections.Generic;
using DAL.Models.Interfaces;
namespace DAL.Models
{
    public partial class TblAppAccessGroup : IAuditableEntity
    {
        //PropertiesBlockStart
        public TblAppAccessGroup()
        {
            TblAppAccessGroupMembers = new HashSet<TblAppAccessGroupMembers>();
        }

        public int RecId { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public DateTime? DeletedOn { get; set; }
        public int? DeletedById { get; set; }
        public string Name { get; set; }

        public bool Active { get; set; } = false;

        public virtual ICollection<TblAppAccessGroupMembers> TblAppAccessGroupMembers { get; set; }
   
        //PropertiesBlockEnd
    }
}
