using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwCDSValidationTaskV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "CDS Validation Task Request Report",
FilterGroup = 3,
Columns = new List<UIGridColumn>{new UIGridColumn{field="validationTaskReqDevReqTaskId",  header ="Development Task ID" }, 
new UIGridColumn{field="studyIconNumber",  header ="Icon Number" }, 
new UIGridColumn{field="region",  header ="Region", width=20 }, 
new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, 
new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
new UIGridColumn{field="studyName",  header ="Study Name", width=20 }, 
new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, 
new UIGridColumn{field="validationTaskReqCreatedOn",  header ="Created Date" }, 
new UIGridColumn{field="validationTaskReqDevCategory",  header ="Development Category" }, 
new UIGridColumn{field="validationTaskReqDevDetail",  header ="Development Detail" }, 
new UIGridColumn{field="validationTaskReqDevStatus",  header ="Development Status" }, 
new UIGridColumn{field="validationTaskReqDevDueDat",  header ="Due Date" }, 
new UIGridColumn{field="validationTaskReqDevCompletedDate",  header ="Completed Date" }, 
new UIGridColumn{field="validationTaskReqCompletedByName",  header ="Completed By" }, 
new UIGridColumn{field="validationTaskReqNoOfUnits",  header ="No of Units" }, 
new UIGridColumn{field="validationTaskReqIsThisAProgrammingPPC",  header ="Is this an update to an existing Program" }, 
new UIGridColumn{field="validationTaskReqDevNoUnitsSpecErrors",  header ="No Units Spec Errors" }, 
new UIGridColumn{field="validationTaskReqClinicalDataDeliveryLeadName",  header ="Programming Lead" }, 
new UIGridColumn{field="validationTaskReqProgrammerAssignedToName",  header ="Programmer Assigned" }, 
new UIGridColumn{field="validationTaskReqRequestor",  header ="Requestor" }, 
new UIGridColumn{field="validationTaskReqValidationProgrammer",  header ="Validation Programmer" }, 
new UIGridColumn{field="validationTaskReqVersionNumber",  header ="Version Number" }, 
new UIGridColumn{field="validationTaskReqLastSavedBy",  header ="Last Saved By" }, 
new UIGridColumn{field="validationTaskReqLastSavedOn",  header ="Last Saved On" }, 
new UIGridColumn{field="currentDmpmManager",  header ="Director", width=20 }, 
new UIGridColumn{field="validationTaskReqValidationStatus",  header ="Validation Status" }, 
new UIGridColumn{field="validationTaskReqCurrentValidationRound",  header ="Current Validation Round" }, 
new UIGridColumn{field="validationTaskReqValidationTaskInvolved",  header ="CDS Validation Task Involved" }, 
new UIGridColumn{field="validationTaskReqValidationStartDate",  header ="Validation Start Date" }, 
new UIGridColumn{field="validationTaskReqvalidationEndDate",  header ="Validation End Date" }, 
new UIGridColumn{field="validationTaskReqValidationDueDate",  header ="Validation Due Date" }, 
new UIGridColumn{field="validationTaskReqFinalValidatoinRound",  header ="Final Validation Round" }, 
new UIGridColumn{field="validationTaskReqTotalProgIssues",  header ="Total Prog Issues" }, 
new UIGridColumn{field="validationTaskReqTotalSpecIssues",  header ="Total Spec Issues" }, 
new UIGridColumn{field="validationTaskReqTotalValIssues",  header ="Total Val Issues" }, 
new UIGridColumn{field="validationTaskReqValidatonPOC",  header ="Validation POC" }, 
new UIGridColumn{field="validationTaskReqValidationMembers",  header ="Validation Members" }, 
new UIGridColumn{field="currentDmpm",  header ="DMPM", width=20 }, 
new UIGridColumn{field="validationTaskReqLinkToValDoc",  header ="Link To Val Documents" }}
//CodeBlockEnd
            };
        }
    }
}
