using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwResourceSummaryReportV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
Title = "Resource Summary Report",
FilterGroup = 1,
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, new UIGridColumn{field="region",  header ="Region" }, new UIGridColumn{field="portfolio",  header ="Portfolio" }, new UIGridColumn{field="specialProject",  header ="Special Project", align="center" }, new UIGridColumn{field="sponsor",  header ="Sponsor" }, new UIGridColumn{field="studyName",  header ="Study Name" }, new UIGridColumn{field="studyStatusText",  header ="Study Status" }, new UIGridColumn{field="startOfDmActivities",  header ="DM Start Date", type="date", format="dd-MMM-yyyy" }, new UIGridColumn{field="cdmsGoLiveText",  header ="CDMS Go-live" }, new UIGridColumn{field="fpiText",  header ="FPI" }, new UIGridColumn{field="mainDBLText",  header ="Main DBL" }, new UIGridColumn{field="followUpDBLText",  header ="Followup DBL" }, new UIGridColumn{field="currentDmpmManager",  header ="Director" }, new UIGridColumn{field="resourceSummaryResourceRole",  header ="DM Role" }, new UIGridColumn{field="resourceSummaryResourceName",  header ="Employee" }, new UIGridColumn{field="studyResourceStartDate",  header ="Start Date", type="date", format="dd-MMM-yyyy", align="center" }, new UIGridColumn{field="studyResourceStopDate",  header ="Stop Date", type="date", format="dd-MMM-yyyy", align="center" }, new UIGridColumn{field="studyResourceIsActiveText",  header ="Active" }, new UIGridColumn{field="resourceSummaryFTEAllocation",  header ="FTE Allocation" }, new UIGridColumn{field="resourceSummaryAssignmentType",  header ="Assignment Type" }, new UIGridColumn{field="resourceSummaryUserRegion",  header ="User Region" }, new UIGridColumn{field="resourceSummaryUserCountry",  header ="User Country" }, new UIGridColumn{field="resourceSummaryLastUpdatedBy",  header ="Last Updated By" }, new UIGridColumn{field="resourceSummaryLastUpdatedOn",  header ="Last Updated On", type="date", format="dd-MMM-yyyy", align="center" }}
//CodeBlockEnd
            };
        }
    }
}

