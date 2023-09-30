using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class VwStudyReviewComplianceV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
Title = "Project Review Compliance              ",
FilterGroup = 1,
SortedByFields = "ICON Number",
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, new UIGridColumn{field="studyName",  header ="Study Name" }, new UIGridColumn{field="studyReviewCyclePid",  header ="Review Cycle" }, new UIGridColumn{field="studyReviewNextDueDate",  header ="Planned Review Date", type="date", format="dd-MMM-yyyy", align="center" }, new UIGridColumn{field="studyReviewLastReviewedOn",  header ="Last Review Date", type="date", format="dd-MMM-yyyy", align="center" }, new UIGridColumn{field="studyReviewLastReviewedBy",  header ="Last Reviewed By" }, new UIGridColumn{field="studyReviewIsReviewOverDueYesNo",  header ="Project review Overdue" }, new UIGridColumn{field="studyReviewOverDueDays",  header ="Number of days Overdue" }, new UIGridColumn{field="region",  header ="Region" }, new UIGridColumn{field="portfolio",  header ="Portfolio" }, new UIGridColumn{field="studyStatusText",  header ="Status" }, new UIGridColumn{field="cdms",  header ="CDMS" }, new UIGridColumn{field="currentDmpmManager",  header ="Director" }, new UIGridColumn{field="currentDmpm",  header ="DMPM" }, new UIGridColumn{field="sponsor",  header ="Sponsor" }}
//CodeBlockEnd
            };
        }
    }
}
