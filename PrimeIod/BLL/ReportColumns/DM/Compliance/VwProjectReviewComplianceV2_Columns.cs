using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class VwProjectReviewComplianceV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
Title = "Project Review Compliance              ",
FilterGroup = 1,
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, new UIGridColumn{field="studyName",  header ="Study Name", width=20 }, new UIGridColumn{field="studyReviewCycle",  header ="Review Cycle" }, new UIGridColumn{field="studyReviewNextCycleDueOn",  header ="Planned Review Date", type="date", format="dd-MMM-yyyy", align="center" }, new UIGridColumn{field="region",  header ="Region", width=20 }, new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, new UIGridColumn{field="studyStatusText",  header ="Status" }, new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, new UIGridColumn{field="currentDmpmManager",  header ="Director", width=20 }, new UIGridColumn{field="currentDmpm",  header ="DMPM", width=20 }, new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }}
//CodeBlockEnd
            };
        }
    }
}
