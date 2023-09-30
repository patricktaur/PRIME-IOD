using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwIMICDMSReportV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

                Title = "IMI CDMS Report",
                FilterGroup = 12,
                Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
                new UIGridColumn{field="region",  header ="Region", width=20 }, 
                new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, 
                new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
                new UIGridColumn{field="studyName",  header ="Protocol Name", width=20 }, 
                new UIGridColumn{field="cdms",  header ="IMICDMS" }, 
                new UIGridColumn{field="studyStatus",  header ="Study Status" }, 
                new UIGridColumn{field="cdmsLead",  header ="CDMS LEAD Name" }, 
                new UIGridColumn{field="coveringCdmsLead",  header ="Convering CDMS LEAD Name" }, 

                new UIGridColumn{field="cdmsVersion",  header ="CDMS Version" }, 
                new UIGridColumn{field="cdmsUrl",  header ="CDMS Url" }, 
                new UIGridColumn{field="sponsorUrlText",  header ="Sponsor-owned/Sponsor-contracted URL", align="center" }, 
                new UIGridColumn{field="actualNumberOfUniqueCrfs",  header ="Actual Number of Unique CRFs", align="right" }, 
                new UIGridColumn{field="editChecksCompleted",  header ="Edit Checks Completed", align="right" }, 
                new UIGridColumn{field="editChecksErrorsInDvsCdmsReview",  header ="Edit Check Specification Errors (including CFs)" , align="right"}, 
                new UIGridColumn{field="editChecksFailedRound1ValidationOnly",  header ="Edit Checks Failed(Round 1 Validation Only)", align="right" }, 
                new UIGridColumn{field="cdmsComments",  header ="CDMS Comments" }, 
                new UIGridColumn{field="customFunctions",  header ="Custom Functions", align="right" }}
                //CodeBlockEnd
            };
        }
    }
}
