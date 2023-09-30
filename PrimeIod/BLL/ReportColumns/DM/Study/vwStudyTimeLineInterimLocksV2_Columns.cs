using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwStudyTimeLineInterimLocksV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
                Title = "Timeline Interim Locks Report",
                    FilterGroup = 16,
                    Columns = new List<UIGridColumn>{
                    new UIGridColumn{field="studyIconNumber",  header ="Icon Number" }, 
                    new UIGridColumn{field="studyName",  header ="Study Name" }, 
                    new UIGridColumn{field="interimDate",  header ="Interim Lock Date", type="date", format="dd-MMM-yyyy", align="Center" }, 
                    new UIGridColumn{field="cutOffDate",  header ="Cut Off Date", type="date", format="dd-MMM-yyyy", align="Center" }, 
                    new UIGridColumn{field="softLockDate",  header ="Soft Lock Date", type="date", format="dd-MMM-yyyy", align="Center" }, 
                    new UIGridColumn{field="hardLockDate",  header ="Hard Lock Date", type="date", format="dd-MMM-yyyy", align="Center" }, 
                } 
                //CodeBlockEnd
            };
        }
    }
}