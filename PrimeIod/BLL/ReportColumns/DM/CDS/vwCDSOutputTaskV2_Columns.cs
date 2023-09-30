using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwCDSOutputTaskV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "CDS Output Task Request Report",
FilterGroup = 4,
Columns = new List<UIGridColumn>{new UIGridColumn{field="outputTaskRequestRecId",  header ="Task ID" }, 
new UIGridColumn{field="studyIconNumber",  header ="Icon Number" }, 
new UIGridColumn{field="region",  header ="Region", width=20 }, 
new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, 
new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
new UIGridColumn{field="studyName",  header ="Study Name", width=20 }, 
new UIGridColumn{field="studyStatusPid",  header ="Study_status" }, 
new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, 
new UIGridColumn{field="outputTaskRequestCreatedOn",  header ="Created Date", format="dd-MMM-yyyy" }, 
new UIGridColumn{field="outputTaskRequestOutputTaskCategory",  header ="Output Category" }, 
new UIGridColumn{field="outputTaskRequestOutputTaskSubCategory",  header ="Output Sub Category" }, 
new UIGridColumn{field="outputTaskRequestOutputTaskDetail",  header ="Output Detail" }, 
new UIGridColumn{field="outputTaskRequestDueDate",  header ="Due Date", format="dd-MMM-yyyy" }, 
new UIGridColumn{field="outputTaskRequestCompletedDate",  header ="Completed Date", format="dd-MMM-yyyy" }, 
new UIGridColumn{field="outputTaskRequestCompletedBy",  header ="Completed By" }, 
new UIGridColumn{field="outputTaskRequestRecurringFrequency",  header ="Recurring Frequency" }, 
new UIGridColumn{field="outputTaskRequestClinicalDataDeliveryLead",  header ="Programming Lead" }, 
new UIGridColumn{field="outputTaskRequestCDSAssignedTo",  header ="Programmer Assigned" }, 
new UIGridColumn{field="outputTaskRequestRequestor",  header ="Requestor" }, 
new UIGridColumn{field="outputTaskRequestOnScheduler",  header ="On Scheduler" }, 
new UIGridColumn{field="outputTaskRequestGlobalscape",  header ="Globalscape" }, 
new UIGridColumn{field="outputTaskRequestComments",  header ="Comments", width=50 }, 
new UIGridColumn{field="outputTaskRequestCDSInstructionTaskID",  header ="Task Instruction ID" }, 
new UIGridColumn{field="outputTaskRequestLinkToDocumentation",  header ="Link to Task Instruction" }, 
new UIGridColumn{field="outputTaskRequestOverDueComments",  header ="Over Due Comment", width=50 }, 
new UIGridColumn{field="outputTaskRequestVersionNumber",  header ="Version Number" }, 
new UIGridColumn{field="outputTaskRequestUpdatedOn",  header ="Last Saved By", format="dd-MMM-yyyy" }, 
new UIGridColumn{field="outputTaskRequestLastSavedBy",  header ="Last Saved On" }}
//CodeBlockEnd
            };
        }
    }
}
