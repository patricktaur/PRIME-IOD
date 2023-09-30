using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwIMIStudyReviewV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            var actionGrp = "action";
            var commentGrp = "comment";
            return 
            new UIGridProperties{
                //CodeBlockStart
                Title = "IMI Review Report",
                FilterGroup = 0, //included in the report component 
                Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="ICON Number" }, 
                new UIGridColumn{field="studyName",  header ="Protocol Name", width=20 }, 
                new UIGridColumn{field="region",  header ="Region", width=20 }, 
                new UIGridColumn{field="portfolio",  header ="Portfolio", width=20 }, 
                new UIGridColumn{field="sponsor",  header ="Sponsor", width=20 }, 
                new UIGridColumn{field="studyStatusText",  header ="Study Status" } ,
                new UIGridColumn{field="reviewIndex",  header ="Review Number", align="right" } ,

                new UIGridColumn{field="imiPm",  header ="IMI PM" } ,
                new UIGridColumn{field="imipmPdReviewedOn",  header ="IMI PM Reviewed On" , type="date", format="dd-MMM-yyyy", align="center"} ,

                new UIGridColumn{field="imipmPd",  header ="IMI PD" } ,
                new UIGridColumn{field="imipmPdReviewedOn",  header ="IMI PD Reviewed On" , type="date", format="dd-MMM-yyyy", align="center"} ,

                new UIGridColumn{field="watchlistText",  header ="Watch List", align="center" } ,
                new UIGridColumn{field="watchlistComment",  header ="Watch Comment", align="center" } ,
                new UIGridColumn{field="escalatedText",  header ="Escalated", align="center" } ,
                new UIGridColumn{field="escalatedComment",  header ="Escalated Comment", align="center" } ,

                new UIGridColumn{field="overallProjectScore",  header ="Overall Project Score", align="center" } ,
                new UIGridColumn{field="overideProjectScore",  header ="Override Project Score", align="center" } ,
                new UIGridColumn{field="readerperformance",  header ="Reader Performance & Quality Management", align="center" } ,
                
                //Project Status Dashbard
                new UIGridColumn{field="projectStatusDashboardReview",  header ="Project Status Dashboard Review Score", align="center" } ,
                new UIGridColumn{field="projectStatusDashboardReviewComments", hide=true, hideGroup = commentGrp,  header = "Project Status Dashboard Review Score Comments", width=20 }, 
                new UIGridColumn{field="projectStatusDashboardReviewAction", hide=true, hideGroup = actionGrp, header ="Project Status Dashboard Review Score Action", width=20 }, 

                new UIGridColumn{field="status",  header ="Status, Trend and Risk Review using IMI Dashboard, IMI Metrics report (MCC), MIRA reports or equivalent data visualization/trending tools Score", align="center" } ,
                new UIGridColumn{field="statusComments", hide=true, hideGroup = commentGrp,  header = "Status, Trend and Risk Review using IMI Dashboard, IMI Metrics report (MCC), MIRA reports or equivalent data visualization/trending tools Comments", width=20 }, 
                new UIGridColumn{field="statusAction", hide=true, hideGroup = actionGrp, header ="Status, Trend and Risk Review using IMI Dashboard, IMI Metrics report (MCC), MIRA reports or equivalent data visualization/trending tools Action", width=20 }, 

                new UIGridColumn{field="protocolAmendment",  header ="Protocol Amendment Score", align="center" } ,
                new UIGridColumn{field="protocolAmendmentComments", hide=true, hideGroup = commentGrp,  header = "Protocol Amendment Comments", width=20 }, 
                new UIGridColumn{field="protocolAmendmentActions", hide=true, hideGroup = actionGrp, header ="Protocol Amendment Action", width=20 }, 

                new UIGridColumn{field="protocolAmendmentImpactAssessment",  header ="Protocol Amendment Impact Assessment Complete (e.g. documentation / system updates required ?) Score", align="center" } ,
                new UIGridColumn{field="protocolAmendmentImpactAssessmentComments", hide=true, hideGroup = commentGrp,  header = "Protocol Amendment Impact Assessment Complete (e.g. documentation / system updates required ?) Comments", width=20 }, 
                new UIGridColumn{field="protocolAmendmentImpactAssessmentActions", hide=true, hideGroup = actionGrp, header ="Protocol Amendment Impact Assessment Complete (e.g. documentation / system updates required ?) Action", width=20 }, 

                //Milestones

                new UIGridColumn{field="milestonesandTimelines",  header ="Milestones and Timelines", align="center" } ,
                new UIGridColumn{field="milestonesandTimelinesComments", hide=true, hideGroup = commentGrp,  header = "Milestones and Timelines Comments", width=20 }, 
                new UIGridColumn{field="milestonesandTimelinesAction", hide=true, hideGroup = actionGrp, header ="Milestones and Timelines Action", width=20 }, 

                new UIGridColumn{field="reviewofupcomingmilestones",  header ="Review of upcoming milestones (across all functions) Score", align="center" } ,
                new UIGridColumn{field="reviewofupcomingmilestonesComments", hide=true, hideGroup = commentGrp,  header = "Review of upcoming milestones (across all functions) Comments", width=20 }, 
                new UIGridColumn{field="reviewofupcomingmilestonesAction", hide=true, hideGroup = actionGrp, header ="Review of upcoming milestones (across all functions) Action", width=20 }, 

                new UIGridColumn{field="projectManagementPlan",  header ="Project Management Plan Score", align="center" } ,
                new UIGridColumn{field="projectManagementPlanComments", hide=true, hideGroup = commentGrp,  header = "Project Management Plan Comments", width=20 }, 
                new UIGridColumn{field="projectManagementPlanAction", hide=true, hideGroup = actionGrp, header ="Project Management Plan Action", width=20 }, 

                //Risk Management
                new UIGridColumn{field="riskManagement",  header ="Risk Management Score", align="center" } ,
                new UIGridColumn{field="riskManagementComments", hide=true, hideGroup = commentGrp,  header = "Risk Management Comments", width=20 }, 
                new UIGridColumn{field="riskManagementAction", hide=true, hideGroup = actionGrp, header ="Risk Management Action", width=20 }, 

                new UIGridColumn{field="riskManagementPlanOrem",  header ="Risk Management Plan/Log in place (ORIM) Score", align="center" } ,
                new UIGridColumn{field="riskManagementPlanOremcomments", hide=true, hideGroup = commentGrp,  header = "Risk Management Plan/Log in place (ORIM) Comments", width=20 }, 
                new UIGridColumn{field="riskManagementPlanOremaction", hide=true, hideGroup = actionGrp, header ="Risk Management Plan/Log in place (ORIM) Action", width=20 }, 

                new UIGridColumn{field="reviewofKeyProjectRisks",  header ="Review of Key Project Risks (per risk plan) Score", align="center" } ,
                new UIGridColumn{field="reviewofKeyProjectRisksComments", hide=true, hideGroup = commentGrp,  header = "Review of Key Project Risks (per risk plan) Comments", width=20 }, 
                new UIGridColumn{field="reviewofKeyProjectRisksAction", hide=true, hideGroup = actionGrp, header ="Review of Key Project Risks (per risk plan) Action", width=20 }, 

                ////Startup:
                
                new UIGridColumn{field="studyStartUp",  header ="Study Start Up Score", align="center" } ,
                new UIGridColumn{field="studyStartUpComments", hide=true, hideGroup = commentGrp,  header = "Study Start Up Comments", width=20 }, 
                new UIGridColumn{field="studyStartUpAction", hide=true, hideGroup = actionGrp, header ="Study Start Up Action", width=20 }, 

                new UIGridColumn{field="receiveSiteListfromSponsorCro",  header ="Receive Site List from Sponsor / CRO, Site Imaging Manual (Sim), SIM Translation (if Required), Image Data Transfer set-up, Randomization set-up Score", align="center" } ,
                new UIGridColumn{field="receiveSiteListfromSponsorCrocomments", hide=true, hideGroup = commentGrp,  header = "Receive Site List from Sponsor / CRO, Site Imaging Manual (Sim), SIM Translation (if Required), Image Data Transfer set-up, Randomization set-up Comments", width=20 }, 
                new UIGridColumn{field="receiveSiteListfromSponsorCroaction", hide=true, hideGroup = actionGrp, header ="Receive Site List from Sponsor / CRO, Site Imaging Manual (Sim), SIM Translation (if Required), Image Data Transfer set-up, Randomization set-up Action", width=20 }, 

                new UIGridColumn{field="dataHandlingPlanProcedureManual",  header ="Data Handling Plan / Procedure Manual (Periodic Review: Yearly) Score", align="center" } ,
                new UIGridColumn{field="dataHandlingPlanProcedureManualComments", hide=true, hideGroup = commentGrp,  header = "Data Handling Plan / Procedure Manual (Periodic Review: Yearly) Comments", width=20 }, 
                new UIGridColumn{field="dataHandlingPlanProcedureManualAction", hide=true, hideGroup = actionGrp, header ="Data Handling Plan / Procedure Manual (Periodic Review: Yearly) Action", width=20 }, 

                new UIGridColumn{field="staffingPlan",  header ="Staffing Plan & User Access Management (Periodic Review: Bi-annually) Score", align="center" } ,
                new UIGridColumn{field="staffingPlanComments", hide=true, hideGroup = commentGrp,  header = "Staffing Plan & User Access Management (Periodic Review: Bi-annually) Comments", width=20 }, 
                new UIGridColumn{field="staffingPlanAction", hide=true, hideGroup = actionGrp, header ="Staffing Plan & User Access Management (Periodic Review: Bi-annually) Action", width=20 }, 

                new UIGridColumn{field="readercontractsvendorandcontracts",  header ="Reader Selection and Contracts: Vendor Selection and Contracts Score", align="center" } ,
                new UIGridColumn{field="readercontractsvendorandcontractsComments", hide=true, hideGroup = commentGrp,  header = "Reader Selection and Contracts: Vendor Selection and Contracts Comments", width=20 }, 
                new UIGridColumn{field="readercontractsvendorandcontractsAction", hide=true, hideGroup = actionGrp, header ="Reader Selection and Contracts: Vendor Selection and Contracts Action", width=20 }, 

                new UIGridColumn{field="reconciliationSpecification",  header ="Reconciliation Specification Score", align="center" } ,
                new UIGridColumn{field="reconciliationSpecificationComments", hide=true, hideGroup = commentGrp,  header = "Reconciliation Specification Comments", width=20 }, 
                new UIGridColumn{field="reconciliationSpecificationAction", hide=true, hideGroup = actionGrp, header ="Reconciliation Specification Action", width=20 }, 


                // //Image Data and Read Forecatings:
                
                new UIGridColumn{field="imageDataandReadForecasting",  header ="Image Data and Read Forecasting Score", align="center" } ,
                new UIGridColumn{field="imageDataandReadForecastingAction", hide=true, hideGroup = commentGrp,  header = "Image Data and Read Forecasting Comments", width=20 }, 
                new UIGridColumn{field="imageDataandReadForecastingAction", hide=true, hideGroup = actionGrp, header ="Image Data and Read Forecasting Action", width=20 }, 

                new UIGridColumn{field="projectlevelrecruitmentplans",  header ="Read strategy document and project level recruitment plans Score", align="center" } ,
                new UIGridColumn{field="projectlevelrecruitmentplansComments", hide=true, hideGroup = commentGrp,  header = "Read strategy document and project level recruitment plans Comments", width=20 }, 
                new UIGridColumn{field="projectlevelrecruitmentplansAction", hide=true, hideGroup = actionGrp, header ="Read strategy document and project level recruitment plans Action", width=20 }, 

                new UIGridColumn{field="subjectRead",  header ="Subject Read (status, curves and strategies) Score", align="center" } ,
                new UIGridColumn{field="subjectReadComments", hide=true, hideGroup = commentGrp,  header = "Subject Read (status, curves and strategies) Comments", width=20 }, 
                new UIGridColumn{field="subjectReadAction", hide=true, hideGroup = actionGrp, header ="Subject Read (status, curves and strategies) Action", width=20 }, 

                // //EDC Documentation
                
                new UIGridColumn{field="edcdocumentationDevelopment",  header ="EDC Documentation/Development Score", align="center" } ,
                new UIGridColumn{field="edcdocumentationDevelopmentComments", hide=true, hideGroup = commentGrp,  header = "EDC Documentation/Development Comments", width=20 }, 
                new UIGridColumn{field="edcdocumentationDevelopmentAction", hide=true, hideGroup = actionGrp, header ="EDC Documentation/Development Action", width=20 }, 

                new UIGridColumn{field="independentReadCharter",  header ="Independent Read Charter Score", align="center" } ,
                new UIGridColumn{field="independentReadCharterComments", hide=true, hideGroup = commentGrp,  header = "Independent Read Charter Comments", width=20 }, 
                new UIGridColumn{field="independentReadCharterAction", hide=true, hideGroup = actionGrp, header ="Independent Read Charter Action", width=20 }, 

                new UIGridColumn{field="systemsRequirementSpecificationsSrs",  header ="System Requirement Specifications (SRS) / Configuration Specifications Score", align="center" } ,
                new UIGridColumn{field="systemsRequirementSpecificationsSrscomments", hide=true, hideGroup = commentGrp,  header = "System Requirement Specifications (SRS) / Configuration Specifications Comments", width=20 }, 
                new UIGridColumn{field="systemsRequirementSpecificationsSrsaction", hide=true, hideGroup = actionGrp, header ="System Requirement Specifications (SRS) / Configuration Specifications Action", width=20 }, 

                new UIGridColumn{field="independentReviewTrainingManual",  header ="Independent Review Training Manual (IRTM) Score", align="center" } ,
                new UIGridColumn{field="independentReviewTrainingManualComments", hide=true, hideGroup = commentGrp,  header = "Independent Review Training Manual (IRTM) Comments", width=20 }, 
                new UIGridColumn{field="independentReviewTrainingManualAction", hide=true, hideGroup = actionGrp, header ="Independent Review Training Manual (IRTM) Action", width=20 }, 

                new UIGridColumn{field="dataDeliverySpecificationInbound",  header ="Data Delivery Specification (DDS) Inbound Score", align="center" } ,
                new UIGridColumn{field="dataDeliverySpecificationInboundComments", hide=true, hideGroup = commentGrp,  header = "Data Delivery Specification (DDS) Inbound Comments", width=20 }, 
                new UIGridColumn{field="dataDeliverySpecificationInboundAction", hide=true, hideGroup = actionGrp, header ="Data Delivery Specification (DDS) Inbound Action", width=20 }, 


                new UIGridColumn{field="dataDeliverySpecificationOutbound",  header ="Data Delivery Specification (DDS) Inbound Score", align="center" } ,
                new UIGridColumn{field="dataDeliverySpecificationOutboundComments", hide=true, hideGroup = commentGrp,  header = "Data Delivery Specification (DDS) Inbound Comments", width=20 }, 
                new UIGridColumn{field="dataDeliverySpecificationOutboundAction", hide=true, hideGroup = actionGrp, header ="Data Delivery Specification (DDS) Inbound Action", width=20 }, 

                new UIGridColumn{field="dataDeliverySpecificationOutbound",  header ="Data Delivery Specification (DDS) Inbound Score", align="center" } ,
                new UIGridColumn{field="dataDeliverySpecificationOutboundComments", hide=true, hideGroup = commentGrp,  header = "Data Delivery Specification (DDS) Inbound Comments", width=20 }, 
                new UIGridColumn{field="dataDeliverySpecificationOutboundAction", hide=true, hideGroup = actionGrp, header ="Data Delivery Specification (DDS) Inbound Action", width=20 }, 

                new UIGridColumn{field="programmingConfiguration",  header ="Programming/Configuration Score", align="center" } ,
                new UIGridColumn{field="programmingConfigurationComments", hide=true, hideGroup = commentGrp,  header = "Programming/Configuration Comments", width=20 }, 
                new UIGridColumn{field="programmingConfigurationAction", hide=true, hideGroup = actionGrp, header ="Programming/Configuration Action", width=20 }, 

                new UIGridColumn{field="userAcceptanceTesting",  header ="User Acceptance Testing (UAT) Score", align="center" } ,
                new UIGridColumn{field="userAcceptanceTestingComments", hide=true, hideGroup = commentGrp,  header = "User Acceptance Testing (UAT) Comments", width=20 }, 
                new UIGridColumn{field="userAcceptanceTestingAction", hide=true, hideGroup = actionGrp, header ="User Acceptance Testing (UAT) Action", width=20 }, 

                new UIGridColumn{field="sponsorDemoValidation",  header ="Sponsor Demo & Validation Score", align="center" } ,
                new UIGridColumn{field="sponsorDemoValidationComments", hide=true, hideGroup = commentGrp,  header = "Sponsor Demo & Validation Comments", width=20 }, 
                new UIGridColumn{field="sponsorDemoValidationAction", hide=true, hideGroup = actionGrp, header ="Sponsor Demo & Validation Action", width=20 }, 

                new UIGridColumn{field="edcinstallationGoLive",  header ="EDC Installation/Go Live Score", align="center" } ,
                new UIGridColumn{field="edcinstallationGoLiveComments", hide=true, hideGroup = commentGrp,  header = "EDC Installation/Go Live Comments", width=20 }, 
                new UIGridColumn{field="edcinstallationGoLiveAction", hide=true, hideGroup = actionGrp, header ="EDC Installation/Go Live Action", width=20 }, 

                new UIGridColumn{field="edcPierdata",  header ="EDC/PIER Data Uploading (as required) Score", align="center" } ,
                new UIGridColumn{field="edcPierdataComments",   header = "EDC/PIER Data Uploading (as required) Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="edcPierdataAction",  header ="EDC/PIER Data Uploading (as required) Action", hide=true, hideGroup = actionGrp, width=20 }, 


                new UIGridColumn{field="postreleasesystem",  header ="Post Release System Support Score", align="center" } ,
                new UIGridColumn{field="postreleasesystemComments",   header = "Post Release System Support Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="postreleasesystemAction",  header ="Post Release System Support Action", hide=true, hideGroup = actionGrp, width=20 }, 


                
                
                // //Reader Training

                new UIGridColumn{field="readerTraining",  header ="Reader Training Score", align="center" } ,
                new UIGridColumn{field="readerTrainingComments",   header = "Reader Training Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="readerTrainingAction",  header ="Reader Training Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="readertrainingEdccompletion",  header ="Reader Training, EDC Completion Score", align="center" } ,
                new UIGridColumn{field="readertrainingEdccompletionComments",   header = "Reader Training, EDC Completion Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="readertrainingEdccompletionAction",  header ="Reader Training, EDC Completion Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="readerretraining",  header ="Reader Re-Training at Pre-defined Timepoints Score", align="center" } ,
                new UIGridColumn{field="readerretrainingComments",   header = "Reader Re-Training at Pre-defined Timepoints Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="readerretrainingAction",  header ="Reader Re-Training at Pre-defined Timepoints Action", hide=true, hideGroup = actionGrp, width=20 }, 

                // //Management of Readers:

                new UIGridColumn{field="managementReaders",  header ="Management of Readers Score", align="center" } ,
                new UIGridColumn{field="managementReadersComments",   header = "Management of Readers Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="managementReadersAction",  header ="Management of Readers Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="confirmationcontracts",  header ="Confirmation of contracts Score", align="center" } ,
                new UIGridColumn{field="confirmationcontractsComments",   header = "Confirmation of contracts Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="confirmationcontractsAction",  header ="Confirmation of contracts Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="readtimelines",  header ="Read Timelines Score", align="center" } ,
                new UIGridColumn{field="readtimelinesComments",   header = "Read Timelines Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="readtimelinesAction",  header ="Read Timelines Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="readeravailability",  header ="Reader Avaliability (Vacation / OOO) Score", align="center" } ,
                new UIGridColumn{field="readeravailabilityComments",   header = "Reader Avaliability (Vacation / OOO) Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="readeravailabilityAction",  header ="Reader Avaliability (Vacation / OOO) Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="readerperformance",  header ="Reader Performance & Quality Management e.g. Time to read Report, Criteria Adherence, Personal Adjudication Rate, ASR Report, Intra-Reader Variability Score", align="center" } ,
                new UIGridColumn{field="readerperformanceComments",   header = "Reader Performance & Quality Management e.g. Time to read Report, Criteria Adherence, Personal Adjudication Rate, ASR Report, Intra-Reader Variability Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="readerperformanceAction",  header ="Reader Performance & Quality Management e.g. Time to read Report, Criteria Adherence, Personal Adjudication Rate, ASR Report, Intra-Reader Variability Action", hide=true, hideGroup = actionGrp, width=20 }, 

                // //Image Read Management maint

                new UIGridColumn{field="imageReadManagementMaintenance",  header ="Image/Read Management Maintenance Score", align="center" } ,
                new UIGridColumn{field="imageReadManagementMaintenanceComments",   header = "Image/Read Management Maintenance Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="imageReadManagementMaintenanceAction",  header ="Image/Read Management Maintenance Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="imageDatareceivedstatus",  header ="Image Data Received Status Score", align="center" } ,
                new UIGridColumn{field="imageDatareceivedstatusComments",   header = "Image Data Received Status Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="imageDatareceivedstatusAction",  header ="Image Data Received Status Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="imageDataQcs",  header ="Image Data QC's by CoreLab Score", align="center" } ,
                new UIGridColumn{field="imageDataQcsComments",   header = "Image Data QC's by CoreLab Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="imageDataQcsAction",  header ="Image Data QC's by CoreLab Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="reconciliationimagedata",  header ="Reconciliation (image data) Score", align="center" } ,
                new UIGridColumn{field="reconciliationimagedataComments",   header = "Reconciliation (image data) Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="reconciliationimagedataAction",  header ="Reconciliation (image data) Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="imageDataQueryreQueryStatus",  header ="Image Data Query/Re-Query Status and Trends Score", align="center" } ,
                new UIGridColumn{field="imageDataQueryreQueryStatusComments",   header = "Image Data Query/Re-Query Status and Trends Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="imageDataQueryreQueryStatusAction",  header ="Image Data Query/Re-Query Status and Trends Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="interimAnalsysesDeliverables",  header ="Interim Analyses and Deliverables / Data Snaps Score", align="center" } ,
                new UIGridColumn{field="interimAnalsysesDeliverablesComments",   header = "Interim Analyses and Deliverables / Data Snaps Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="interimAnalsysesDeliverablesActions",  header ="Interim Analyses and Deliverables / Data Snaps Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="readpreparationstatus",  header ="Read Preparation Status Score", align="center" } ,
                new UIGridColumn{field="readpreparationstatusComments",   header = "Read Preparation Status Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="readpreparationstatusAction",  header ="Read Preparation Status Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="dminboundDataTranfer",  header ="DM Inbound Data Transfer Score", align="center" } ,
                new UIGridColumn{field="dminboundDataTranferComments",   header = "DM Inbound Data Transfer Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="dminboundDataTranferAction",  header ="DM Inbound Data Transfer Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="dmoutboundDataTranfer",  header ="DM Outbound Data Transfer Score", align="center" } ,
                new UIGridColumn{field="dmoutboundDataTranferComments",   header = "DM Outbound Data Transfer Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="dmoutboundDataTranferAction",  header ="DM Outbound Data Transfer Action", hide=true, hideGroup = actionGrp, width=20 }, 

                //Cross functional Data Quality:

                new UIGridColumn{field="crossFunctionalDataQualityReview",  header ="Cross Functional Data Quality Review Score", align="center" } ,
                new UIGridColumn{field="crossFunctionalDataQualityReviewComments",   header = "Cross Functional Data Quality Review Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="crossFunctionalDataQualityReviewAction",  header ="Cross Functional Data Quality Review Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="crossFunctionalDataCleaningStrategy",  header ="Cross-Functional Data Cleaning Strategy Defined Score", align="center" } ,
                new UIGridColumn{field="crossFunctionalDataCleaningStrategyComments",   header = "Cross-Functional Data Cleaning Strategy Defined Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="crossFunctionalDataCleaningStrategyAction",  header ="Cross-Functional Data Cleaning Strategy Defined Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="reviewimpactingprimaryefficacyanalysis",  header ="Review of Items Impacting Primary Efficacy Analysis Score", align="center" } ,
                new UIGridColumn{field="reviewimpactingprimaryefficacyanalysisComments",   header = "Review of Items Impacting Primary Efficacy Analysis Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="reviewimpactingprimaryefficacyanalysisAction",  header ="Review of Items Impacting Primary Efficacy Analysis Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="reviewimpactingunblinding",  header ="Review of Items Impacting Unblinding Score", align="center" } ,
                new UIGridColumn{field="reviewimpactingunblindingComments",   header = "Review of Items Impacting Unblinding Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="reviewimpactingunblindingAction",  header ="Review of Items Impacting Unblinding Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="reviewimpactingprotocoldeviatorsViolators",  header ="Review of Items impacting Protocol Deviators/Violators Score", align="center" } ,
                new UIGridColumn{field="reviewimpactingprotocoldeviatorsViolatorsComments",   header = "Review of Items impacting Protocol Deviators/Violators Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="reviewimpactingprotocoldeviatorsViolatorsAction",  header ="Review of Items impacting Protocol Deviators/Violators Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="dataQualityReviewChecks",  header ="Data Quality Review Checks e.g. MSA Checks MIRA vs Delivery Report MIRA vs Medidata (if applicable) MIRA vs MINT (if applicable) Score", align="center" } ,
                new UIGridColumn{field="dataQualityReviewChecksComments",   header = "Data Quality Review Checks e.g. MSA Checks MIRA vs Delivery Report MIRA vs Medidata (if applicable) MIRA vs MINT (if applicable) Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="dataQualityReviewChecksActions",  header ="Data Quality Review Checks e.g. MSA Checks MIRA vs Delivery Report MIRA vs Medidata (if applicable) MIRA vs MINT (if applicable) Action", hide=true, hideGroup = actionGrp, width=20 }, 

                //Finance
                new UIGridColumn{field="finance",  header ="Finance Score", align="center" } ,
                new UIGridColumn{field="financeComments",   header = "Finance Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="financeAction",  header ="Finance Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="contractCostatus",  header ="Contract/CO Status Score", align="center" } ,
                new UIGridColumn{field="contractCostatusComments",   header = "Contract/CO Status Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="contractCostatusAction",  header ="Contract/CO Status Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="outofScopeActivities",  header ="Out of Scope Activities Score", align="center" } ,
                new UIGridColumn{field="outofScopeActivitiesComments",   header = "Out of Scope Activities Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="outofScopeActivitiesAction",  header ="Out of Scope Activities Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="retrospectivePickUp",  header ="Retrospective Pickup Score", align="center" } ,
                new UIGridColumn{field="retrospectivePickUpComments",   header = "Retrospective Pickup Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="retrospectivePickUpActions",  header ="Retrospective Pickup Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="gmProfitabilityreviewTrending",  header ="GM and Profitability Review and Trending Score", align="center" } ,
                new UIGridColumn{field="gmProfitabilityreviewTrendingComments",   header = "GM and Profitability Review and Trending Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="gmProfitabilityreviewTrendingAction",  header ="GM and Profitability Review and Trending Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="revenueforecastingFinancesheets",  header ="Revenue Forecasting / Finance Sheet Score", align="center" } ,
                new UIGridColumn{field="revenueforecastingFinancesheetsComments",   header = "Revenue Forecasting / Finance Sheet Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="revenueforecastingFinancesheetsAction",  header ="Revenue Forecasting / Finance Sheet Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="revenuerecognition",  header ="Revenue Recognition (Invoicing) Score", align="center" } ,
                new UIGridColumn{field="revenuerecognitionComments",   header = "Revenue Recognition (Invoicing) Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="revenuerecognitionAction",  header ="Revenue Recognition (Invoicing) Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="passthroughcostbillingBurnrate",  header ="Pass Through Cost Billing and Burn Rate Score", align="center" } ,
                new UIGridColumn{field="passthroughcostbillingBurnrateComments",   header = "Pass Through Cost Billing and Burn Rate Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="passthroughcostbillingBurnrateAction",  header ="Pass Through Cost Billing and Burn Rate Action", hide=true, hideGroup = actionGrp, width=20 }, 


                new UIGridColumn{field="readerContractFees",  header ="Reader Contract Fees Score", align="center" } ,
                new UIGridColumn{field="readerContractFeesComments",   header = "Reader Contract Fees Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="readerContractFeesAction",  header ="Reader Contract Fees Action", hide=true, hideGroup = actionGrp, width=20 }, 

                //Quality and TMF

                new UIGridColumn{field="qualityTmf",  header ="Quality and TMF Score", align="center" } ,
                new UIGridColumn{field="qualityTmfcomments",   header = "Quality and TMF Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="qualityTmfaction",  header ="Quality and TMF Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="auditplanning",  header ="Audit Planning, Status and Followup Score", align="center" } ,
                new UIGridColumn{field="auditplanningComments",   header = "Audit Planning, Status and Followup Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="auditplanningAction",  header ="Audit Planning, Status and Followup Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="capasQqis",  header ="CAPAs/QIs Score", align="center" } ,
                new UIGridColumn{field="capasQqisComments",   header = "CAPAs/QIs Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="capasQqisAction",  header ="CAPAs/QIs Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="protocolcomplianceDeviationcriteria",  header ="Protocol Compliance/Deviation Criteria and Review Score", align="center" } ,
                new UIGridColumn{field="protocolcomplianceDeviationcriteriaComments",   header = "Protocol Compliance/Deviation Criteria and Review Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="protocolcomplianceDeviationcriteriaAction",  header ="Protocol Compliance/Deviation Criteria and Review Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="inspectionreadinessactivitiesTmfqcs",  header ="Inspection Readiness Activities and TMF QCs Score", align="center" } ,
                new UIGridColumn{field="inspectionreadinessactivitiesTmfqcsComments",   header = "Inspection Readiness Activities and TMF QCs Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="inspectionreadinessactivitiesTmfqcsAction",  header ="Inspection Readiness Activities and TMF QCs Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="tmfqualitymetrics",  header ="TMF Quality Metrics Score", align="center" } ,
                new UIGridColumn{field="tmfqualitymetricsComments",   header = "TMF Quality Metrics Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="tmfqualitymetricsAction",  header ="TMF Quality Metrics Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="filingManagementPlan",  header ="Filing Management Plan Score", align="center" } ,
                new UIGridColumn{field="filingManagementPlanComments",   header = "Filing Management Plan Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="filingManagementPlanAction",  header ="Filing Management Plan Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="soplog",  header ="SOP Log Score", align="center" } ,
                new UIGridColumn{field="soplogComments",   header = "SOP Log Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="soplogActions",  header ="SOP Log Action", hide=true, hideGroup = actionGrp, width=20 }, 


                //Vendor Management

                new UIGridColumn{field="vendorManagement",  header ="Vendor Management Score", align="center" } ,
                new UIGridColumn{field="vendorManagementComments",   header = "Vendor Management Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="vendorManagementActions",  header ="Vendor Management Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="vendorcontractingTechnicalagreements",  header ="Vendor Contracting and Technical Agreements Score", align="center" } ,
                new UIGridColumn{field="vendorcontractingTechnicalagreementsComments",   header = "Vendor Contracting and Technical Agreements Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="vendorcontractingTechnicalagreementsAction",  header ="Vendor Contracting and Technical Agreements Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="vendorAssessmentQuality",  header ="Vendor Assessment and Quality Score", align="center" } ,
                new UIGridColumn{field="vendorAssessmentQualityComments",   header = "Vendor Assessment and Quality Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="vendorAssessmentQualityAction",  header ="Vendor Assessment and Quality Action", hide=true, hideGroup = actionGrp, width=20 }, 

                //Resources and Staff Engatement

                new UIGridColumn{field="resourcingStaffEngagement",  header ="Resourcing and Staff Engagement Score", align="center" } ,
                new UIGridColumn{field="resourcingStaffEngagementComments",   header = "Resourcing and Staff Engagement Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="resourcingStaffEngagementActions",  header ="Resourcing and Staff Engagement Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="staffresourcing",  header ="Staff Resourcing, Resourcing Gaps and Utilization Score", align="center" } ,
                new UIGridColumn{field="staffresourcingComments",   header = "Staff Resourcing, Resourcing Gaps and Utilization Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="staffresourcingAction",  header ="Staff Resourcing, Resourcing Gaps and Utilization Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="crossFunctionalTeamCollaborationTaskOwnershipMatrix",  header ="Cross Functional/Team Collaboration and Task Ownership Matrix Score", align="center" } ,
                new UIGridColumn{field="crossFunctionalTeamCollaborationTaskOwnershipMatrixComments",   header = "Cross Functional/Team Collaboration and Task Ownership Matrix Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="crossFunctionalTeamCollaborationTaskOwnershipMatrixActon",  header ="Cross Functional/Team Collaboration and Task Ownership Matrix Action", hide=true, hideGroup = actionGrp, width=20 }, 

                //Client Satisfaction

                new UIGridColumn{field="clientSatisfaction",  header ="Client Satisfaction Score", align="center" } ,
                new UIGridColumn{field="clientSatisfactionComments",   header = "Client Satisfaction Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="clientSatisfactionAction",  header ="Client Satisfaction Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="engagesurvey",  header ="Engage Survey Submitted Within 6 Month Score", align="center" } ,
                new UIGridColumn{field="engagesurveyComments",   header = "Engage Survey Submitted Within 6 Month Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="engagesurveyAction",  header ="Engage Survey Submitted Within 6 Month Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="concernsEngageSurveys",  header ="Concerns/Engage Surveys Score", align="center" } ,
                new UIGridColumn{field="concernsEngageSurveysComments",   header = "Concerns/Engage Surveys Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="concernsEngageSurveysAction",  header ="Concerns/Engage Surveys Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="statusOngoingEscalations",  header ="Status of Ongoing Escalations Score", align="center" } ,
                new UIGridColumn{field="statusOngoingEscalationsComments",   header = "Status of Ongoing Escalations Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="statusOngoingEscalationsAction",  header ="Status of Ongoing Escalations Action", hide=true, hideGroup = actionGrp, width=20 }, 

                //Communication and Meetings

                new UIGridColumn{field="communicationMeetings",  header ="Communication and Meetings Score", align="center" } ,
                new UIGridColumn{field="communicationMeetingsComments",   header = "Communication and Meetings Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="communicationMeetingsAction",  header ="Communication and Meetings Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="imagingProjectOversightPlanIpop",  header ="Imaging Project Oversight Plan (IPOP) (Periodic Review: Yearly) Score", align="center" } ,
                new UIGridColumn{field="imagingProjectOversightPlanIpopcomments",   header = "Imaging Project Oversight Plan (IPOP) (Periodic Review: Yearly) Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="imagingProjectOversightPlanIpopaction",  header ="Imaging Project Oversight Plan (IPOP) (Periodic Review: Yearly) Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="upcomingExternalMeetings",  header ="Upcoming External Meetings (IMs, KOMs, Commitment Meeting etc.) Score", align="center" } ,
                new UIGridColumn{field="upcomingExternalMeetingsComments",   header = "Upcoming External Meetings (IMs, KOMs, Commitment Meeting etc.) Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="upcomingExternalMeetingsActions",  header ="Upcoming External Meetings (IMs, KOMs, Commitment Meeting etc.) Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="crossfunctionalmeetingsoccurringDocumented",  header ="Cross-Functional Meetings Occurring and Documented Score", align="center" } ,
                new UIGridColumn{field="crossfunctionalmeetingsoccurringDocumentedComments",   header = "Cross-Functional Meetings Occurring and Documented Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="crossfunctionalmeetingsoccurringDocumentedActions",  header ="Cross-Functional Meetings Occurring and Documented Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="lessonslearnedmeetings",  header ="Lessons Learned Meetings Score", align="center" } ,
                new UIGridColumn{field="lessonslearnedmeetingsComments",   header = "Lessons Learned Meetings Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="lessonslearnedmeetingsAction",  header ="Lessons Learned Meetings Action", hide=true, hideGroup = actionGrp, width=20 }, 
                
                new UIGridColumn{field="governanceMeetingAttendance",  header ="Governance Meeting Attendance Score", align="center" } ,
                new UIGridColumn{field="governanceMeetingAttendanceComments",   header = "Governance Meeting Attendance Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="governanceMeetingAttendanceAction",  header ="Governance Meeting Attendance Action", hide=true, hideGroup = actionGrp, width=20 }, 

                new UIGridColumn{field="othertopicsConcerns",  header ="Other Topics and Concerns Score", align="center" } ,
                new UIGridColumn{field="othertopicsConcernsComments",   header = "Other Topics and Concerns Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                new UIGridColumn{field="othertopicsConcernsAction",  header ="Other Topics and Concerns Action", hide=true, hideGroup = actionGrp, width=20 }, 




                
                // new UIGridColumn{field="xx",  header ="XXX Score", align="center" } ,
                // new UIGridColumn{field="xx",   header = "XXX Comments",hide=true, hideGroup = commentGrp, width=20 }, 
                // new UIGridColumn{field="xx",  header ="XXX Action", hide=true, hideGroup = actionGrp, width=20 }, 


                }
                //CodeBlockEnd
            };
        }
    }
}