// =============================
// claritytechnologies
// Tallify
// =============================

using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using DAL.Models.Interfaces;

namespace DAL.Models
{
    public class AuditableEntity : IAuditableEntity
    {
        // [MaxLength(256)]
        // public string CreatedById { get; set; }
        // [MaxLength(256)]
        // public string UpdatedBy { get; set; }
        // public DateTime UpdatedOn { get; set; }
        // public DateTime CreatedOn { get; set; }


        public int CreatedById { get; set; }
        public int UpdatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
