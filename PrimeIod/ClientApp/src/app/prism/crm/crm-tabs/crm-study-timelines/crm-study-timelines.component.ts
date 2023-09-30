import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';
// import { StudyTabsService } from '@app/prism/study/study-tabs/study-tabs.service';
import { CrmStudyTimelinesEditService } from '@app/prism/crm/crm-tabs/crm-study-timelines-edit.service';
import { StudyTypeRedirectionService } from '@app/prism/study/study-type-redirection.service';
import { TblCrmParamService } from '@app/prism/masters/TblCrmParam/TblCrmParam.service';

@Component({
  selector: 'app-crm-study-timelines',
  templateUrl: './crm-study-timelines.component.html',
  styleUrls: ['./crm-study-timelines.component.css']
})
export class CrmStudyTimelinesComponent implements OnInit, OnDestroy {
  studyId: number = 0;
  record: any;
  study: any;
  dmDerived: boolean = false;
  loading: boolean = false;

  cdaAnalysisFrequencyParId = 400;
  FrequencyParId = 800;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  constructor(
    public router: Router,

    private studyEditService: StudyEditService,
    private crmStudyTimelinesEditService: CrmStudyTimelinesEditService,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    private tblCrmParamService: TblCrmParamService,
    private studyTypeRedirectionService: StudyTypeRedirectionService
  ) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('crm');
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      const studyType = st?.studyType;
      this.studyId = st?.studyId;
      //if (studyType === 'CRM' || studyType === 'DM+CRM') {
      this.loadRecord(this.studyId);
      // }
      if (studyType.trim() == 'DM+CRM') {
        this.dmDerived = true;
        console.log('dmDerived:' + this.dmDerived);
      }
      // if (this.studyId > 0) {
      //   this.loadRecord(this.studyId);
      // }
      // console.log("XXX:" + studyType);
      // this.studyTypeRedirectionService.callFunctionOrRedirect(
      //   this.router,
      //   'CRM',
      //   studyType,
      //   this.studyId,
      //   this.loadRecord.bind(this)
      // );
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }
  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.crmStudyTimelinesEditService.getRecordForEdit(studyId).subscribe(
      (res: any) => {
        // if (res.status === 400) {
        //   this.loading = false;
        //   return;
        // } else {
        this.form.reset();
        this.record = res;

        this.loading = false;
        // }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  saveRecord() {
    this.loading = true;
    this.saveSubscription = this.crmStudyTimelinesEditService.update(this.studyId, this.record).subscribe(
      res => {
        //this.record = res;
        this.form.reset();
        console.log(res);
        this.loading = false;
        this.loadRecord(this.studyId);
      },
      err => {
        console.log(`error while editing = ${err}`);
        console.log(err);
        this.loading = false;
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in CRM Study Timeline.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  submit() {
    if (this.form.valid) {
      this.saveRecord();
    }
  }

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'awarded',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Awarded',
        required: true,
        helpText: 'Awarded',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'cdaAssigned',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDA Assigned date (PRM)',
        required: true,
        helpText: 'CDA Assigned date (PRM)',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },

    {
      key: 'protocalApproval',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Protocol Approval ',
        // disabled: true,
        description: 'Derived field  for DM studies, Enter date for CRM studies',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': model => this.dmDerived
      },
      //hideExpression: model => !this.dmDerived
    },
    {
      key: 'fpiFps',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'FPI/FPS ',
        required: true,
        helpText: 'FPI/FPS ',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'fpe',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'FPE ',

        helpText: 'FPE ',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'lpe',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'LPE ',

        helpText: 'LPE ',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'lpo',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'LPO ',

        helpText: 'LPO ',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'firstRactMeeting',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: '1st RACT meeting  date ',

        helpText: '1st RACT meeting  date ',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'cdaWsApproval',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'First CDA ws approval date',

        helpText: 'First CDA ws approval date',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'firstCdaAnalysisDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'First CDA analysis  date (at the earliest)',
        disabled: true,
        description: 'Derived field from Analysis Planning form',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'finalCdaAnalysisDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Final CDA analysis  date',
        disabled: true,
        description: 'Derived field from Analysis Planning form',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'analysisTime',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Analysis Time (in months)',
        type: 'number',
        min: 0,
        description: 'Derived field from Analysis Planning form',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        disabled: true
      }
    },
    {
      key: 'cdmsGolive',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS Go-live',
        //disabled: true,
        description: 'Derived field for DM studies, Enter data for CRM studies',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': model => this.dmDerived
      },
      //hideExpression: model => !this.dmDerived
    },
    {
      key: 'mainDbl',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Main DBL',
        // disabled: true,
        description: 'Derived field for DM studies, Enter data for CRM studies',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': model => this.dmDerived
      },
     // hideExpression: model => !this.dmDerived
    },
    {
      key: 'interimLocks',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Interim Locks',
        // disabled: true,
        helpText: 'Interim Locks',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      //  expressionProperties:{
      //     'templateOptions.disabled' : model=>this.dmDerived
      //    },
      //   hideExpression: model=>!this.dmDerived
    },
    {
      key: 'cdaAnalysisFrequencyCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDA Analysis Frequency', //CDA Analysis Frequency changed to Current CDA Analysis Frequency phase
        options: this.tblCrmParamService.getParams(this.cdaAnalysisFrequencyParId),
        valueProp: 'recId',
        labelProp: 'description',
        // required: true,
        description: 'Derived from CRM Study Award Form',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        disabled: true
      },
      validation: {
        show: true
      }
    },
    {
      key: 'cdaAnalysisFrequencyEnrolementCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDA analysis frequency (Enrolment)',
        options: this.tblCrmParamService.getParams(this.FrequencyParId),
        valueProp: 'recId',
        labelProp: 'description',
        //required: true,
        description: 'Derived from CRM Study Award Form',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        disabled: true
      },
      validation: {
        show: true
      }
    },
    {
      key: 'cdaAnalysisFrequencyLpiLpoCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDA Analysis Frequency (LPI-LPO)',
        options: this.tblCrmParamService.getParams(this.FrequencyParId),
        valueProp: 'recId',
        labelProp: 'description',
        // required: true,
        description: 'Derived from CRM Study Award Form',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        disabled: true
      },
      validation: {
        show: true
      }
    },
    {
      key: 'cdaAnalysisFrequencyLtfuOleSfuCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDA analysis frequency (LTFU / OLE / SFU)',
        options: this.tblCrmParamService.getParams(this.FrequencyParId),
        valueProp: 'recId',
        labelProp: 'description',
        //required: true,
        description: 'Derived from CRM Study Award Form',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        disabled: true
      },
      validation: {
        show: true
      }
    },
    {
      key: 'setupTime',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Set-up time (No. of days)',
        type: 'number',
        min: 0,
        helpText: 'Set-up time (No. of days)',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
