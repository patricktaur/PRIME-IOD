using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwReportCDMSTaskListV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "Report CDMS Task (List)",
FilterGroup = 8, //server side pagination, client side filter: 10,
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
new UIGridColumn{field="studyName",  header ="Study Name", width=20 }, 
new UIGridColumn{field="studyStatusText",  header ="Study Status" }, 
//Not required based on UAT 28Jul2022
//new UIGridColumn{field="region",  header ="Region", width=20 }, 
new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, 
new UIGridColumn{field="cdmstaskListCppcno",  header ="CPPC Number" }, 
                        
new UIGridColumn{field="cdmstaskListTaskGroupTitle",  header ="Task Group Title" }, 
new UIGridColumn{field="cdmstaskListCppcstatus",  header ="Task Status" }, 
new UIGridColumn{field="cdmstaskListTaskStartedOn",  header ="CPPC Task Started On", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="cdmstaskListTaskCompletionDate",  header ="CPPC Task Completion Date", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="cdmstaskListTaskCompletedOn",  header ="CPPC Task Completed On", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="cdmstaskListIsSetUpText",  header ="Is SetUp" }, 
new UIGridColumn{field="cdmstaskListIsSharedText",  header ="Is Shared" }, 
new UIGridColumn{field="cdmstaskListCppcReason",  header ="CPPC Reason" }, 
new UIGridColumn{field="cdmstaskListNumberOfEditChecks",  header ="Number of Edit Checks" }, 
new UIGridColumn{field="cdmstaskListTaskName",  header ="Task" }, 
//hidden : Not Applicable is also displayed in cdmstaskListItemStatus.
new UIGridColumn{field="cdmstaskListNotApplicableText",  header ="Not Applicable" }, 
new UIGridColumn{field="cdmstaskListStartDate",  header ="Start Date", type="date", format="dd-MMM-yyyy", align="center" }, 

new UIGridColumn{field="cdmstaskListCompletionDate",  header ="Planned Completion Date", type="date", format="dd-MMM-yyyy", align="center" }, 

new UIGridColumn{field="cdmstaskListCompletedDate",  header ="Actual Completion Date", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="cdmstaskListItemStatus",  header ="Item Status" }, 
new UIGridColumn{field="cdmstaskListComments",  header ="Comments" }}
//CodeBlockEnd
            };
        }
    }
}

