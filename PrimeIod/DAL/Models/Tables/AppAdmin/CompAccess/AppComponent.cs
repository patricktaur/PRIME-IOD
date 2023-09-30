using System;
using System.Collections.Generic;
using Computations.Enumerators;
namespace DAL.Models
{
    public partial class AppComponent
    {
        //PropertiesBlockStart
        public AppComponent()
        {
            AppComponentRoles = new HashSet<AppComponentRoles>();
        }

        public int RecId { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CompCode { get; set; }

        public virtual ICollection<AppComponentRoles> AppComponentRoles { get; set; }
        //PropertiesBlockEnd
    }
}
