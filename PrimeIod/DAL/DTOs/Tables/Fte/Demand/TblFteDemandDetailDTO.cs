using System;
using Computations.Enumerators;
using DAL.Models;
namespace DAL.DTOs
{
    public class TblFteDemandDetailDTO   {
        //PropertiesBlockStart
        public int Id { get; set; }
        
        public int FteDemandId { get; set; }
        public DateTime PeriodStarting { get; set; }
        public decimal? DemandFte { get; set; }
        public decimal? AssignedFte { get; set; }
        public decimal? ActualFte { get; set; }
        // public int AssignedEmployeeId { get; set; }

        //  public string AssignedEmployeeName { get; set; }
        
        
        
        //PropertiesBlockEnd
    }
}