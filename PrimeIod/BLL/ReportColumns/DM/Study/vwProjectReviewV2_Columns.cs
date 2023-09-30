using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwProjectReviewV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
Title = "Project Review Report",
FilterGroup = 5,
SortedByFields = "Icon Number, Review Number",
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="Icon Number" }, 
//CodeBlockEnd
            };
        }
    }
}