using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwFTEResourceV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
Title = "FTE Resource Report",
FilterGroup = 1,
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, new UIGridColumn{field="region",  header ="Region" }, new UIGridColumn{field="portfolio",  header ="Portfolio" }, new UIGridColumn{field="specialProject",  header ="Special Project", align="center" }, new UIGridColumn{field="sponsor",  header ="Sponsor" }, new UIGridColumn{field="studyName",  header ="Study Name" }, new UIGridColumn{field="studyStatusText",  header ="Status" }, new UIGridColumn{field="cdms",  header ="CDMS" }, new UIGridColumn{field="overallProjectScore",  header ="Overall Project Score" }, new UIGridColumn{field="startOfDmActivitiesText",  header ="DM Start Date" }, new UIGridColumn{field="cdmsGoLiveText",  header ="CDMS Golive" }, new UIGridColumn{field="fpiText",  header ="FPI" }, new UIGridColumn{field="mainDBLText",  header ="Main DBL" }, new UIGridColumn{field="followUpDBLText",  header ="Follow Up DBL" }, new UIGridColumn{field="currentDmpmManager",  header ="Director" }, new UIGridColumn{field="currentDmoversight",  header ="DM Oversight" }, new UIGridColumn{field="currentDmpm",  header ="DMPM" }, new UIGridColumn{field="currentCdl",  header ="CDL" }, new UIGridColumn{field="reviewType",  header ="Review Type" }, new UIGridColumn{field="currentDateEntered",  header ="Date Entered", type="date", format="dd-MMM-yyyy", align="Center" }, new UIGridColumn{field="currentEnteredBy",  header ="Entered By" }, new UIGridColumn{field="currentDmpmfte",  header ="DMPM FTE" }, new UIGridColumn{field="currentCdlfte",  header ="CDL FTE" }, new UIGridColumn{field="currentCdcfte",  header ="CDC FTE" }, new UIGridColumn{field="currentProgrammerFte",  header ="PROG FTE" }, new UIGridColumn{field="currentTotalFte",  header ="TOTAL FTE" }, new UIGridColumn{field="previousDateEntered",  header ="Previous Date Entered", type="date", format="dd-MMM-yyyy", align="Center" }, new UIGridColumn{field="previousDmpmfte",  header ="Previous DMPM FTE" }, new UIGridColumn{field="previousCdlfte",  header ="Previous CDL FTE" }, new UIGridColumn{field="previousCdcfte",  header ="Previous CDC FTE" }, new UIGridColumn{field="previousProgrammerFte",  header ="Previous PROG FTE" }, new UIGridColumn{field="previousTotalFte",  header ="Previous Total FTE" }, new UIGridColumn{field="currentDeltaFte",  header ="Delta FTE" }, new UIGridColumn{field="avg6Dmpm",  header ="DMPM 6 Months" }, new UIGridColumn{field="avg3Dmpm",  header ="DMPM 3 Months" }, new UIGridColumn{field="avg1Dmpm",  header ="DMPM 1 Months" }, new UIGridColumn{field="avg6Cdl",  header ="CDL 6 Months" }, new UIGridColumn{field="avg3Cdl",  header ="CDL 3 Months" }, new UIGridColumn{field="avg1Cdl",  header ="CDL 1 Months" }, new UIGridColumn{field="avg6Cdc",  header ="CDC 6 Months" }, new UIGridColumn{field="avg3Cdc",  header ="CDC 3 Months" }, new UIGridColumn{field="avg1Cdc",  header ="CDC 1 Months" }, new UIGridColumn{field="avg6Programmer",  header ="PROG 6 Months" }, new UIGridColumn{field="avg3Programmer",  header ="PROG 3 Months" }, new UIGridColumn{field="avg1Programmer",  header ="PROG 1 Months" }}
//CodeBlockEnd
            };
        }
    }
}
