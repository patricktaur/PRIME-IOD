using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwReportCDMSTaskGroupV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "Report CDMS Task (By Task Group)",
FilterGroup = 9, //11,
Columns = new List<UIGridColumn>{
//CDMS Type not required, Third Party CDMS records have to be excluded from this report
//ref: email from Siobhan to Sathya dtd: 10Nov2022.    
//new UIGridColumn{field="cdmstype",  header ="CDMS Type" }, 
new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
new UIGridColumn{field="studyIconNumber",  header ="Icon number" }, 
new UIGridColumn{field="studyName",  header ="Study name", width=20 }, 
new UIGridColumn{field="therapeuticArea",  header ="Therapeutic Area", width=20 }, 
new UIGridColumn{field="studyStatusText",  header ="Study Status" }, 
new UIGridColumn{field="region",  header ="Region", width=20 }, 
new UIGridColumn{field="cdms",  header ="CDMS", width=20 }, 
new UIGridColumn{field="cdmsleadName",  header ="Primary CDMS Lead" }, 
new UIGridColumn{field="secondCdmslead",  header ="Covering CDMS Lead" }, 
new UIGridColumn{field="currentDmpm",  header ="DMPM", width=20 }, 
new UIGridColumn{field="cppcNo",  header ="CPPC Number" }, 
new UIGridColumn{field="taskGroupSplitGoLive",  header ="Split Go Live CPPC" }, 
new UIGridColumn{field="taskGroupTitle",  header ="Task Group Title" }, 
new UIGridColumn{field="cppcStatus",  header ="Task Status" }, 
new UIGridColumn{field="cppcreason",  header ="CPPC Reason" }, 
new UIGridColumn{field="numberOfCrfchanges",  header ="Number of CRF Changes" }, 
new UIGridColumn{field="numberOfEditChecks",  header ="Number of Edit Checks" }, 
new UIGridColumn{field="isSetUpText",  header ="Is SetUp" }, 
new UIGridColumn{field="taskStartedOn",  header ="CDMS Task Started On", type="date", format="dd-MMM-yyyy", align="center"  }, 
new UIGridColumn{field="taskCompletionDate",  header ="CDMS Task Planned Completion Date",  type="date", format="dd-MMM-yyyy", align="center"  }, 
new UIGridColumn{field="taskCompletedOn",  header ="CDMS Task Actual Completion Date", type="date", format="dd-MMM-yyyy", align="center"  }, 
new UIGridColumn{field="comments",  header ="Comments" }, 
new UIGridColumn{field="builddonebyIconPid",  header ="Database Build By Icon", align="center" }, 
new UIGridColumn{field="databaseBuildStartedOn",  header ="Database Build Started On" }, 
new UIGridColumn{field="databaseBuildPlannedDate",  header ="Database Build Planned Completion Date" }, 
new UIGridColumn{field="databaseBuildActualDate",  header ="Database Build Actual Completion Date" }, 
new UIGridColumn{field="databaseTestingStartedOn",  header ="Database Testing Started On" }, 
new UIGridColumn{field="databaseTestingPlannedDate",  header ="Database Testing Planned Completion Date" }, 
new UIGridColumn{field="databaseTestingActualDate",  header ="Database Testing Actual Completion Date" }, 
new UIGridColumn{field="dvsreviewStartedOn",  header ="DVS Review Started On" }, 
new UIGridColumn{field="dvsreviewPlannedDate",  header ="DVS Review Planned Completion Date" }, 
new UIGridColumn{field="dvsreviewActualDate",  header ="DVS Review Actual Completion Date" }, 
new UIGridColumn{field="testScriptDataWritingStartedOn",  header ="Test Script/Data Writing Started On" }, 
new UIGridColumn{field="testScriptDataWritingPlannedDate",  header ="Test Script/Data Writing Planned Completion Date" }, 
new UIGridColumn{field="testScriptDataWritingActualDate",  header ="Test Script/Data Writing Actual Completion Date" }, 
new UIGridColumn{field="editCheckProgrammingStartedOn",  header ="Edit Check Programming Started On" }, 
new UIGridColumn{field="editCheckProgrammingPlannedDate",  header ="Edit Check Programming Planned Completion Date" }, 
new UIGridColumn{field="editCheckProgrammingActualDate",  header ="Edit Check Programming Actual Completion Date" }, 
new UIGridColumn{field="round1EditCheckProgrammingStartedOn",  header ="Round 1 Edit Check Programming Started On" }, 
new UIGridColumn{field="round1EditCheckProgrammingPlannedDate",  header ="Round 1 Edit Check Programming Planned Completion Date" }, 
new UIGridColumn{field="round1EditCheckProgrammingActualDate",  header ="Round 1 Edit Check Programming Actual Completion Date" }, 
new UIGridColumn{field="round2EditCheckProgrammingStartedOn",  header ="Round 2 Edit Check Programming Started On" }, 
new UIGridColumn{field="round2EditCheckProgrammingPlannedDate",  header ="Round 2 Edit Check Programming Planned Completion Date" }, 
new UIGridColumn{field="round2EditCheckProgrammingActualDate",  header ="Round 2 Edit Check Programming Actual Completion Date" }, 
new UIGridColumn{field="editCheckValidationStartedOn",  header ="Edit Check Validation Started On" }, 
new UIGridColumn{field="editCheckValidationPlannedDate",  header ="Edit Check Validation Planned Completion Date" }, 
new UIGridColumn{field="editCheckValidationActualDate",  header ="Edit Check Validation Actual Completion Date" }, 
new UIGridColumn{field="internalUatstartedOn",  header ="Internal UAT Started On" }, 
new UIGridColumn{field="internalUatplannedDate",  header ="Internal UAT Planned Completion Date" }, 
new UIGridColumn{field="internalUatactualDate",  header ="Internal UAT Actual Completion Date" }, 
new UIGridColumn{field="externalUatstartedOn",  header ="External UAT Started On" }, 
new UIGridColumn{field="externalUatplannedDate",  header ="External UAT Planned Completion Date" }, 
new UIGridColumn{field="externalUatactualDate",  header ="External UAT Actual Completion Date" }, 
new UIGridColumn{field="migrationConfigurationStartedOn",  header ="Migration Configuration Started On" }, 
new UIGridColumn{field="migrationConfigurationPlannedDate",  header ="Migration Configuration Planned Completion Date" }, 
new UIGridColumn{field="migrationConfigurationActualDate",  header ="Migration Configuration Actual Completion Date" }, 
new UIGridColumn{field="migrationTestingStartedOn",  header ="Migration Testing Started On" }, 
new UIGridColumn{field="migrationTestingPlannedDate",  header ="Migration Testing Planned Completion Date" }, 
new UIGridColumn{field="migrationTestingActualDate",  header ="Migration Testing Actual Completion Date" }, 
new UIGridColumn{field="goliveStartedOn",  header ="Go-live Started On" }, 
new UIGridColumn{field="golivePlannedDate",  header ="Go-live Planned Completion Date" }, 
new UIGridColumn{field="goliveActualDate",  header ="Go-live Actual Completion Date" }}
//CodeBlockEnd
            };
        }
    }
}
