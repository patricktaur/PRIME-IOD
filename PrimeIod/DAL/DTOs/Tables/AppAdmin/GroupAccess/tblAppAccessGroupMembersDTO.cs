using System;
using Computations.Enumerators;
namespace DAL.DTOs
{
    //Not in use?
    public class tblAppAccessGroupMembersDTO   {
        //PropertiesBlockStart
    
        public string UserDisplayName { get; set; }
         public int UserRecId { get; set; }
        public string GroupName { get; set; }
        public int GroupRecId { get; set; }
        public bool GroupActive { get; set; }

        //PropertiesBlockEnd
    }
}