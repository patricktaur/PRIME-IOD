using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwIMI_RA_OutputRequestV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
                Title = "IMI R&A Output Request Report",
                FilterGroup = 14,
                Columns = new List<UIGridColumn>{
                new UIGridColumn{field="recId",  header ="Output Task Id" , align ="right"}, 
                new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
                new UIGridColumn{field="studyName",  header ="Protocol Name", width=20 }, 
                new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
                new UIGridColumn{field="outputTypeNames",  header ="Output Types", width=20 }, 
                
                new UIGridColumn{field="requestedPriority",  header ="Requested Priority", width=20 }, 
                new UIGridColumn{field="requestedDueDate",  header ="Requested Due Date", type="date", format="dd-MMM-yyyy", align="center" }, 
               new UIGridColumn{field="requestor",  header ="Requestor", width=20 }, 
                new UIGridColumn{field="developerAssigned",  header ="Developer Assigned", width=20 }, 
                // new UIGridColumn{field="outputReviewAssignedIds",  header ="Output Review Assigned", width=20 }, 
                new UIGridColumn{field="outputStatus",  header ="Output Status", width=20 }, 
                
                new UIGridColumn{field="outputCompletedDate",  header ="Output Completed Date", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="progressDetails",  header ="Progress Details", width=20 }, 
                
                }
                //CodeBlockEnd
            };
        }
    }
}