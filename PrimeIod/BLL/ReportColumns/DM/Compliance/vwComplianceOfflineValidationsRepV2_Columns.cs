using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwComplianceOfflineValidationsRepV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
                
                Title = "Report Offline Mandatory Checks",
                FilterGroup = 6,
                SortedByFields = "ICON Number",
                Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
                new UIGridColumn{field="region",  header ="Region" }, 
                new UIGridColumn{field="portfolio",  header ="Portfolio" }, 
                new UIGridColumn{field="sponsor",  header ="Sponsor" }, 
                new UIGridColumn{field="studyName",  header ="Study Name" }, 
                new UIGridColumn{field="currentDmpmManager",  header ="Director" }, 
                new UIGridColumn{field="currentDmpm",  header ="DMPM" }, 
                new UIGridColumn{field="formName",  header ="Form Name" } ,
                new UIGridColumn{field="logic",  header ="Logic" } ,
                new UIGridColumn{field="message",  header ="Message" } 
                }
                //CodeBlockEnd
            };
        }
    }
}