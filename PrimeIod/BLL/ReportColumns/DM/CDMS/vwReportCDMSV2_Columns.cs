using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwReportCDMSV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "Report CDMS",
FilterGroup = 1,
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
new UIGridColumn{field="region",  header ="Region", width=20 }, 
new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, 
new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
new UIGridColumn{field="studyName",  header ="Study Name", width=20 }, 
new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, 
new UIGridColumn{field="studyStatusText",  header ="Study Status" }, 
new UIGridColumn{field="cdmsleadName",  header ="CDMS LEAD Name" }, 
new UIGridColumn{field="secondCdmslead",  header ="Covering CDMS LEAD Name" }, 
new UIGridColumn{field="cdmsverison",  header ="CDMS Version" }, 
new UIGridColumn{field="cdmsUrlDerived",  header ="CDMS Url" }, 
new UIGridColumn{field="cdmssponsorUrlText",  header ="Sponsor-owned/Sponsor-contracted URL" }, 
new UIGridColumn{field="cdmsactualNumberOfUniqueCrfs",  header ="Actual Number of Unique CRFs" }, 
new UIGridColumn{field="cdmseditChecksCompleted",  header ="Edit Checks Completed" }, 
new UIGridColumn{field="cdmseditCheckSpecificationErrors",  header ="Edit Check Specification Errors (including CFs)" }, 
new UIGridColumn{field="cdmseditChecksFailedRound1ValidatonOnly",  header ="Edit Checks Failed(Round 1 Validation Only)" }, 
new UIGridColumn{field="cdmscomment",  header ="CDMS Comments" }, 
new UIGridColumn{field="cdmscustomFunctions",  header ="Custom Functions" }, 
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
new UIGridColumn{field="cdmsotherIntegrationSpecify1",  header ="Other Integration(Specify1)" }, 
new UIGridColumn{field="cdmsotherIntegrationSpecify1VendorName",  header ="Other Integration (Specify 1) Vendor Name" }, 
new UIGridColumn{field="cdmsotherIntegrationSpecify2",  header ="Other Integration(Specify2)" }, 
new UIGridColumn{field="cdmsotherIntegrationSpecify2VendorName",  header ="Other Integration (Specify 2) Vendor Name" }, 
new UIGridColumn{field="cdmssplitGoLiveText",  header ="Split Go-live" }, 
new UIGridColumn{field="cdmsomrdbsetupCompletedText",  header ="OMR Database Setup Completed" }, 
new UIGridColumn{field="cdmsocoptIconText",  header ="Does this study use OC/OptICON?" }, 
new UIGridColumn{field="cdmsomrsubjectDispositionCompletedText",  header ="OMR Subject Disposition Completed?" }}
//CodeBlockEnd
            };
        }
    }
}
