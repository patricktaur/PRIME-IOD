using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwProjectIssueTrackerV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
Title = "Project Issue Tracker",
FilterGroup = 1,
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="Icon Number" }, new UIGridColumn{field="region",  header ="Region" }, new UIGridColumn{field="portfolio",  header ="Portfolio" }, new UIGridColumn{field="sponsor",  header ="Sponsor" }, new UIGridColumn{field="studyName",  header ="Study Name" }, new UIGridColumn{field="cdms",  header ="CDMS" }, new UIGridColumn{field="studyCurrentReviewDMPM",  header ="DMPM" }, new UIGridColumn{field="studyCurrentReviewDMPMManager",  header ="DMPM Manager" }, new UIGridColumn{field="issueCategory",  header ="Issue Category" }, new UIGridColumn{field="issueDescription",  header ="Issue Description" }, new UIGridColumn{field="correctiveActionPlanned",  header ="Planned Correction Action (CA)" }, new UIGridColumn{field="targetDate",  header ="Target Date for CA", type="date", format="dd-MMM-yyyy" }, new UIGridColumn{field="studyIssueTrackerStatus",  header ="Status After CA" }}
//CodeBlockEnd
            };
        }
    }
}


