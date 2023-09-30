import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblCrmParamService } from '@app/prism/masters/TblCrmParam/TblCrmParam.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';
// import { StudyTabsService } from '@app/prism/study/study-tabs/study-tabs.service';
import { CrmStudyDetailsEditService } from '@app/prism/crm/crm-tabs/crm-study-details-edit.service';
//for user
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyTypeRedirectionService } from '@app/prism/study/study-type-redirection.service';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-crm-study-details',
  templateUrl: './crm-study-details.component.html',
  styleUrls: ['./crm-study-details.component.css']
})
export class CrmStudyDetailsComponent implements OnInit, OnDestroy {
  studyId: number = 0;
  record: any;
  study: any;
  dmDerived: boolean = false;

  SponsorParId = 1200;
  centralMonitoringStatusParId = 200;
  cdaCmParId = 1800;
  clinicalRiskManagerParId = 1800;
  centralMonitoringPlatformParId = 600;
  YesNoParId = 1000;
  therapeuticAreaParId = 1400;
  protocolPhaseParId = 300;
  tmfParId = 3800;
  activityParId = 100;
  iconIkPackageParId = 700;
  complexityFactorCdaCpParId = 300;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  constructor(
    public router: Router,

    private studyEditService: StudyEditService,
    private crmStudyDetailsEditService: CrmStudyDetailsEditService,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    private tblCrmParamService: TblCrmParamService,
    private studyTypeRedirectionService: StudyTypeRedirectionService
  ) { }

  ngOnInit(): void {
    this.studyEditService.setDashboard('crm');

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      const studyType = st?.studyType;
      this.studyId = st?.studyId;
      // if (this.studyId > 0) {
      //   this.loadRecord(this.studyId);
      // }
      if (studyType.trim() == 'DM+CRM') {
        this.dmDerived = true;
        console.log('dmDerived:' + this.dmDerived);
      }

      if (studyType === 'CRM' || studyType === 'DM+CRM') {
        this.loadRecord(this.studyId);
      }


    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }
  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.crmStudyDetailsEditService.getRecordForEdit(studyId).subscribe(
      (res: any) => {
        // if (res.status === 400) {
        //   this.loading = false;
        //   return;
        // } else {
        this.record = res;

        this.form.reset();
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
    delete this.record.cdaCm; //tblCrmStudyDetails cdacm field missing throwing error so removed this property form the object
    this.saveSubscription = this.crmStudyDetailsEditService.update(this.studyId, this.record).subscribe(
      res => {
        console.log(res);
        //this.record = res;
        this.form.reset();
        this.loading = false;
        this.loadRecord(this.studyId);
        this.studyEditService.setStudyId(this.studyId);
        // this.studyEditService.loadStudyProperties();
      },
      err => {
        console.log(err);
        console.log(`error while editing = ${err}`);
        this.loading = false;
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    console.log(`calling canDeactivate`);
    if (this.form.dirty) {
      let message = "There are unsaved changes in CRM Study Details.  Click 'Ok' to continue without saving. ";
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
    // {
    //   key: 'studyName',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Study Name',
    //     maxLength: 255,
    //    // disabled: this.dmDerived,
    //     required: true,
    //     helpText: 'Study Name',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   expressionProperties:{
    //    'templateOptions.disabled' : model=>this.dmDerived
    //   }
    // },
    {
      key: 'sponsorPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Sponsor',
        options: this.tblParamService.getParams(this.SponsorParId),
        valueProp: 'recId',
        labelProp: 'description',
        // disabled: this.dmDerived,
        required: true,
        description: 'Derived field: For DM + CRM Study - Derived form DM Study Description page; ',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      },
      expressionProperties: {
        'templateOptions.disabled': model => this.dmDerived
      }
    },
    {
      key: 'sponsorStudyNumber',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Sponsor Study Code',
        required: true,
        //description: 'Derived from CRM Study Award Form',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        maxLength: 25
      }
    },
    // {
    //   key: 'cdaCmId',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'CDA/CM',
    //     options: this.tblUserService.getUsersForcdacm(),
    //     valueProp: 'id',
    //     labelProp: 'value',
    //     //required: true,
    //     helpText: '',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   validation: {
    //     show: true
    //   }
    // },
    {
      key: 'cdaCm',
      type: 'label',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDA/CM',
        hideLabel: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }

    },
    {
      key: 'clinicalRiskManagerId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Clinical Risk Manager',
        options: this.tblUserService.getusersforClinicalRiskMang(),
        valueProp: 'id',
        labelProp: 'value',
        //required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'analyticsDevelopmentLeadId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Analytics Development Lead',
        options: this.tblUserService.getusersforAnalyticsDevLead(),
        valueProp: 'id',
        labelProp: 'value',
        //required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      // templateOptions: {
      //   label: 'Analytics Development Lead',
      //   maxLength: 250,
      //   helpText: 'Analytics Development Lead',
      //   labelColClassName: 'col-4',
      //   fieldColClassName: 'col-6'
      // }
    },
    {
      key: 'gpm',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'GPM',

        description: 'Derived from CRM Study Award Form',
        disabled: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'ctm',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CTM',
        maxLength: 250,
        helpText: 'CTM',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'centralMonitoringStatusCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Central Monitoring Status',
        options: this.tblCrmParamService.getParams(this.centralMonitoringStatusParId),
        valueProp: 'recId',
        labelProp: 'description',
        disabled: true,
        //required: true,
        description: 'Derived from CRM Study Award Form',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      // expressionProperties: {
      //   'templateOptions.disabled': model => this.dmDerived
      // },
      validation: {
        show: true
      }
    },

    {
      key: 'centralMonitoringPlatform',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Central Monitoring Platform',
        options: this.tblCrmParamService.getParams(this.centralMonitoringPlatformParId),
        valueProp: 'recId',
        labelProp: 'description',
        disabled: true,
        // required: true,
        description: 'Derived from CRM Study Award Form',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'activity',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Activity',
        options: this.tblCrmParamService.getParams(this.activityParId),
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
    // {
    //   key: 'iconikPackage',
    //   type: 'label',
    //   wrappers: ['horizontal-layout'],
    //        templateOptions: {
    //     label: 'ICONik package',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6',

    //   },
    // },
    {
      key: 'iconikPackage',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'ICONik package',
        type: 'text',
        disabled: true,
        description: 'Derived from CRM Study Award Form',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'complexityFactorId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Complexity factor',
        options: this.tblCrmParamService.getParams(this.complexityFactorCdaCpParId),
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
      key: 'currentNoOfKri',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Current No. of KRI',
        type: 'number',
        min: 0,
        helpText: 'Current No. of KRI',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'iconikSnapshotSchedule',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'ICONIK Snapshot Schedule',
        rows: 3,
        maxLength: 250,
        helpText: 'ICONIK Snapshot Schedule',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'iconikSnapshotFrequency',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'ICONIK Snapshot Frequency',
        rows: 3,
        maxLength: 250,
        helpText: 'ICONIK Snapshot Frequency',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'subjectSimilarityKriCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Subject Similarity KRI (Y/N)',
        options: this.tblCrmParamService.getParams(this.YesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        // required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'deviationAnalysisId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Deviation Analysis',
        options: this.tblCrmParamService.getParams(this.YesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        // required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'dqmPackSupportByCmid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'DQM Pack Support by CM',
        options: this.tblCrmParamService.getParams(this.YesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        // required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'esdvAnalysisCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'ESDV analysis (Y/N)',
        options: this.tblCrmParamService.getParams(this.YesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        // required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'qtlCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'QTL',
        options: this.tblCrmParamService.getParams(this.YesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        //  required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'cdmsEdcSystem',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS/EDC System',

        description: 'Derived field for DM Studies, Enter data for CRM Studies ',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': model => this.dmDerived
      },
    },
    {
      key: 'iconDmContractedCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'ICON DM Contracted',
        options: this.tblCrmParamService.getParams(this.YesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        // required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'dmVendor',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'DM Vendor (if not ICON)',

        helpText: 'DM Vendor (if not ICON)',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'dmpmPointOfContact',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'DM PM point of contact',
        //disabled:true,
        description: 'Derived field for DM studies, Enter data for CRM studies',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': model => this.dmDerived
      }
    },
    {
      key: 'cdlPointOfContact',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDL point of contact',
        // disabled:true,
        description: 'Derived field for DM studies, Enter data for CRM studies',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': model => this.dmDerived
      }
    },
    {
      key: 'sitesPlanned',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Sites planned',
        type: 'number',
        min: 0,
        helpText: 'Sites planned',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'subjectsPlanned',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Subjects planned',
        type: 'number',
        min: 0,
        helpText: 'Subjects planned',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'therapeuticAreaPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Therapeutic Area',
        options: this.tblParamService.getParams(this.therapeuticAreaParId),
        valueProp: 'recId',
        labelProp: 'description',
        //  required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'indication',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Indication',

        helpText: 'Indication',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'protocolPhasePid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Protocol Phase',
        options: this.tblParamService.getParams(this.protocolPhaseParId),
        valueProp: 'recId',
        labelProp: 'description',
        // required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'tmfPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'TMF',
        options: this.tblParamService.getParams(this.tmfParId),
        valueProp: 'recId',
        labelProp: 'description',
        //  required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'notes',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Notes',
        rows: 3,
        disabled: true,
        description: 'Derived from CRM Study Award Form',
        maxLength: 500,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    }
    // ,{
    //   key: 'dmstudyId',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'DM Study Icon Number',
    //     options: this.crmStudyDetailsEditService.getDMStudyIconNumber(),
    //     valueProp: 'recId',
    //     labelProp: 'studyIconNumber',
    //     //required: true,
    //     helpText: '',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   validation: {
    //     show: true
    //   }
    // }
  ];

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
