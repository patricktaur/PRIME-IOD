using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwStudyDBLSummaryV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "Report Study DBL Summary",
FilterGroup = 8,
SortedByFields = "ICON Number",
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
new UIGridColumn{field="region",  header ="Region" }, 
new UIGridColumn{field="portfolio",  header ="Portfolio" }, 
new UIGridColumn{field="sponsor",  header ="Sponsor" }, 
new UIGridColumn{field="studyName",  header ="Study" }, 
new UIGridColumn{field="cpmName",  header ="CPM NAME" }, 
new UIGridColumn{field="currentDmpmManager",  header ="DIR" }, 
new UIGridColumn{field="currentDmpm",  header ="DMPM" }, 
new UIGridColumn{field="currentCdl",  header ="CDL" }, 
new UIGridColumn{field="studyStatusText",  header ="Study Status" }, 
new UIGridColumn{field="cdms",  header ="CDMS" }, 
new UIGridColumn{field="eDCYorN",  header ="EDC Y/N" }, 
new UIGridColumn{field="therapeuticArea",  header ="Therapeutic Area" }, 
new UIGridColumn{field="indication",  header ="Indication" }, 
new UIGridColumn{field="protocolPhase",  header ="Protocol Phase" }, 
new UIGridColumn{field="dmstandalonePid",  header ="DM Stand Alone", align="center" }, 
new UIGridColumn{field="mainOrFollowup",  header ="Type of DBL(Main/FU)" }, // mainrFudbltype
new UIGridColumn{field="plannedOrActual",  header ="Planned/Actual" }, 
new UIGridColumn{field="dblStudySummaryLpoPlanned",  header ="LPO Planned", type="date", format="dd-MMM-yyyy", align="Center" }, 
new UIGridColumn{field="dblStudySummaryLpoActual",  header ="LPO Actual", type="date", format="dd-MMM-yyyy", align="Center" }, 
new UIGridColumn{field="dblStudySummaryMainDblPlanned",  header ="DBL Planned", type="date", format="dd-MMM-yyyy", align="Center" }, 
new UIGridColumn{field="dblStudySummaryMainDblActual",  header ="DBL Actual", type="date", format="dd-MMM-yyyy", align="Center" }, 
new UIGridColumn{field="lPOToDBL",  header ="LPO_to_DBL" }, 
new UIGridColumn{field="passOrFail",  header ="Pass/Fail" }, 
new UIGridColumn{field="mainrFujustification",  header ="Comment if LPO to DBL greater than 21 days (provide rationale)" }, 
new UIGridColumn{field="mainrFusoftlockCheckText",  header ="Use SoftLock date instead of Hardlock date" }, 
new UIGridColumn{field="mainrFusoftlockReason",  header ="Specify the reason" }, 
new UIGridColumn{field="specialProject",  header ="Special Project", align="center" }}
//CodeBlockEnd
            };
        }
    }
}
