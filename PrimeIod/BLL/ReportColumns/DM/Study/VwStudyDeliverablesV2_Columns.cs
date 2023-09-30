using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class VwStudyDeliverablesV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "Deliverables",
FilterGroup = 1,
SortedByFields = "ICON Number, Deliverable Date, Deliverable Type",
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
new UIGridColumn{field="deliverableDate",  header ="Deliverable Date", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="deliverableType",  header ="Deliverable Type" }, 
new UIGridColumn{field="deliverableName",  header ="Deliverable Name", width=30  }, 
new UIGridColumn{field="deliverableOutcome",  header ="Outcome" }, 
new UIGridColumn{field="deliverableComment",  header ="Comment", width=30  }, 
new UIGridColumn{field="region",  header ="Region" }, 
new UIGridColumn{field="portfolio",  header ="Portfolio" }, 
new UIGridColumn{field="sponsor",  header ="Sponsor" }, 
new UIGridColumn{field="studyName",  header ="Study Name", width=30  }, 
new UIGridColumn{field="dataBaseBuildComplexityFactor",  header ="Build", type="number", align="center" }, 
new UIGridColumn{field="buildRiskScore",  header ="Build RiskScore", type="number", format="1.2-2", align="center" }, 
new UIGridColumn{field="tEnCComplexityFactor",  header ="TE&C CF", type="number", align="center" }, 
new UIGridColumn{field="tenCriskScore",  header ="TE&C RiskScore", type="number", format="1.2-2", align="center" }, 
new UIGridColumn{field="cdms",  header ="CDMS" }, 
new UIGridColumn{field="studyStatusText",  header ="Study_Status" }, 
new UIGridColumn{field="protocolPhase",  header ="Protocol Phase", width=30  }, 
new UIGridColumn{field="therapeuticArea",  header ="Therapeutic Area", width=30  }, 
new UIGridColumn{field="indication",  header ="Indication", width=30  }, 
new UIGridColumn{field="fpiText",  header ="FPI" }, 
new UIGridColumn{field="mainDBLText",  header ="Main DBL" }, 
new UIGridColumn{field="followUpDBLText",  header ="FollowUp DBL" }, 
new UIGridColumn{field="currentDmpmManager",  header ="DIR", width=30 }, 
new UIGridColumn{field="currentDmpm",  header ="DMPM", width=30 }, 
new UIGridColumn{field="currentCDL",  header ="CDL", width=30 }, 
new UIGridColumn{field="currentCdmsLead",  header ="Lead CDMS", width=30 }, 
new UIGridColumn{field="currentCdplClinicalProgramming",  header ="CDPL", width=30 }, 
new UIGridColumn{field="revisedRandomisedSubjectsExpected",  header ="Revised Randomised Subjects Expected", align="right" }, 
new UIGridColumn{field="actualRandomisedSubjects",  header ="Actual Randomised Subjects", align="right" }, 
new UIGridColumn{field="terminatedRandomisedSubjects",  header ="Terminated Randomided Subjects", align="right" }, 
new UIGridColumn{field="actualPagesProcessed",  header ="Actual Pages Processed", align="right" }, 
new UIGridColumn{field="dmdirectFeesRevisedUsd",  header ="DM Direct Fees Revised(USD)", type="number", align="right" }}
//CodeBlockEnd
            };
        }
    }
}
