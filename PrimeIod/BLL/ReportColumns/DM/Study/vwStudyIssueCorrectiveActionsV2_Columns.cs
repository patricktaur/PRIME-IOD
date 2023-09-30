using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwStudyIssueCorrectiveActionsV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "Project Issue Tracker",
FilterGroup = 1,
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="Icon Number" }, 
new UIGridColumn{field="region",  header ="Region", width=20, hide=true }, 
new UIGridColumn{field="portfolio",  header ="Portfolio", width=20, hide=true }, 
new UIGridColumn{field="sponsor",  header ="Sponsor", width=20, hide=true }, 
new UIGridColumn{field="studyName",  header ="Study Name", width=20 }, 
new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, 
new UIGridColumn{field="currentDmpm",  header ="DMPM", width=20 }, 
new UIGridColumn{field="currentDmpmManager",  header ="DMPM Manager", width=20 }, 
new UIGridColumn{field="issueCategory",  header ="Issue Category" }, 
new UIGridColumn{field="issueDescription",  header ="Issue Description" }, 
new UIGridColumn{field="issueCorrectiveActionPlanned",  header ="Planned Correction Action (CA)" }, 
new UIGridColumn{field="issueTargetDate",  header ="Target Date for CA" }, 
new UIGridColumn{field="issueStatus",  header ="Status After CA" }}
//CodeBlockEnd
            };
        }
    }
}
