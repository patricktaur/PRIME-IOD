using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query.Reports.ReportColumns
{
    public class vwProjectCurrentReviewV2_Columns : IReportColumns
    {
        public UIGridProperties GetReportColumns()
        {
            return 
            new UIGridProperties{
                //CodeBlockStart

Title = "Project Review Report",
FilterGroup = 5,
SortedByFields = "Icon Number, Review Number",
Columns = new List<UIGridColumn>{new UIGridColumn{field="studyIconNumber",  header ="Icon Number" }, 
new UIGridColumn{field="region",  header ="Region" }, 
new UIGridColumn{field="portfolio",  header ="Portfolio" }, 
new UIGridColumn{field="sponsor",  header ="Sponsor" }, 
new UIGridColumn{field="studyName",  header ="Study Name" }, 
new UIGridColumn{field="cdms",  header ="CDMS" }, 
new UIGridColumn{field="studyStatusText",  header ="Study Status" }, 
new UIGridColumn{field="reviewIndex",  header ="Review Number" }, 
new UIGridColumn{field="reviewDmpm",  header ="DMPM" }, 
new UIGridColumn{field="dmpmreviewedOn",  header ="DMPM Reviewed On", type="date", format="dd-MMM-yyyy", align="Center" }, 
new UIGridColumn{field="reviewDmpmManager",  header ="DMPM Manager" }, 
new UIGridColumn{field="dmpmManagerReviewedOn",  header ="DMPM Manager Reviewed On", type="date", format="dd-MMM-yyyy", align="Center" }, 
new UIGridColumn{field="watchlist",  header ="Watch List", align="center" }, 
new UIGridColumn{field="overallProjectScore",  header ="Overall Project Score" }, 
new UIGridColumn{field="overideProjectScore",  header ="Overide Project Score" }, 
new UIGridColumn{field="dataCleaningScore",  header ="Data Cleaning & Clean Patient Progress Score" }, 
new UIGridColumn{field="dataCleaningComment",  header ="Data Cleaning & Clean Patient Progress Comment" }, 
new UIGridColumn{field="dataCleaningAction",  header ="Data Cleaning & Clean Patient Progress Action" }, 
new UIGridColumn{field="externalDataReconciliationScore",  header ="External Data Reconciliation Score" }, 
new UIGridColumn{field="externalDataReconciliationComment",  header ="External Data Reconciliation Comment" }, 
new UIGridColumn{field="externalDataReconciliationAction",  header ="External Data Reconciliation Action" }, 
new UIGridColumn{field="qualityAssessmentScore",  header ="Quality Assessment Score" }, 
new UIGridColumn{field="qualityAssessmentComment",  header ="Quality Assessment Comment" }, 
new UIGridColumn{field="qualityAssessmentAction",  header ="Quality Assessment Action" }, 
new UIGridColumn{field="nextMilestoneDeliverableScore",  header ="Next Milestone Deliverable Score" }, 
new UIGridColumn{field="nextMilestoneDeliverableComment",  header ="Next Milestone Deliverable Comment" }, 
new UIGridColumn{field="nextMilestoneDeliverableAction",  header ="Next Milestone Deliverable Action" }, 
new UIGridColumn{field="resourcingScore",  header ="Resourcing Score" }, 
new UIGridColumn{field="resourcingComment",  header ="Resourcing Comment" }, 
new UIGridColumn{field="resourcingAction",  header ="Resourcing Action" }, 
new UIGridColumn{field="projectFinancialHealthScore",  header ="Project Financial Health Score" }, 
new UIGridColumn{field="projectFinancialHealthComment",  header ="Project Financial Health Comment" }, 
new UIGridColumn{field="projectFinancialHealthAction",  header ="Project Financial Health Action" }, 
new UIGridColumn{field="tmfStatusScore",  header ="TMF Status Score" }, 
new UIGridColumn{field="tmfStatusComment",  header ="TMF Status Comment" }, 
new UIGridColumn{field="tmfStatusAction",  header ="TMF Status Action" }, 
new UIGridColumn{field="edcUserAccessReviewScore",  header ="EDC User Access Review Score" }, 
new UIGridColumn{field="edcUserAccessReviewComment",  header ="EDC User Access Review Comment" }, 
new UIGridColumn{field="edcUserAccessReviewAction",  header ="EDC User Access Review Action" }, 
new UIGridColumn{field="otherIcondeptScore",  header ="Other Icon Department Score" }, 
new UIGridColumn{field="otherICONDeptComment",  header ="Other Icon Department Comment" }, 
new UIGridColumn{field="otherICONDeptAction",  header ="Other Icon Department Action" }, 
new UIGridColumn{field="sponsorRelationshipScore",  header ="Sponsor Relationship Score" }, 
new UIGridColumn{field="sponsorRelationshipComment",  header ="Sponsor Relationship Comment" }, 
new UIGridColumn{field="sponsorRelationshipAction",  header ="Sponsor Relationship Action" }, 
new UIGridColumn{field="dmpmoversightScore",  header ="DMPM Oversight Score" }, 
new UIGridColumn{field="dmpmoversightScore",  header ="DMPM Oversight Comment" }, 
new UIGridColumn{field="dmpmoversightAction",  header ="DMPM Oversight Action" }, 
new UIGridColumn{field="protocolPhase",  header ="Protocol Phase" }, 
new UIGridColumn{field="therapeuticArea",  header ="Therapeutic Area" }, 
new UIGridColumn{field="indication",  header ="Indication" }, 
new UIGridColumn{field="reviewCycleDesc",  header ="Review Cycle" }}
//CodeBlockEnd
            };
        }
    }
}
