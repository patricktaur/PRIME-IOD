using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwCDSInstructionTaskV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "CDS Instruction Task Request Report",
FilterGroup = 7,
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
new UIGridColumn{field="instructionTaskRequestRecId",  header ="Task ID" }, 
new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
new UIGridColumn{field="studyStatusPid",  header ="Study status" }, 
new UIGridColumn{field="instructionTaskRequestProgramName",  header ="Program Details" }, 
new UIGridColumn{field="instructionTaskRequestProgrammingTask",  header ="Instruction Programming Task Category" }, 
new UIGridColumn{field="instructionTaskRequestOnScheduler",  header ="On Scheduler" }, 
new UIGridColumn{field="instructionTaskRequestCreatedOn",  header ="Created Date" }, 
new UIGridColumn{field="instructionTaskRequestCDP",  header ="CDP" }, 
new UIGridColumn{field="instructionTaskRequestCDPL",  header ="CDPL" }}
//CodeBlockEnd
            };
        }
    }
}
