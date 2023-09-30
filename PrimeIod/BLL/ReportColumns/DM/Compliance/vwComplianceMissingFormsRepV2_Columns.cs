using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwComplianceMissingFormsRepV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
                Title = "Missing Forms",
                FilterGroup = 6,
                SortedByFields = "ICON Number",
                Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
                new UIGridColumn{field="region",  header ="Region" }, 
                new UIGridColumn{field="portfolio",  header ="Portfolio" }, 
                new UIGridColumn{field="sponsor",  header ="Sponsor" }, 
                new UIGridColumn{field="studyName",  header ="Study Name" }, 
                new UIGridColumn{field="currentDmpmManager",  header ="Director" }, 
                new UIGridColumn{field="currentDmpm",  header ="DMPM" }, 
                new UIGridColumn{field="emptyForms",  header ="List of Missing Forms" } 
                }
                //CodeBlockEnd
            };
        }
    }
}