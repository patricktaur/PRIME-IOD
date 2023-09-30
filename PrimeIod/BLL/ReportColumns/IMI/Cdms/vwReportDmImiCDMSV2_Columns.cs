using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwReportDmImiCDMSV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
                Title = "IMI DM CDMS Report",
                FilterGroup = 13,
                Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
                new UIGridColumn{field="region",  header ="Region", width=20 }, 
                new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, 
                new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
                new UIGridColumn{field="studyName",  header ="Protocol Name", width=20 }, 
                new UIGridColumn{field="cdms",  header ="CDMS" }, 
                new UIGridColumn{field="studyStatusText",  header ="Study Status" }, 
                new UIGridColumn{field="dmCdmsLeadName",  header ="CDMS LEAD Name" }, 
                new UIGridColumn{field="dmCoveringCdmsLeadName",  header ="Covering CDMS LEAD Name" }, 

                new UIGridColumn{field="cdmsVersion",  header ="CDMS Version" }, 
                new UIGridColumn{field="cdmsUrlText",  header ="CDMS Url" }, 
                new UIGridColumn{field="sponsorUrlText",  header ="Sponsor-owned/Sponsor-contracted URL" }, 
                new UIGridColumn{field="dmActualNumberOfUniqueCrfs",  header ="Actual Number of Unique CRFs" }, 
                new UIGridColumn{field="dmEditChecksCompleted",  header ="Edit Checks Completed" }, 
                new UIGridColumn{field="dmEditChecksErrorsInDvsCdmsReview",  header ="Edit Check Specification Errors (including CFs)" }, 
                new UIGridColumn{field="dmEditChecksFailedRound1ValidationOnly",  header ="Edit Checks Failed(Round 1 Validation Only)" }, 
                new UIGridColumn{field="dmCdmsComments",  header ="CDMS Comments" }, 
                new UIGridColumn{field="dmCustomFunctions",  header ="Custom Functions" },
                //--
                new UIGridColumn{field="cdmscoding",  header ="Type of Integration Used_Coding" }, 
                new UIGridColumn{field="cdmscodingVendorName",  header ="Type of Integration Used_Coding Vendor Name" }, 
                new UIGridColumn{field="cdmsecg",  header ="Type of Integration Used_ECG" }, 
                new UIGridColumn{field="cdmsecgVendorName",  header ="Type of Integration Used_ECG Vendor Name" }, 
                new UIGridColumn{field="cdmsepro",  header ="Type of Integration Used_EPRO" }, 
                new UIGridColumn{field="cdmseproVendorName",  header ="Type of Integration Used_EPRO Vendor Name" }, 
                new UIGridColumn{field="cdmsimaging",  header ="Type of Integration Used_IMAGING" }, 
                new UIGridColumn{field="cdmsimagingVendorName",  header ="Type of Integration Used_IMAGING Vendor Name" }, 
                new UIGridColumn{field="cdmsixr",  header ="Type of Integration Used_IXRS" }, 
                new UIGridColumn{field="cdmsixrVendorName",  header ="Type of Integration Used_IXRS Vendor Name" }, 
                new UIGridColumn{field="cdmslab",  header ="Type of Integration Used_LAB" }, 
                new UIGridColumn{field="cdmslabVendorName",  header ="Type of Integration Used_LAB Vendor Name" }, 
                new UIGridColumn{field="cdmssafety",  header ="Type of Integration Used_SAFETY" }, 
                new UIGridColumn{field="cdmssafetyVendorName",  header ="Type of Integration Used_SAFETY Vendor Name" }, 
                new UIGridColumn{field="otherIntegrationSpecify1",  header ="Other Integration(Specify1)" }, 
                new UIGridColumn{field="otherIntegrationSpecify1VendorName",  header ="Other Integration (Specify 1) Vendor Name" }, 
                new UIGridColumn{field="otherIntegrationSpecify2",  header ="Other Integration(Specify2)" }, 
                new UIGridColumn{field="otherIntegrationSpecify2VendorName",  header ="Other Integration (Specify 2) Vendor Name" }, 
                new UIGridColumn{field="splitGoLiveText",  header ="Split Go-live" }, 
                new UIGridColumn{field="omrdbsetupCompletedText",  header ="OMR Database Setup Completed" }, 
                new UIGridColumn{field="ocoptIconText",  header ="Does this study use OC/OptICON?" }, 
                new UIGridColumn{field="omrsubjectDispositionCompletedText",  header ="OMR Subject Disposition Completed?" },
                //--

                new UIGridColumn{field="imiCdmsLeadName",  header ="IMI CDMS LEAD Name" }, 
                new UIGridColumn{field="imiCoveringCdmsLeadName",  header ="IMI Covering CDMS LEAD Name" }, 

                new UIGridColumn{field="imiCdmsVersion",  header ="IMI CDMS Version" }, 
                new UIGridColumn{field="imiCdmsUrl",  header ="IMI CDMS Url" }, 
                new UIGridColumn{field="imiSponsorUrlText",  header ="IMI Sponsor-owned/Sponsor-contracted URL" }, 
                new UIGridColumn{field="imiActualNumberOfUniqueCrfs",  header ="IMI Actual Number of Unique CRFs" }, 
                new UIGridColumn{field="imiEditChecksCompleted",  header ="IMI Edit Checks Completed" }, 
                new UIGridColumn{field="imiEditChecksErrorsInDvsCdmsReview",  header ="IMI Edit Check Specification Errors (including CFs)" }, 
                new UIGridColumn{field="imiEditChecksFailedRound1ValidationOnly",  header ="IMI Edit Checks Failed(Round 1 Validation Only)" }, 
                new UIGridColumn{field="imiCdmsComments",  header ="IMI CDMS Comments" }, 
                new UIGridColumn{field="imiCustomFunctions",  header ="IMI Custom Functions" },
                //--                
                
                }
            

                
                
                //CodeBlockEnd
            };
        }
    }
}