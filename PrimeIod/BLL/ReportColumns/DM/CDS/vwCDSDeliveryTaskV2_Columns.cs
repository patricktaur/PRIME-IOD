using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwCDSDeliveryTaskV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "CDS Delivery Task Request Report",
FilterGroup = 5,
Columns = new List<UIGridColumn>{new UIGridColumn{field="deliveryTaskRequestRecId",  header ="Task ID" }, 
new UIGridColumn{field="studyIconNumber",  header ="Icon Number" }, 
new UIGridColumn{field="region",  header ="Region", width=20 }, 
new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, 
new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
new UIGridColumn{field="studyName",  header ="Study Name", width=20 }, 
//  new UIGridColumn{field="studyStatusPid",  header ="Study Status" }, 
new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, 
new UIGridColumn{field="deliveryTaskRequestCreatedOn",  header ="Created Date" }, 
new UIGridColumn{field="deliveryTaskRequestDeliveryTaskCategory",  header ="Delivery Category" }, 
new UIGridColumn{field="deliveryTaskRequestDeliveryType",  header ="Delivery Type" }, 
new UIGridColumn{field="deliveryTaskRequestRecipentsNames",  header ="Recipient Name(s)" }, 
new UIGridColumn{field="deliveryTaskRequestBlindedUnblindedNa",  header ="Blinded or Unblinded or NA" },
new UIGridColumn{field="deliveryTaskRequestDataRestricted",  header ="Data Restricted" },
new UIGridColumn{field="deliveryTaskRequestDataRestrictedComment",  header ="Data Restricted Comment" },
new UIGridColumn{field="deliveryTaskRequestDataCut",  header ="Data Cutoff" },
new UIGridColumn{field="deliveryTaskRequestDataCutOffDate",  header ="Data Cutoff Date" },
new UIGridColumn{field="deliveryTaskRequestDataCutOffComment",  header ="Data Cutoff Comment" },
new UIGridColumn{field="deliveryTaskRequestExcludeAnyDataset",  header ="Exclude Any Dataset" },
new UIGridColumn{field="deliveryTaskRequestExcludeAnyDatasetComment",  header ="Exclude Any Dataset Comment" },

new UIGridColumn{field="deliveryTaskRequestDeliveryTaskDetail",  header ="Delivery Detail" }, 
new UIGridColumn{field="deliveryTaskRequestDueDate",  header ="Due Date" }, 
new UIGridColumn{field="deliveryTaskRequestRecurringFrequency",  header ="Recurring Frequency" }, 
new UIGridColumn{field="deliveryTaskRequestCompletedDate",  header ="Completed Date" }, 
new UIGridColumn{field="deliveryTaskRequestCompletedBy",  header ="Completed By" }, 
new UIGridColumn{field="deliveryTaskRequestClinicalDataDeliveryLead",  header ="Programming Lead" }, 
new UIGridColumn{field="deliveryTaskRequestCDSAssignedTo",  header ="Programmer Assigned" }, 
new UIGridColumn{field="deliveryTaskRequestRequestor",  header ="Requestor" }, 
new UIGridColumn{field="deliveryTaskRequestOnScheduler",  header ="On Scheduler" }, 
new UIGridColumn{field="deliveryTaskRequestGlobalscape",  header ="Globalscape" }, 
new UIGridColumn{field="deliveryTaskRequestRetransfer",  header ="Retransfer" }, 
new UIGridColumn{field="deliveryTaskRequestComments",  header ="Comments" }, 
new UIGridColumn{field="deliveryTaskRequestVersionNumber",  header ="Version Number" }, 
new UIGridColumn{field="deliveryTaskRequestCDSInstructionTaskID",  header ="Task Instruction ID" }, 
new UIGridColumn{field="deliveryTaskRequestLinkToDocumentation",  header ="Link to Task Instruction" }, 
new UIGridColumn{field="deliveryTaskRequestOverDueComment",  header ="Overdue Comments" }, 
new UIGridColumn{field="deliveryTaskRequestLastSavedBy",  header ="Last Saved By" }, 
new UIGridColumn{field="deliveryTaskRequestUpdatedOn",  header ="Last Saved On" }}
//CodeBlockEnd
            };
        }
    }
}

