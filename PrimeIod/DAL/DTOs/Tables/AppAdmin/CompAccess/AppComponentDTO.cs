using System;
using Computations.Enumerators;
namespace DAL.DTOs
{
    public class AppComponentDTO   {
        //PropertiesBlockStart
        public string Title { get; set; }
        public string CompCode { get; set; }
        public int AppComponentRolesRoleId { get; set; }
        public int AppComponentRolesMode { get; set; }

        //PropertiesBlockEnd
    }
}