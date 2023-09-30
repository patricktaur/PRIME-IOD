// =============================
// claritytechnologies
// Tallify
// =============================

using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models.Interfaces
{
    public interface IAuditableEntity
    {
        int CreatedById { get; set; }
        int UpdatedById { get; set; }
        DateTime CreatedOn { get; set; }
        DateTime UpdatedOn { get; set; }

        // string CreatedBy { get; set; }
        // string UpdatedBy { get; set; }
        // DateTime CreatedDate { get; set; }
        // DateTime UpdatedDate { get; set; }
    }
}
