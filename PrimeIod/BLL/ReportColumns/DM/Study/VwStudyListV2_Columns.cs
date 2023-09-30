using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class VwStudyListV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

                Title = "Studies",
                FilterGroup = 1,
                SortedByFields = "ICON Number",
                Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
                new UIGridColumn{field="studyName",  header ="Study Name", width=30  }, 
                new UIGridColumn{field="sponsor",  header ="Sponsor" }, 
                new UIGridColumn{field="studyStatusText",  header ="Study Status" }, 
                new UIGridColumn{field="overallProjectScore",  header ="Overall Project Score" }, 
                new UIGridColumn{field="alerts",  header ="Alerts" }


/*
columns: Array<UIGridColumn> = [
    {
      header: 'Icon Number',
      field: 'studyIconNumber',
      actionType: 'link',
      linkField: 'studyId',
      linkPath: '/study'
    },
    {
      header: 'Study Name',
      field: 'studyName',
      width: 100 //source {type: 'clothes'}
    },
    {
      header: 'Sponsor',
      field: 'sponsor',
      width: 100
    },
    {
      header: 'Status',
      field: 'statusText' //source {price: '15$'}
    },
    {
      header: 'Overall Project Score',
      field: 'overallProjectScore' //source {price: '15$'}
    },
    {
      header: 'Alerts',
      field: 'alerts', //source {price: '15$'}
      align: 'center'
    }
  ];
*/
                }
//CodeBlockEnd
            };
        }
    }
}
