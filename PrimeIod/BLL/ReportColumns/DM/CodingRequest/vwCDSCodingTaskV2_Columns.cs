using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwCDSCodingTaskV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "CDS Coding Task Request Review Report",
FilterGroup = 6,
Columns = new List<UIGridColumn>{new UIGridColumn{field="codingTaskRequestRecId",  header ="Task ID" }, 
new UIGridColumn{field="studyIconNumber",  header ="Icon Number" }, 
new UIGridColumn{field="region",  header ="Region", width=20 }, 
new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, 
new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
new UIGridColumn{field="studyName",  header ="Study Name", width=20 }, 
new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, 
new UIGridColumn{field="codingTaskRequestCreatedOn",  header ="Created Date" }, 
new UIGridColumn{field="codingTaskRequestCodingTaskCategory",  header ="Coding Task Category" }, 
new UIGridColumn{field="codingTaskRequestCodingTaskDetails",  header ="Coding Detail" }, 
new UIGridColumn{field="codingTaskRequestDueDate",  header ="Due Date" }, 
new UIGridColumn{field="codingTaskRequestRecurringFrequency",  header ="Recurring Frequency" }, 
new UIGridColumn{field="codingTaskRequestCompletedDate",  header ="Completed Date" }, 
new UIGridColumn{field="codingTaskRequestCompletedBy",  header ="Completed By" }, 
new UIGridColumn{field="codingTaskRequestCodingSpecialistAssigned",  header ="Coding Specialist Assigned" }, 
new UIGridColumn{field="codingTaskRequestRequestor",  header ="Requestor" }, 
new UIGridColumn{field="codingTaskRequestComments",  header ="Comments" }, 
new UIGridColumn{field="codingTaskRequestVersionNumber",  header ="Version Number" }, 
new UIGridColumn{field="codingTaskRequestLastSavedBy",  header ="Last Saved By" }, 
new UIGridColumn{field="codingTaskRequestUpdatedOn",  header ="Last Saved On" }}
//CodeBlockEnd
            };
        }
    }
}
