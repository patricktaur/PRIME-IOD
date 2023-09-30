using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwCDSDevelopmentTaskV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "CDS Development Task Request Report",
FilterGroup = 2,
Columns = new List<UIGridColumn>{new UIGridColumn{field="developmentTaskRequestRecId",  header ="Development Task ID" }, 
new UIGridColumn{field="studyIconNumber",  header ="Icon Number" }, 
new UIGridColumn{field="region",  header ="Region", width=20 }, 
new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, 
new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
new UIGridColumn{field="studyName",  header ="Study Name", width=20 }, 
new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, 
new UIGridColumn{field="developmentTaskRequestCreatedOn",  header ="Created Date", type="date", format="dd-MMM-yyyy" }, 
new UIGridColumn{field="developmentTaskRequestDevelopmentCategory",  header ="Development Category" }, 
new UIGridColumn{field="developmentTaskRequestDevelopmentSubCategory",  header ="Development Sub Category" }, 
new UIGridColumn{field="developmentTaskRequestDevelopmentDetails",  header ="Development Detail" }, 
new UIGridColumn{field="developmentTaskRequestDRTUsed",  header ="Is this output to be uploaded to DRT" }, 
new UIGridColumn{field="developmentTaskRequestDevelopmentStatus",  header ="Development Status" }, 
new UIGridColumn{field="developmentTaskRequestDueDate",  header ="Due Date", type="date", format="dd-MMM-yyyy" }, 
new UIGridColumn{field="developmentTaskRequestCompletedDate",  header ="Completed Date", type="date", format="dd-MMM-yyyy" }, 
new UIGridColumn{field="developmentTaskRequestCompletedBy",  header ="Completed By" }, 
new UIGridColumn{field="developmentTaskRequestNoOfUnits",  header ="No of Units" }, 
new UIGridColumn{field="developmentTaskRequestIsThisaProgrammingPpc",  header ="Is this an update to an existing Program" }, 
// new UIGridColumn{field="developmentTaskRequestNoUnitsSpecErrors",  header ="No Units Spec Errors" }, 
new UIGridColumn{field="developmentTaskRequestClinicalDataDeliveryLead",  header ="Programming Lead" }, 
new UIGridColumn{field="developmentTaskRequestPriority",  header ="Priority" }, 
new UIGridColumn{field="developmentTaskRequestCDSAssignedTo",  header ="Programmer Assigned" }, 
new UIGridColumn{field="developmentTaskRequestRequestor",  header ="Requestor" }, 
new UIGridColumn{field="developmentTaskRequestValidationProgrammer",  header ="Validation Programmer" }, 
new UIGridColumn{field="developmentTaskRequestComments",  header ="Comments" }, 
new UIGridColumn{field="developmentTaskRequestVersionNumber",  header ="Version Number" }, 
new UIGridColumn{field="developmentTaskRequestLastSavedBy",  header ="Last Saved By" }, 
new UIGridColumn{field="developmentTaskRequestUpdatedOn",  header ="Last Saved On", type="date", format="dd-MMM-yyyy" }, 
new UIGridColumn{field="currentDmpmManager",  header ="Director", width=20 }}
//CodeBlockEnd
            };
        }
    }
}
