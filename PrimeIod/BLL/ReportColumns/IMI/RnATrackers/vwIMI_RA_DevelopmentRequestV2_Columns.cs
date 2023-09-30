using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwIMI_RA_DevelopmentRequestV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
                Title = "IMI R&A Development Request Report",
                FilterGroup = 13,
                Columns = new List<UIGridColumn>{
                new UIGridColumn{field="recId",  header ="Development Task Id", align ="right" }, 

                new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
                new UIGridColumn{field="studyName",  header ="Protocol Name", width=20 }, 
                new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
                new UIGridColumn{field="protocolPhase",  header ="Portfolio"}, 

                new UIGridColumn{field="developmentTypeNames",  header ="Development Types", width=20 }, 
                new UIGridColumn{field="newDevelopmentPid",  header ="New Development / Change Request", width=20 }, 
                new UIGridColumn{field="requestTitle",  header ="Request Title", width=20 }, 
                new UIGridColumn{field="requestedPriority",  header ="Requested Priority", width=20 }, 
                new UIGridColumn{field="requestedDueDate",  header ="Requested Due Date", type="date", format="dd-MMM-yyyy", align="center" }, 

               new UIGridColumn{field="requestor",  header ="Requestor", width=20 }, 
               new UIGridColumn{field="specificationStatus",  header ="Specification Status", width=20 }, 
               new UIGridColumn{field="specLocation",  header ="Spec Location", width=20 }, 
               new UIGridColumn{field="validationNeeded",  header ="Validation Needed", width=20 }, 
               new UIGridColumn{field="requestDetails",  header ="Request Details", width=20 }, 
                new UIGridColumn{field="developerAssigned",  header ="Developer Assigned", width=20 }, 
                new UIGridColumn{field="qcCodeAssignedTo",  header ="Qc/Code Review Assigned To", width=20 }, 
                new UIGridColumn{field="developmentStatus",  header ="Development Status", width=20 }, 
                new UIGridColumn{field="uatAssignedTo",  header ="Uat Assigned To", width=20 }, 

                new UIGridColumn{field="developmentCompletedDate",  header ="Development Completed Date", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="uatcompletedDate",  header ="Uat Completed Date", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="validationApprovalDate",  header ="Validation Approval Date", type="date", format="dd-MMM-yyyy", align="center" }, 
                
                new UIGridColumn{field="progressDetails",  header ="Progress Details", width=20 }, 
                
                }
                //CodeBlockEnd
            };
        }
    }
}