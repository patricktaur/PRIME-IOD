using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class VwStudyTimeLinesV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "Timelines",
FilterGroup = 1,
SortedByFields = "ICON Number",
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
new UIGridColumn{field="region",  header ="Region" }, 
new UIGridColumn{field="portfolio",  header ="Portfolio" }, 
new UIGridColumn{field="sponsor",  header ="Sponsor" }, 
new UIGridColumn{field="studyName",  header ="Study Name", width=30  }, 
new UIGridColumn{field="dataBaseBuildComplexityFactor",  header ="Build", type="number", align="center" }, 
new UIGridColumn{field="buildRiskScore",  header ="Build RiskScore", type="number", format="1.2-2", align="center" }, 
new UIGridColumn{field="tEnCComplexityFactor",  header ="TE&C CF", type="number", align="center" }, 
new UIGridColumn{field="tenCriskScore",  header ="TE&C RiskScore", type="number", format="1.2-2", align="center" }, 
new UIGridColumn{field="cdms",  header ="CDMS" }, 
new UIGridColumn{field="studyStatusText",  header ="Study Status" }, 
new UIGridColumn{field="protocolPhase",  header ="Protocol Phase", width=30  }, 
new UIGridColumn{field="therapeuticArea",  header ="Therapeutic Area", width=30  }, 
new UIGridColumn{field="indication",  header ="Indication", width=30  }, 
new UIGridColumn{field="currentDmpmManager",  header ="DIR", width=30  }, 
new UIGridColumn{field="currentDmpm",  header ="DMPM", width=30  }, 
new UIGridColumn{field="timeProtocolApprovalPlanned",  header ="Planned Protocol Approval", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeProtocolApprovalActual",  header ="Actual Protocol Approval", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeCrfapprovalPlanned",  header ="Planned CRF Approval", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeCrfapprovalActual",  header ="Actual CRF Approval", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeEdcscreensGoLivePlanned",  header ="Planned EDC Screens Golive Type", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeEdcscreensGoLiveActual",  header ="Actual EDC Screens Golive", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeDmpsignedOffPlanned",  header ="Planned DMPM Signed Off", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeDmpsignedOffActual",  header ="Actual DMP Signed Off", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeCdmsgolivePlanned",  header ="Planned CDMS Golive", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeCdmsgoLiveActual",  header ="Actual CDMS Golive", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeFpiPlanned",  header ="Planned FPI", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeFpiActual",  header ="Actual FPI", type="date", format="dd-MMM-yyyy", align="center" }, 
              
new UIGridColumn{field="timeCptinProductionPlanned",  header ="Planned CPT in Production", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeCptinProductionActual",  header ="Actual CPT in Production", type="date", format="dd-MMM-yyyy", align="center" }, 

new UIGridColumn{field="timeSdtmgoLivePlannedValue",  header ="Planned SDTM Golive Date", type="date", format="dd-MMM-yyyy" }, 
new UIGridColumn{field="timeSdtmgoLiveActualValue",  header ="Actual SDTM Golive Date", type="date", format="dd-MMM-yyyy" }, 
new UIGridColumn{field="timeLpiPlanned",  header ="Planned LPI", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeLpiActual",  header ="Actual LPI", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeLpoPlanned",  header ="Planned LPO", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeLpoActual",  header ="Actual LPO", type="date", format="dd-MMM-yyyy", align="center" }, 

new UIGridColumn{field="timeLastDataEnteredPlanned",  header ="Planned Last Data Entered", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeLastDataEnteredActual",  header ="Actual Last Data Entered", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeLastExternalDataReceivedPlanned",  header ="Planned Last External Data Received", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeLastExternalDataReceivedActual",  header ="Actual Last External Data Received", type="date", format="dd-MMM-yyyy", align="center" }, 


new UIGridColumn{field="time25percentPtcleanPlanned",  header ="Planned 25% PT Clean", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="time25percentPtcleanActual",  header ="Actual 25% PT Clean", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeMainSoftLockPlanned",  header ="Planned Main Soft Lock Type", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeMainSoftLockActual",  header ="Actual Main Soft Lock", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeMainDblPlanned",  header ="Planned Main DBL", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeMainDblActual",  header ="Actual Main DBL", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeFollowUpLpoPlanned",  header ="Planned FollowUp LPO", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeFollowUpLpoActual",  header ="Actual FollowUp LPO", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeFollowUpSoftLockPlanned",  header ="Planned FollowUp SoftLock", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeFollowUpSoftLockActual",  header ="Actual FollowUp SoftLock", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeFollowUpDblPlanned",  header ="Planned FollowUp DBL", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeFollowUpDblActual",  header ="Actual FollowUp DBL", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeFinalTmfarchivedPlanned",  header ="Planned Final TMF Archived", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="timeFinalTmfarchivedActual",  header ="Actual Final TMF Archived", type="date", format="dd-MMM-yyyy", align="center" }, 
new UIGridColumn{field="builddonebyIconPid",  header ="Database Build by ICON", align="center" }, 
new UIGridColumn{field="specialProject",  header ="Special Project", align="center" }}
//CodeBlockEnd
            };
        }
    }
}
