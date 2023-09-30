using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwIMIStudyReviewReaderPerformanceV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
                Title = "IMI Reader Performance Quality Management Action Report",
                FilterGroup = 11,
                Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
                new UIGridColumn{field="studyName",  header ="Protocol Name", width=20 }, 
                new UIGridColumn{field="region",  header ="Region", width=20 }, 
                new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, 
                new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
                // new UIGridColumn{field="cdms",  header ="IMICDMS" }, 
                //studyStatus requires study computation interface to calculate dm Study Status
                //view and models have to be updated if status column is required.
                //new UIGridColumn{field="studyStatus",  header ="Study Status" } ,
                new UIGridColumn{field="reviewIndex",  header ="Review Number", align="right" } ,

                new UIGridColumn{field="imiPm",  header ="IMI PM" } ,
                new UIGridColumn{field="imipmReviewedOn",  header ="IMIPM Reviewed On" , type="date", format="dd-MMM-yyyy", align="center"} ,

                new UIGridColumn{field="imipmPd",  header ="IMIPD PM" } ,
                new UIGridColumn{field="imipmPdReviewedOn",  header ="IMIPM PD Reviewed On" , type="date", format="dd-MMM-yyyy", align="center"} ,

                new UIGridColumn{field="watchlistText",  header ="Watch List", align="center" } ,
                new UIGridColumn{field="escalatedText",  header ="Escalated", align="center" } ,

                new UIGridColumn{field="overallProjectScore",  header ="Overall Project Score", align="center" } ,
                new UIGridColumn{field="overideProjectScore",  header ="Override Project Score", align="center" } ,
                new UIGridColumn{field="readerperformance",  header ="Reader Performance & Quality Management Score", align="center" } ,
                new UIGridColumn{field="readerperformanceComments",  header ="Reader Performance & Quality Management Comments", width=50 } ,
                new UIGridColumn{field="readerperformanceAction",  header ="Reader Performance & Quality Management Action", width=50  } ,
                
                
                }
                //CodeBlockEnd
            };
        }
    }
}