using System;
using Computations.Enumerators;
namespace DAL.Models
{
    public partial class AppComponentRoles
    {
        //PropertiesBlockStart
        public int RecId { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public int AppComponentId { get; set; }
        public int RoleId { get; set; }
        public int Mode { get; set; }

        public virtual AppComponent AppComponent { get; set; }
        //PropertiesBlockEnd
    }
}
