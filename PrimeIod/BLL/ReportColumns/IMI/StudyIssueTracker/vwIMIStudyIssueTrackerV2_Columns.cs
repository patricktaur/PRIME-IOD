using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwIMIStudyIssueTrackerV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
                Title = "IMI Project Review Issue Tracker",
                FilterGroup = 15,
                Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
                new UIGridColumn{field="studyName",  header ="Protocol Name", width=20 }, 
                new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, 
                new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
                new UIGridColumn{field="studyStatus",  header ="Study Status" } ,
                new UIGridColumn{field="imiCurrentPm",  header ="IMI PM", width=20 } ,
                new UIGridColumn{field="imiCurrentPmPd",  header ="IMI PD", width=20 } ,

                new UIGridColumn{field="issueCategory",  header ="Issue Category" } ,
                new UIGridColumn{field="issueDescription",  header ="Issue Description" } ,
                new UIGridColumn{field="correctiveActionPlanned",  header ="Planned Corrective Action (CA)" } ,
                new UIGridColumn{field="targetDateForCa",  header ="Target Date for CA", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="statusafterCa",  header ="Status After CA" } ,

                
                
                }
                //CodeBlockEnd
            };
        }
    }
}