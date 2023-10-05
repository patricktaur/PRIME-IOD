using System;
using Computations.Enumerators;
namespace DAL.DTOs
{
    public class TblEmployeeDTO   {
        //PropertiesBlockStart
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }        
        public DateTime UpdatedOn { get; set; }
        public int UpdatedById { get; set; }
        public string Name { get; set; }
        //PropertiesBlockEnd
    }
}