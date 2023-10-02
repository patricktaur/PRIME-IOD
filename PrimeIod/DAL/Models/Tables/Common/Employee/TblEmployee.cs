﻿using System;
using Computations.Enumerators;
using System.Collections.Generic;
namespace DAL.Models
{
    public partial class TblEmployee
    {
        //PropertiesBlockStart
        public TblEmployee()
        {
            TblFteDemandDetails = new HashSet<TblFteDemandDetails>();
        }

        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }

        public virtual ICollection<TblFteDemandDetails> TblFteDemandDetails { get; set; }
        //PropertiesBlockEnd
    }
}
