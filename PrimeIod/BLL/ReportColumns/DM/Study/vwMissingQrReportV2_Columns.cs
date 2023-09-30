using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwMissingQrReportV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
                Title = "Missing Quality Review Report",
                    FilterGroup = 17,
                    Columns = new List<UIGridColumn>{
                    new UIGridColumn{field="studyIconNumber",  header ="Study Number" }, 
                    new UIGridColumn{field="sponsor",  header ="Sponsor Name" }, 
                    new UIGridColumn{field="currentDmpmManager",  header ="Director Name" }, 
                    new UIGridColumn{field="currentDmpm",  header ="DMPM Name" }, 
                    new UIGridColumn{field="currentCdl",  header ="CDL Name" }, 

                    new UIGridColumn{field="timeFpiActual",  header ="FPI Actual Date", type="date", format="dd-MMM-yyyy", align="center" },
                    new UIGridColumn{field="studyStatusText",  header ="Study Status" }, 
                } 
                //CodeBlockEnd
            };
        }
    }
}