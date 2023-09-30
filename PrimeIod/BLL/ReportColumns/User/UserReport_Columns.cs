using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class UserReport_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return new UIGridProperties{
                //CodeBlockStart
                Title = "User Report",
                FilterGroup = 1,
                SortedByFields = "Display Name",
                Columns = new List<UIGridColumn>{
                    new UIGridColumn{field="displayName",  header ="User Name" }, 
                    new UIGridColumn{field="emailId",  header ="Email Id" }, 
                    new UIGridColumn{field="Roles",  header ="roles"  }
                }   
                //CodeBlockEnd
            };
        }
    }
}
