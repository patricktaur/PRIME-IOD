using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwExternalDataReportV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {

            return 
            new UIGridProperties{
                //CodeBlockStart
                Title = "External Data Report",
                FilterGroup = 7,
                SortedByFields = "ICON Number",
                Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
                new UIGridColumn{field="taskId",  header ="Task Id",  align="center" }, 
                new UIGridColumn{field="dataType",  header ="Data Type" }, 
                new UIGridColumn{field="vendorName",  header ="Vendor Name" }, 
                new UIGridColumn{field="noOfFilesExpected",  header ="No. Of Files Expected",  align="center" }, 

                new UIGridColumn{field="frequencyOfTransferId",  header ="Frequency of Transfer" }, 
                new UIGridColumn{field="dtsstatusId",  header ="DTS Status" }, 
                new UIGridColumn{field="locationOfDts",  header ="Location of DTS" }, 
                new UIGridColumn{field="testTransferStatusId",  header ="Test Transfer Status",  }, 
                new UIGridColumn{field="testTransferDate",  header ="Test Transfer Date", type="date", format="dd-MMM-yyyy" ,  align="center"}, 

                new UIGridColumn{field="productionTransferDate",  header ="Production Transfer Date", type="date", format="dd-MMM-yyyy" ,  align="center"  }, 
                new UIGridColumn{field="reconciliationListingStatusId",  header ="Reconciliation Listing status"}, 
                new UIGridColumn{field="vendorIssueTrackingLog",  header ="Vendor Issue Tracking log" }, 
                new UIGridColumn{field="bindedTransferRequiredId",  header ="Unblinded Transfer Required", align="center" } 

                //CodeBlockEnd
                } 
            };
        }
    }
}


 