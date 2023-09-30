using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class VwStudySummaryV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "Summary",
FilterGroup = 1,
SortedByFields = "ICON Number",
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
new UIGridColumn{field="region",  header ="Region" }, 
new UIGridColumn{field="portfolio",  header ="Portfolio"  }, 
new UIGridColumn{field="specialProject",  header ="Special Project", align="center" }, 
new UIGridColumn{field="sponsor",  header ="Sponsor" }, 
new UIGridColumn{field="studyName",  header ="Study Name", width=30 }, 
new UIGridColumn{field="studyStatusText",  header ="Study Status"  }, 
new UIGridColumn{field="cdms",  header ="CDMS"  }, 
new UIGridColumn{field="overallProjectScore",  header ="Overall Project Score" }, 
new UIGridColumn{field="startOfDmActivities",  header ="DM Start Date", type="date", format="dd-MMM-yyyy" }, 
new UIGridColumn{field="cdmsGoLiveText",  header ="CDMS Go-live" }, 
new UIGridColumn{field="fpiText",  header ="FPI" }, 
new UIGridColumn{field="mainDBLText",  header ="Main DBL" }, 
new UIGridColumn{field="followUpDBLText",  header ="FollowUp DBL" }, 
new UIGridColumn{field="currentDmpmManager",  header ="DIR" , width=30 }, 
new UIGridColumn{field="dmOversightDerived",  header ="DM Oversight", width=30 }, 
new UIGridColumn{field="currentDmpm",  header ="DMPM" , width=30 }, 
new UIGridColumn{field="currentCDL",  header ="CDL", width=30 }, 
new UIGridColumn{field="currentCDMSLead",  header ="CDMS Lead", width=30 }, 
new UIGridColumn{field="clinicalDataDeliveryLead",  header ="CDPL - Clinical Data Programming", width=30 }, 
new UIGridColumn{field="sdtmLead",  header ="CDPL SDTM Programming", width=30 }, 
new UIGridColumn{field="protocolPhase",  header ="Protocol Phase", width=30 }, 
new UIGridColumn{field="therapeuticArea",  header ="Therapeutic Area", width=30 }, 
new UIGridColumn{field="indication",  header ="Indication", width=30 }, 
new UIGridColumn{field="revisedRandomisedSubjectsExpected",  header ="Revised Randomised Subjects Expected", align="right" }, 
new UIGridColumn{field="actualRandomisedSubjects",  header ="Actual Randomised Subjects", align="right" }, 
new UIGridColumn{field="terminatedRandomisedSubjects",  header ="Terminated Randomided Subjects", align="right" }, 
new UIGridColumn{field="actualPagesProcessed",  header ="Actual Pages Processed", align="right" }, 
new UIGridColumn{field="splitGoLiveText",  header ="Split-Go-Live", align="center" }, 
new UIGridColumn{field="dmpmrequired",  header ="DMPM Required", align="center" }, 
new UIGridColumn{field="builddonebyIconPid",  header ="Database Build by ICON", align="center" }, 
new UIGridColumn{field="studyType",  header ="Study Type"  }}
//CodeBlockEnd
            };
        }
    }
}
