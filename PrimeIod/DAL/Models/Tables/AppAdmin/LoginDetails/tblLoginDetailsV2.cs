using System;
using Computations.Enumerators;
namespace DAL.Models
{
    public partial class tblLoginDetailsV2
    {
        //PropertiesBlockStart
         public int RecId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string EnterpriseId { get; set; }
        public string UserName { get; set; }
        public bool BlnSuccessfull { get; set; }
        public string RequestMethod { get; set; }
        public int? ServerPort { get; set; }
        public string Https { get; set; }
        public string LocalAddr { get; set; }
        public string HostAddress { get; set; }
        public string UserAgent { get; set; }
        public string Url { get; set; }
        public int? IgnoreSetByUsrId { get; set; }
        public int? RoleId { get; set; }
        //PropertiesBlockEnd
    }
}
