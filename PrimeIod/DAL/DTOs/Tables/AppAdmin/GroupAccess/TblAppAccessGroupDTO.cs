using System;
using Computations.Enumerators;
namespace DAL.DTOs
{
    public class TblAppAccessGroupDTO   {
        //PropertiesBlockStart
        public int RecId { get; set; }
        
        public DateTime UpdatedOn { get; set; }
        
        public string Name { get; set; }

        public bool Active { get; set; } = false;

        //PropertiesBlockEnd
    }
}