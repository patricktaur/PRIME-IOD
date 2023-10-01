using System;
using Computations.Enumerators;
namespace DAL.DTOs
{
    public class TblFteDemandDTO   {
        //PropertiesBlockStart
        public int Id { get; set; }
        
        public int StudyId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal DemandFte { get; set; }
        public decimal AssignedFte { get; set; }
        public decimal ActualFte { get; set; }
        //PropertiesBlockEnd
    }
}