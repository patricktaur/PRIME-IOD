using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class VwStudyDetailsV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "Study Details",
FilterGroup = 1,
SortedByFields = "ICON Number",
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
new UIGridColumn{field="region",  header ="Region" }, 
new UIGridColumn{field="portfolio",  header ="Portfolio" }, 
new UIGridColumn{field="sponsor",  header ="Sponsor" }, 
new UIGridColumn{field="studyName",  header ="Study Name", width=30  }, 
new UIGridColumn{field="studyNameComment",  header ="Study Name Comment", width=30  }, 

new UIGridColumn{field="drtPid",  header ="DRT" }, 
new UIGridColumn{field="drtlink",  header ="DRT Link" , width=30}, 

new UIGridColumn{field="currentDmpmManager",  header ="Director" }, 
new UIGridColumn{field="dmOversightDerived",  header ="DM Oversight" }, 
new UIGridColumn{field="currentDmpm",  header ="DMPM" }, 
new UIGridColumn{field="currentCDL",  header ="CDL" }, 
new UIGridColumn{field="cdmslead",  header ="CDMS Lead" }, 
new UIGridColumn{field="clinicalDataDeliveryLead",  header ="CDPL Clinical Data Programming" }, 
new UIGridColumn{field="sdtmLead",  header ="CDPL SDTM Programming" }, 
new UIGridColumn{field="studyStatusText",  header ="Status" }, 
new UIGridColumn{field="cdms",  header ="CDMS" }, 
new UIGridColumn{field="therapeuticArea",  header ="Therapeutic Area", width=30  }, 
new UIGridColumn{field="subTA",  header ="Sub-TA" }, 
new UIGridColumn{field="indication",  header ="Indication", width=30  }, 
new UIGridColumn{field="fpiText",  header ="FPI" }, 
new UIGridColumn{field="mainDBLText",  header ="Main DBL" }, 
new UIGridColumn{field="followUpDBLText",  header ="FollowUP DBL" }, 
new UIGridColumn{field="repeatBusinessPid",  header ="Repeat Business", align="center" }, 
new UIGridColumn{field="dmstandalonePid",  header ="DM Standalone", align="center" }, 
new UIGridColumn{field="builddonebyIconPid",  header ="Database Build by ICON", align="center" }, 
new UIGridColumn{field="sops",  header ="SOPs" }, 
new UIGridColumn{field="ePro",  header ="ePRO" }, 
new UIGridColumn{field="eProvendorName",  header ="ePRO Vendor Name", width=30  }, 
new UIGridColumn{field="localLabsPid",  header ="Local Labs", align="center" }, 
new UIGridColumn{field="specialPopulation",  header ="Special Population" }, 
new UIGridColumn{field="iconCodingPid",  header ="Icon Coding", align="center" }, 
new UIGridColumn{field="otherIconDeptClinicalPid",  header ="Other ICON Dept:Clinical", align="center" }, 
new UIGridColumn{field="otherIconDeptClinicalMonitoringPid",  header ="Other ICON Dept:Clinical Monitoring", align="center" }, 
new UIGridColumn{field="otherIconDeptMedicalPid",  header ="Other ICON Dept:Medical", align="center" }, 
new UIGridColumn{field="otherIconDeptLabPid",  header ="Other ICON Dept:Lab", align="center" }, 
new UIGridColumn{field="otherIconDeptFirecrestPid",  header ="Other ICON Dept:Firecrest", align="center" }, 
new UIGridColumn{field="otherIconDeptBiostatsPid",  header ="Other ICON Dept:BioStatistics", align="center" }, 
new UIGridColumn{field="otherIconDeptECoaPid",  header ="Other ICON Dept:eCOA", align="center" }, 
new UIGridColumn{field="otherIconDeptImiPid",  header ="Other ICON Dept:IMI", align="center" }, 
new UIGridColumn{field="otherIconDeptIconikPid",  header ="Other ICON Dept:ICONIK", align="center" }, 
new UIGridColumn{field="totalDMStudyDurationMonths",  header ="Total DM Study Duration Months" }, 
new UIGridColumn{field="averagePagesPerMonth",  header ="Avg Pages per Month" }, 
new UIGridColumn{field="protocolPhase",  header ="Protocol Phase" }, 
new UIGridColumn{field="rescueStudyPid",  header ="Rescue Study", align="center" }, 
new UIGridColumn{field="sdtmPid",  header ="SDTM", align="center" }, 
new UIGridColumn{field="externalDataSources",  header ="External Data Source", align="center" }, 
new UIGridColumn{field="unblindingactivitiesduringstudyPid",  header ="Unblinding Activities During Study", align="center" }, 
new UIGridColumn{field="sites",  header ="Sites", align="center" }, 
new UIGridColumn{field="tmf",  header ="TMF" }, 
new UIGridColumn{field="splitGoLiveText",  header ="Split-Go-Live", align="center" }, 
new UIGridColumn{field="tmfqcperiodicity",  header ="TMF QC Periodicity", align="center" }, 
new UIGridColumn{field="tmfqcperiodicityComment",  header ="TMF QC Periodicity Comments", width=30  }, 
new UIGridColumn{field="specialProject",  header ="Special Project", align="center" }, 
new UIGridColumn{field="dmpmrequired",  header ="DMPM Required", align="center" }, 
new UIGridColumn{field="cdmsGoLiveText",  header ="CDMS Go-live" }}
//CodeBlockEnd
            };
        }
    }
}
