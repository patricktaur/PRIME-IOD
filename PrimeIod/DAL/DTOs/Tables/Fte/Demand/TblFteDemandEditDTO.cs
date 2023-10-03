using System;
using Computations.Enumerators;
using System.Collections.Generic;
using DAL.DTOs;
namespace DAL.DTOs
{
    public class TblFteDemandEditDTO   {
        //PropertiesBlockStart
        public TblFteDemandEditDTO()
        {
            TblFteDemandDetailDTO = new HashSet<TblFteDemandDetailDTO>();
        }
        
        public int Id { get; set; }
        
        public int StudyId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public decimal TotalDemandFte { get; set; }
        public decimal TotalAssignedFte { get; set; }
        public decimal TotalActualFte { get; set; }
        
        public virtual ICollection<TblFteDemandDetailDTO> TblFteDemandDetailDTO { get; set; }
        //PropertiesBlockEnd
    }
}