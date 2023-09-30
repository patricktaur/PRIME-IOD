import { Component } from '@angular/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';
import { TblCrmParamService } from '@app/prism/masters/TblCrmParam/TblCrmParam.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';
import { CrmAnalysisPlanningEditService } from '../crm-analysis-planning.service';

@Component({
  selector: 'app-crm-study-analysis-planning-view',
  templateUrl: './crm-study-analysis-planning-view.component.html',
  styleUrls: ['./crm-study-analysis-planning-view.component.css']
})
export class CrmStudyAnalysisPlanningViewComponent {
  crmDatas: any = [];

  studyId: number = 0;
  record: any = {};
  study: any;

  selectedYear: any;
  pageFlowData: any;
  filterPageFlow: any;
  currentYear: number | undefined;

  firstStudyDate: any;
  lastStudyDate: any;
  lastSavedOn: any;
  pageflow: any;

  activityParId = 100;
  centralMonitoringStatusParId = 200;
  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;

  constructor(
    private studyEditService: StudyEditService,
    private crmAnalysisPlanningEditService: CrmAnalysisPlanningEditService,
    private tblUserService: TblUserService,
    private tblCrmParamService: TblCrmParamService
  ) {}

  ngOnInit(): void {
    var now = new Date();
    this.currentYear = now.getFullYear();
    //cds is common for DM and IMI Studies:
    this.studyEditService.setDashboard('crm');
    // this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.studyId = st;
    //   if (this.studyId > 0) {
    //     this.loadRecord(this.studyId);
    //   }

    // });

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyId = st.studyId;
      const studyType = st?.studyType;
      if (studyType === 'CRM' || studyType === 'DM+CRM') {
        this.loadRecord(this.studyId);
      }
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    // console.log(`studyId = ${ studyId }`);
    this.loadSubscription = this.crmAnalysisPlanningEditService.getRecordForEdit(studyId).subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`);
        // if (res.status === 400) {
        //   this.loading = false;
        //   return;
        // } else {
        this.record = res;
        this.getAnaysisTableRecords(this.studyId, res.firstAnalysisDate, res.finalAnalysisDate);
        this.getActivityDescription(this.record.activity);
        this.getCentralMonitoringStatusDescription(this.record.centralMonitoringStatus);
        this.getCdaCmDisplayName(this.record.cdaCm);
        
        this.pageFlowData = res.tblCrmStudyAnalysisPlanningFlow;
        this.filterPageFlow = res.tblCrmStudyAnalysisPlanningFlow;
        // this.setPageFlow(this.filterPageFlow);
        //this.setPageFlow(res[0]);
        // if (this.record.recId!='undefined')
        //   this.loadRecordForFlow(this.record.recId);

        // this.form.reset();
        this.loading = false;
        // }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  getAnaysisTableRecords(studyId: number, firstAnalysisDate: any, finalAnalysisDate: any) {
    this.crmAnalysisPlanningEditService
      .getAnaysisTableRecords(studyId, this.record.recId, firstAnalysisDate, finalAnalysisDate)
      .subscribe((res: any) => {
        console.log(`crmDatas = ${JSON.stringify(res, null, 2)}`);
        this.crmDatas = res;
      });
  }

  getStyle(forecast: any, actual: any) {
    if (actual == null) {
      return {};
    } else if(actual==0 && forecast==0){
     return {
        'background-color': 'orange',
        color: 'black'
      };
    } else if(actual > forecast){
      return {
         'background-color': '#73d773',
         color: 'white'
       };
     } else if(actual < forecast){
      return {
         'background-color': 'red',
         color: 'white'
       };
     } else if(actual = forecast){
      return {
         'background-color': '#73d773',
         color: 'white'
       };
     } else {
      return {};
     }
  }

  getStyleForForecast(forecast: any) {
    if (forecast != null) {
      return { 'background-color': '#b7eef9ad' };
    } else {
      return {};
    }
  }

  getActivityDescription(activityId: any) {
    // console.log(`activityId = ${ activityId }`);
    this.tblCrmParamService.getParams(this.activityParId)
    .subscribe((res: any) => {
      var activityDatas = res;
      if(activityDatas.length > 0) {
        var activity = activityDatas.find((x: any) => x.recId == activityId);
        if(activity) {
          this.record['activityDescription'] =  activity.description;
        }
      }
    }); 
  }

  getCentralMonitoringStatusDescription(centralMonitoringStatusId: any) {
    this.tblCrmParamService.getParams(this.centralMonitoringStatusParId)
    .subscribe((res: any) => {
      var centralMonitoringStatusIds = res;
      var centralMonitoringStatus = centralMonitoringStatusIds.find((x: any) => x.recId == centralMonitoringStatusId);
      if(centralMonitoringStatus) {
        this.record['centralMonitoringStatusDescription'] =  centralMonitoringStatus.description;
      }
    }) 
  }

  getCdaCmDisplayName(userId: any) {
    this.tblUserService.getUserByrole(UserRoles.CRM_Central_Monitor)
    .subscribe((res: any) => {
      var cdaUsers = res;
      var cdaUser = cdaUsers.find((x: any) => x.id == userId);
      if(cdaUser) {
        this.record['cdaCmDisplayName'] =  cdaUser.userDisplayName;
      }
    }) 
  }
}
