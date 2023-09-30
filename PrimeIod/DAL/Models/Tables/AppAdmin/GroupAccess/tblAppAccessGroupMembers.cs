using System;
using Computations.Enumerators;
namespace DAL.Models
{
    public partial class TblAppAccessGroupMembers
    {
        //PropertiesBlockStart
        public int RecId { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public DateTime? DeletedOn { get; set; }
        public int? DeletedById { get; set; }
        public int GroupId { get; set; }
        public int UserId { get; set; }

        public virtual TblAppAccessGroup Group { get; set; }
        public virtual TblUser User { get; set; }

        //PropertiesBlockEnd
    }
}
