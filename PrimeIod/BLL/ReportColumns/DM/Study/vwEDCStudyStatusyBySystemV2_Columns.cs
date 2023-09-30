using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwEDCStudyStatusyBySystemV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
Title = "EDC Study Status By System",
FilterGroup = 1,
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyStatus",  header ="Study Status PID" }, new UIGridColumn{field="studyStatusText",  header ="Study Status" }, new UIGridColumn{field="cdmsPid",  header ="CDMS PID" }, new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, new UIGridColumn{field="cdmstypeId",  header ="CDMS Type PID" }, new UIGridColumn{field="protocolPhase",  header ="ProtocolPhase" }, new UIGridColumn{field="therapeuticArea",  header ="TherapeuticArea", width=20 }}
//CodeBlockEnd
            };
        }
    }
}
