using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwReportIMICDMSTasksListV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
                Title = "IMI CDMS Task List",
                FilterGroup = 10, //server side pagination, client side filter: 10,
                Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
                new UIGridColumn{field="studyName",  header ="Protocol Name", width=20 }, 
                new UIGridColumn{field="studyStatusText",  header ="Protocol Status" }, 
                //Not required based on UAT 28Jul2022
                //new UIGridColumn{field="region",  header ="Region", width=20 }, 
                new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, 
                new UIGridColumn{field="imicdmstaskListCppcno",  header ="CPPC Number", align="right"  }, 
                                        
                new UIGridColumn{field="imicdmstaskListTaskGroupTitle",  header ="Task Group Title" }, 
                new UIGridColumn{field="imicdmstaskListCppcstatus",  header ="Task Status" }, 
                new UIGridColumn{field="imicdmstaskListTaskStartedOn",  header ="CPPC Task Started On", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="imicdmstaskListTaskCompletionDate",  header ="CPPC Task Completion Date", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="imicdmstaskListTaskcompletedOn",  header ="CPPC Task Completed On", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="imicdmstaskListIsSetUpText",  header ="Is SetUp" }, 
                new UIGridColumn{field="imicdmstaskListIsSharedText",  header ="Is Shared" }, 
                new UIGridColumn{field="imicdmstaskListCppcReason",  header ="CPPC Reason" }, 
                new UIGridColumn{field="imicdmstaskListNumberOfEditChecks",  header ="Number of Edit Checks", align="right" }, 
                new UIGridColumn{field="imicdmstaskListTaskName",  header ="Task" }, 
                //hidden : Not Applicable is also displayed in cdmstaskListItemStatus.
                new UIGridColumn{field="imicdmstaskListNotApplicableText",  header ="Not Applicable" }, 
                new UIGridColumn{field="imicdmstaskListStartDate",  header ="Start Date", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="imicdmstaskListCompletionDate",  header ="Planned Completion Date", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="imicdmstaskListCompletedDate",  header ="Actual Completion Date", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="imicdmstaskListItemStatus",  header ="Item Status" }, 
                new UIGridColumn{field="imicdmstaskListComments",  header ="Comments" }}
                //CodeBlockEnd
            };
        }
    }
}