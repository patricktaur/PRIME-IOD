using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class VwStudyDMOwnerListV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
Title = "DM Study Owner List",
FilterGroup = 1,
SortedByFields = "ICON Number",
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, new UIGridColumn{field="sponsor",  header ="Sponsor" }, new UIGridColumn{field="studyName",  header ="Study Name" }, new UIGridColumn{field="cdms",  header ="CDMS" }, new UIGridColumn{field="studyStatusText",  header ="Study Status" }, new UIGridColumn{field="currentDmpm",  header ="DMPM" }, new UIGridColumn{field="currentDmpmEmailIds",  header ="DMPM e-mail address" }, new UIGridColumn{field="currentCdl",  header ="CDL" }, new UIGridColumn{field="currentCdlEmailIds",  header ="CDL e-mail address" }, new UIGridColumn{field="specialProject",  header ="Special Project", align="center" }}
//CodeBlockEnd
            };
        }
    }
}

