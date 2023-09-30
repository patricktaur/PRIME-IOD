using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwReportIMICDMSTasksGroupV2_Columns : IReportColumns
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
                new UIGridColumn{field="studyStatusText",  header ="Study Status" }, 
                //Not required based on UAT 28Jul2022
                //new UIGridColumn{field="region",  header ="Region", width=20 }, 
                new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, 
                new UIGridColumn{field="cppcNo",  header ="CPPC Number" }, 
                                        
                new UIGridColumn{field="taskGroupTitle",  header ="Task Group Title" }, 
                new UIGridColumn{field="cppcStatus",  header ="Task Status" }, 
                new UIGridColumn{field="taskStartedOn",  header ="CPPC Task Started On", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="taskCompletionDate",  header ="CPPC Task Completion Date", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="taskCompletedOn",  header ="CPPC Task Completed On", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="isSetUpText",  header ="Is SetUp" }, 
                new UIGridColumn{field="isSharedText",  header ="Is Shared" }, 
                new UIGridColumn{field="cppcReason",  header ="CPPC Reason" }, 
                new UIGridColumn{field="numberOfEditChecks",  header ="Number of Edit Checks" }, 
                
                }
                //CodeBlockEnd
            };
        }
    }
}