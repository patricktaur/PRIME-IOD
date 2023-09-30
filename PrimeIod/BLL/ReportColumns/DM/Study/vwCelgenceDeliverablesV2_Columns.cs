using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwCelgenceDeliverablesV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "Report Study Celgene Deliverables",
FilterGroup = 9,
SortedByFields = "ICON Number",
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
new UIGridColumn{field="celgeneDeliverableDate",  header ="Deliverable Date", type="date", format="dd-MMM-yyyy", align="Center" }, 
new UIGridColumn{field="celgeneDeliverableType",  header ="Deliverable Type" }, 
new UIGridColumn{field="celgeneDeliverableName",  header ="Deliverable Name" }, 
new UIGridColumn{field="celgeneOutcome",  header ="Outcome" }, 
new UIGridColumn{field="celgeneComment",  header ="Comment" }, 
new UIGridColumn{field="region",  header ="Region" }, 
new UIGridColumn{field="portfolio",  header ="Portfolio" }, 
new UIGridColumn{field="sponsor",  header ="Sponsor" }, 
new UIGridColumn{field="studyName",  header ="Study Name" }, 
new UIGridColumn{field="builddonebyIconPid",  header ="Build", align="center" }, 
new UIGridColumn{field="buildRiskScore",  header ="Build RiskScore", type="number", align="center" }, 
new UIGridColumn{field="tEnCComplexityFactor",  header ="TE&C CF", type="number", align="center" }, 
new UIGridColumn{field="tenCriskScore",  header ="TE&C RiskScore", type="number", align="center" }, 
new UIGridColumn{field="cdms",  header ="CDMS" }, 
new UIGridColumn{field="studyStatusText",  header ="Study_Status" }, 
new UIGridColumn{field="protocolPhase",  header ="Protocol Phase" }, 
new UIGridColumn{field="therapeuticArea",  header ="Therapeutic Area" }, 
new UIGridColumn{field="indication",  header ="Indication" }, 
new UIGridColumn{field="fpiText",  header ="FPI" }, 
new UIGridColumn{field="mainDBLText",  header ="Main DBL" }, 
new UIGridColumn{field="followUpDBLText",  header ="FollowUp DBL" }, 
new UIGridColumn{field="currentDmpmManager",  header ="DIR" }, 
new UIGridColumn{field="currentDmpm",  header ="DMPM" }, 
new UIGridColumn{field="currentCdl",  header ="CDL" }, 
new UIGridColumn{field="currentCdmsLead",  header ="Lead CDMS" }, 
new UIGridColumn{field="currentCdplClinicalProgramming",  header ="CDPL" }, 
new UIGridColumn{field="revisedRandomisedSubjectsExpected",  header ="Revised Randomised Subjects Expected", align="right" }, 
new UIGridColumn{field="actualRandomisedSubjects",  header ="Actual Randomised Subjects", align="right" }, 
new UIGridColumn{field="terminatedRandomisedSubjects",  header ="Terminated Randomided Subjects", align="right" }, 
new UIGridColumn{field="revisedTotalPagesExpected",  header ="Revised Total Pages Expected" }, 
new UIGridColumn{field="actualPagesProcessed",  header ="Actual Pages Processed", align="right" }, 
new UIGridColumn{field="dmdirectFeesRevisedUsd",  header ="DM Direct Fees Revised(USD)", type="number", align="right" }}
//CodeBlockEnd
            };
        }
    }
}
