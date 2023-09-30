using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwCDSV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "CDS Report",
FilterGroup = 1,
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="Icon number" }, 
new UIGridColumn{field="region",  header ="Region", width=20 }, 
new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, 
new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
new UIGridColumn{field="studyName",  header ="Study name", width=20 }, 
new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, 
new UIGridColumn{field="studyStatusText",  header ="Study_status" }, 
new UIGridColumn{field="fpiText",  header ="FPI date" }, 
new UIGridColumn{field="mainDBLText",  header ="mDBL date" }, 
                        
new UIGridColumn{field="cdsClinical_Data_Delivery_Lead_Name",  header ="Clinical Data Programming Lead - Clinical Programming" }, 
new UIGridColumn{field="maintenanceProgrammer",  header ="Maintenance Programmer" }, 
new UIGridColumn{field="maintenanceProgrammerBackup",  header ="Maintenance Programmer Backup" }, 
new UIGridColumn{field="cdsUnblinded_clinical_Programmer",  header ="Unblinded Clinical Programmer" }, 
// cdssecondUnblindedClinicalProgrammer
new UIGridColumn{field="cdssecondUnblindedClinicalProgrammer",  header ="Second Unblinded Clinical Programmer" }, 
new UIGridColumn{field="cdssdtmProgramming",  header ="Clinical Data Programming Lead - SDTM Programming" }, 
new UIGridColumn{field="cdsunblindedSdtmProgrammer",  header ="Unblinded SDTM Programmer" }, 
new UIGridColumn{field="cdsimiProgrammer",  header ="Clinical Data Programming Lead - IMI Programming" }, 
//Not found in Edit UI, therefore commented:
// new UIGridColumn{field="cdsnumberListingsInProduction",  header ="Number of Programming Units in Production" }, 
// new UIGridColumn{field="cdsnumberListingsWithSpecsErrors",  header ="Number Listings with Specs Errors" }, 
// new UIGridColumn{field="cdsnoOfListProgrammingError",  header ="Number Listings with Programming Errors" }, 

new UIGridColumn{field="deliveryTypeRaw",  header ="Delivery type - Raw" }, 
new UIGridColumn{field="deliveryTypeSdtm",  header ="Delivery type - SDTM" }, 
new UIGridColumn{field="deliveryTypeSacq",  header ="Delivery type - SACQ" }, 
new UIGridColumn{field="deliveryTypeScrf",  header ="Delivery type - SCRF" }, 
new UIGridColumn{field="deliveryTypePostProcessed",  header ="Delivery type - Post-Processed" }, 
new UIGridColumn{field="timeSdtmgoLivePlanned",  header ="SDTM Go-live Date (Planned)", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeSdtmgoLiveActual",  header ="SDTM Go-live Date (Actual)", type="date", format="dd-MMM-yyyy", align="center" }, 

//Not found in Edit UI, therefore commented:
new UIGridColumn{field="cdstotalSdtmDatasetsInProduction",  header ="Total SDTM Datasets in Production" }, 
new UIGridColumn{field="cdsnumberSdtmDatasetsWithProgrammingErrors",  header ="Number SDTM Datasets with Programming Errors" }, 

new UIGridColumn{field="cdssasGrid",  header ="SAS GRID" }, 
// new UIGridColumn{field="cdscdsnetworkLocationPidlist",  header ="CDS Network Locations" }, 
new UIGridColumn{field="networkLocationValues",  header ="CDS Network Locations" , width=20}, 

new UIGridColumn{field="cdscdsComments",  header ="CDS Comments", width=20}, 
new UIGridColumn{field="cdsreportPartner",  header ="Report Partner" }, 
new UIGridColumn{field="cdsareStudyFoldersArchived",  header ="Are Study Folders archived" }, 
new UIGridColumn{field="cdsitArchiveTicketNumber",  header ="IT Archive Ticket Number" }, 
new UIGridColumn{field="cdsitArchiveTicketRequestDate",  header ="IT Archive Ticket Request Date", type="date", format="dd-MMM-yyyy", align="center" }}
//CodeBlockEnd
            };
        }
    }
}
