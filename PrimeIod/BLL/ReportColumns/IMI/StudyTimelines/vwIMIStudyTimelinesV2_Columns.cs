using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwIMIStudyTimelinesV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart
                Title = "IMI Timelines",
                FilterGroup = 14,
                Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
                new UIGridColumn{field="studyName",  header ="Protocol Name", width=20 }, 
                new UIGridColumn{field="region",  header ="Region", width=20 }, 
                new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, 
                new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
                // new UIGridColumn{field="cdms",  header ="IMICDMS" }, 
                // new UIGridColumn{field="studyStatus",  header ="Study Status" } ,
                new UIGridColumn{field="awardNotificationPlanned",  header ="Planned Award Notification", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="awardNotificationActual",  header ="Actual  Award Notification", type="date", format="dd-MMM-yyyy", align="center" }, 
                
                new UIGridColumn{field="communicationPlanPlanned",  header ="Planned CommunicationPlan Complete", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="communicationPlanActual",  header ="Actual  CommunicationPlan Complete", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="contractexecutionPlanned",  header ="Planned Contract Execution", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="contractexecutionActual",  header ="Actual  Planned Contract Execution", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="dataDeliverySpecificationInboundPlanned",  header ="Planned Data Delivery Specification (DDS) Inbound Complete", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="dataDeliverySpecificationInboundActual",  header ="Actual  Data Delivery Specification (DDS) Inbound Complete", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="dataDeliverySpecificationOutboundPlanned",  header ="Planned Data Delivery Specification Outbound Complete", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="dataDeliverySpecificationOutboundActual",  header ="Actual  Data Delivery Specification Outbound Complete", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="databaseLockPlanned",  header ="Planned Database Lock", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="databaseLockActual",  header ="Actual  Database Lock", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="edcinstallationPlanned",  header ="Planned Edc Installation Complete", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="edcinstallationActual",  header ="Actual Edc Installation Complete", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="finalProtocolsignaturesPlanned",  header ="Planned  FinalProtocol Signatures", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="finalProtocolsignaturesActual",  header ="Actual FinalProtocol Signatures", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="finalReadDeliveryPlanned",  header ="Planned Final Read Delivery", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="finalReadDeliveryActual",  header ="Actual  Final Read Delivery", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="firstPatientInPlanned",  header ="Planned First Patient In (Screened/Enrolled/Randomized)", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="firstPatientInActual",  header ="Actual First Patient In (Screened/Enrolled/Randomized)", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="imageUploadConfigurationPlanned",  header ="Planned Image Upload Configuration Complete", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="imageUploadConfigurationActual",  header ="Actual Image Upload Configuration Complete", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="imagingManualcompletePlanned",  header ="Planned Imaging Manual Complete", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="imagingManualcompleteActual",  header ="Actual Imaging Manual Complete", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="imiinvolvementbeginsPlanned",  header ="Planned Imi Involvement Begins", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="imiinvolvementbeginsActual",  header ="Actual Imi Involvement Begins", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="imiinvolvementendsPlanned",  header ="Planned Imi Involvement Ends", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="imiinvolvementendsActual",  header ="Actual Imi Involvement Ends", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="independentReviewCharterPlanned",  header ="Planned Independent Review Charter Complete", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="independentReviewCharterActual",  header ="Actual Independent Review Charter Complete", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="independentReviewTrainingManualPlanned",  header ="Planned Independent Review Training Manual (IRTM) Complete", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="independentReviewTrainingManualActual",  header ="Actual Independent Review Training Manual (IRTM) Complete", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="ipopcompletePlanned",  header ="Planned Ipop Complete", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="ipopcompleteActual",  header ="Actual Ipop Complete", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="lastPatientInPlanned",  header ="Planned Last Patient In (Screened/Enrolled/Randomized)", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="lastPatientInActual",  header ="Actual Last Patient In (Screened/Enrolled/Randomized)", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="lastPatientOutPlanned",  header ="Planned Last Patient Out / Last Patient Last Visit", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="lastPatientOutActual",  header ="Actual Last Patient Out / Last Patient Last Visit", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="msachecksSpecificationsPlanned",  header ="Planned MSA Checks Specifications Complete Main DBL", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="msachecksSpecificationsActual",  header ="Actual MSA Checks Specifications Complete Main DBL", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="programmingStartPlanned",  header ="Planned Programming Start", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="programmingStartActual",  header ="Actual Programming Start", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="qaapprovalPlanned",  header ="Planned QA Approval", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="qaapprovalActual",  header ="Actual QA Approval", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="readerPerformanceSetupPlanned",  header ="Planned Reader Performance Setup Complete", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="readerPerformanceSetupActual",  header ="Actual Reader Performance Setup Complete", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="sponsorApprovalPlanned",  header ="Planned Sponsor Approval of EDC", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="sponsorApprovalActual",  header ="Actual Sponsor Approval of EDC", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="systemsRequirementSpecificationPlanned",  header ="Planned Systems Requirement Specification (SRS) Complete", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="systemsRequirementSpecificationActual",  header ="Actual Systems Requirement Specification (SRS) Complete", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="uatTestingHandoverPlanned",  header ="Planned UAT / Testing Handover", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="uatTestingHandoverActual",  header ="Actual UAT / Testing Handover", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="uatapprovalPlanned",  header ="Planned UAT Approval", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="uatapprovalActual",  header ="Actual UAT Approval", type="date", format="dd-MMM-yyyy", align="center" }, 

                new UIGridColumn{field="validationcompletePlanned",  header ="Planned Validation Complete", type="date", format="dd-MMM-yyyy", align="center" }, 
                new UIGridColumn{field="validationcompleteActual",  header ="Actual Validation Complete", type="date", format="dd-MMM-yyyy", align="center" }, 

                
                }
                
                //CodeBlockEnd
            };
        }
    }
}