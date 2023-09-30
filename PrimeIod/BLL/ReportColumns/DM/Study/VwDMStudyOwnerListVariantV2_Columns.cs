using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class VwDMStudyOwnerListVariantV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "DM Study Owner List - Variant",
FilterGroup = 4,
SortedByFields = "ICON Number",
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
new UIGridColumn{field="sponsor",  header ="Sponsor" }, 
new UIGridColumn{field="studyName",  header ="Study Name" }, 
new UIGridColumn{field="cdms",  header ="CDMS" }, 
new UIGridColumn{field="studyStatusText",  header ="Study Status" }, 
new UIGridColumn{field="specialProject",  header ="Special Project", align="center" }, 
new UIGridColumn{field="studyResourceName",  header ="Resource Name" }, 
new UIGridColumn{field="studyResourceEmail",  header ="Resource Email" }, 
new UIGridColumn{field="studyResourceRole",  header ="Resource Role" }}
//CodeBlockEnd
            };
        }
    }
}
