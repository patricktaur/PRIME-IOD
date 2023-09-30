import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { StudyEditService } from '@app/prism/study/study-edit.service';
//import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblCrmParamService } from '@app/prism/masters/TblCrmParam/TblCrmParam.service';
//import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';
import { CrmStudyAwardManagementEditService } from '@app/prism/crm/crm-tabs/crm-study-award-management-edit.service';
import { StudyTypeRedirectionService } from '@app/prism/study/study-type-redirection.service';
@Component({
  selector: 'app-crm-study-award-management',
  templateUrl: './crm-study-award-management.component.html',
  styleUrls: ['./crm-study-award-management.component.css']
})
export class CrmStudyAwardManagementComponent implements OnInit, OnDestroy {
  studyId: number = 0;
  record: any;
  study: any;

  activityParId = 100;
  centralMonitoringPlatformParId = 600;
  iconIkPackageParId = 700;
  complexityFactorCdaCpParId = 300;
  YesNoParId = 1000;
  cdaAnalysisFrequencyParId = 400;
  FrequencyParId = 800;
  centralMonitoringStatusParId = 200;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  constructor(
    public router: Router,
    private studyEditService: StudyEditService,
    private crmStudyAwardManagementEditService: CrmStudyAwardManagementEditService,
    private tblCrmParamService: TblCrmParamService,
    private studyTypeRedirectionService: StudyTypeRedirectionService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      const studyType = st?.studyType;
      this.studyId = st?.studyId;
      this.studyEditService.setDashboard('crm');
      // if (this.studyId > 0) {
      //   this.loadRecord(this.studyId);
      // }

      if (studyType === 'CRM' || studyType === 'DM+CRM') {
        this.loadRecord(this.studyId);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    console.log('canDeactivate for CRM Study Award Management');
    if (this.form.dirty) {
      let message = "There are unsaved changes in the CRM Study Awards.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.crmStudyAwardManagementEditService.getRecordForEdit(studyId).subscribe(
      (res: any) => {
        // console.log(res);
        this.record = res;
        this.loading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  saveRecord() {
    this.loading = true;
    this.saveSubscription = this.crmStudyAwardManagementEditService.update(this.studyId, this.record).subscribe(
      res => {
        this.form.reset();
        this.loading = false;
        this.loadRecord(this.studyId);
        this.studyEditService.setStudyId(this.studyId);

        // this.studyEditService.loadStudyProperties();
      },
      err => {
        console.log(`error while editing = ${err}`);
        this.loading = false;
      }
    );
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
      key: 'iconNumber',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'ICON Number',
       // required: true,
        disabled:true,
        helpText: 'ICON Number',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'sponsor',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Sponsor',
       // required: true,
        disabled:true,
        description: 'Derived field : For CRM study - Derived from CRM Study Description page; For DM + CRM Study - Derived form DM Study Description page; ',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'sponsorStudyNumber',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Sponsor Study Number',
        //required: true,
        disabled:true,
        description: 'Derived from CRM Study Description page ',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'globalProjectManager',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Global Project Manager',
        required: true,
        helpText: 'Global Project Manager',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'activityCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Activity',
        options: this.tblCrmParamService.getParams(this.activityParId),
        valueProp: 'recId',
        labelProp: 'description',
        required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'centralMonitoringPlatformIds',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Central Monitoring Platform',
        options: this.tblCrmParamService.getParams(this.centralMonitoringPlatformParId),
        valueProp: 'recId',
        labelProp: 'description',
        required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'centralMonitoringPlatformOther',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Central Monitoring Platform Other',
        helpText: 'Central Monitoring Platform Other',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.required': model => model.centralMonitoringPlatformIds==604
      },
    },
    {
      key: 'iconIkPackageIds',
      type: 'ng-multi-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'ICONik package',
        options: this.tblCrmParamService.getParams(this.iconIkPackageParId),
        valueProp: 'recId',
        labelProp: 'description',
        multiple: true,
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
      key: 'iconIkPackageOther',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'ICONik package Other',

        helpText: 'ICONik package Othe',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'complexityFactorCdaCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Complexity factor - CDA',
        options: this.tblCrmParamService.getParams(this.complexityFactorCdaCpParId),
        valueProp: 'recId',
        labelProp: 'description',
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
      key: 'budgetedCdaCmAllocationSetup',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Budgeted CDA/CM allocation set-up (FTE based on FOUR month set-up)',
        helpText: 'Budgeted CDA/CM allocation set-up (FTE based on FOUR month set-up',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        type: 'number',
        step: 0.01,
        // required: true,
        min: 0,
        max: 9999999.99
      }
    },
    {
      key: 'budgetedCdaCmAllocationDuringEnrolement',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Budgeted CDA/CM allocation during enrolment (FTE)',

        helpText: 'Budgeted CDA/CM allocation during enrolment (FTE)',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        type: 'number',
        step: 0.01,
        // required: true,
        min: 0,
        max: 9999999.99
      }
    },
    {
      key: 'budgetedCdaCmAllocationDuringTreatment',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Budgeted CDA/CM allocation during treatment (FTE)',

        helpText: 'Budgeted CDA/CM allocation during treatment (FTE)',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        type: 'number',
        step: 0.01,
        //required: true,
        min: 0,
        max: 9999999.99
      }
    },
    {
      key: 'budgetedCdaCmAllocationDuringLtfu',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Budgeted CDA/CM allocation during LTFU (FTE)',

        helpText: 'Budgeted CDA/CM allocation during LTFU (FTE)',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6',
        type: 'number',
        step: 0.01,
        //required: true,
        min: 0,
        max: 9999999.99
      }
    },
    {
      key: 'contractedKomCraMeetingsCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Contracted KOM, CRAmeetings',
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
      key: 'cdaAnalysisFrequencyCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Current CDA Analysis Frequency phase', //CDA Analysis Frequency changed to Current CDA Analysis Frequency phase
        options: this.tblCrmParamService.getParams(this.cdaAnalysisFrequencyParId),
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
      key: 'cdaAnalysisFrequencyEnrolementCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDA analysis frequency (Enrolment)',
        options: this.tblCrmParamService.getParams(this.FrequencyParId),
        valueProp: 'recId',
        labelProp: 'description',
        //required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    // {

    //   key: 'cdaAnalysisFrequencyEnrolementNum',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'CDA analysis frequency (Enrolment) Number',

    //     helpText: 'CDA analysis frequency (Enrolment) Number',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   }
    // },
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
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    // {
    //   key: 'cdaAnalysisFrequencyLpiLpoNum',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'CDA analysis frequency (LPI - LPO) Number',

    //     helpText: 'CDA analysis frequency (LPI - LPO) Number',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   }
    // },
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
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    // {
    //   key: 'cdaAnalysisFrequencyLtfuOleSfuNum',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'CDA analysis frequency (LPI - LPO) Number',

    //     helpText: 'CDA analysis frequency (LPI - LPO) Number',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   }
    // },
    {
      key: 'centralMonitoringStatusCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Central Monitoring Status',
        options: this.tblCrmParamService.getParams(this.centralMonitoringStatusParId),
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
      key: 'indicators',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'No. of indicators (Max)',
        type: 'number',
        min: 0,
        helpText: 'No. of indicators (Max)',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'notes',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Notes',
        rows: 3,
        maxLength: 500,
        helpText: 'Notes',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'unfilledPrmRequestCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Unfilled PRM Request',
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
    }
  ];

  ngOnDestroy(): void {
    // this.studyEditService?.setStudyEditMode(false);
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
