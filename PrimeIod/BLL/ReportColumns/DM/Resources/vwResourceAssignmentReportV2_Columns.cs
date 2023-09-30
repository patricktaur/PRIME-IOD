using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwResourceAssignmentReportV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
Title = "Resource Assignment Report",
FilterGroup = 1,
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, new UIGridColumn{field="resourceAssignmentRole",  header ="DM Role" }, new UIGridColumn{field="resourceAssignmentUserName",  header ="Employee Name" }, new UIGridColumn{field="studyResourceIsActiveText",  header ="Active" }, new UIGridColumn{field="studyResourceStartDate",  header ="Start Role Date", type="date", format="dd-MMM-yyyy", align="center" }, new UIGridColumn{field="studyResourceStopDate",  header ="End Role Date", type="date", format="dd-MMM-yyyy", align="center" }, new UIGridColumn{field="region",  header ="Region", width=20 }, new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, new UIGridColumn{field="studyName",  header ="Study Name", width=20 }, new UIGridColumn{field="startOfDmActivities",  header ="DM Start Date" }, new UIGridColumn{field="cDMSGoLiveText",  header ="CDMS Go-live" }, new UIGridColumn{field="fpiText",  header ="FPI" }, new UIGridColumn{field="mainDBLText",  header ="Main DBL" }, new UIGridColumn{field="followUpDBLText",  header ="FollowUp DBL" }, new UIGridColumn{field="studyStatusText",  header ="Study Status" }, new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, new UIGridColumn{field="protocolPhasePid",  header ="Protocol Phase", align="center" }, new UIGridColumn{field="therapeuticArea",  header ="Therapeutic Indication", width=20 }, new UIGridColumn{field="indication",  header ="Indication", width=20 }}
//CodeBlockEnd
            };
        }
    }
}



