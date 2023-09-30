namespace DAL.DTOs
{
    public class StudyFilters : FilterBase
    {
        
        public string IconNumberOrName { get; set; }
        public string Sort { get; set; }  //asc / desc
        public string[] Region { get; set; }
         public string[] Portfolio { get; set; }
         public string[] Sponsor { get; set; }
        public string[] Cdms { get; set; }
       
        public string[] Dmpm { get; set; }
        public string[] DmpmManager { get; set; }
        public int[] Status { get; set; }
        public int[] SpecialProject { get; set; }

        public string[] StudyType { get; set; }

        public int[] Resource { get; set; }
        public string[] cdaCm { get; set; }
        public string[] clinicalRiskManager { get; set; }
        public string[] centeralMonitoringStatus { get; set; }


    }
}

