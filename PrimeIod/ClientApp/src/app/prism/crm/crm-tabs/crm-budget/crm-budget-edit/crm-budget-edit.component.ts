import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

import { skip } from 'rxjs/operators';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblCrmParamService } from '@app/prism/masters/TblCrmParam/TblCrmParam.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';
// import { StudyTabsService } from '@app/prism/study/study-tabs/study-tabs.service';
import { CrmBudgetEditService } from '@app/prism/crm/crm-tabs/crm-budget-edit.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
//for user
import { UserRoles } from '@app/core/authentication/credentials.enums';
@Component({
  selector: 'app-crm-budget-edit',
  templateUrl: './crm-budget-edit.component.html',
  styleUrls: ['./crm-budget-edit.component.css']
})
export class CrmBudgetEditComponent implements OnInit {
  studyId: number = 0;
  record: any;
  study: any;
  recId: number = 0;
  currentBudget: string = '';
  title: string = '';

  SponsorParId = 1200;
  centralMonitoringStatusParId = 200;
  cdaCmParId = 1800;
  clinicalRiskManagerParId = 1800;
  centralMonitoringPlatformParId = 600;
  YesNoParId = 1000;
  therapeuticAreaParId = 1400;
  protocolPhaseParId = 300;
  tmfParId = 3800;
  complexityFactorCdaCpParId = 300;
  currencyTypeParId = 1400;

  serverResponses: any = [];

  loading: boolean = false;
  removeButton: boolean = false;

  currentUser: any;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  studyPropSub: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private actRoute: ActivatedRoute,
    private router: Router,
    private location: Location,

    private studyEditService: StudyEditService,
    private crmBudgetEditService: CrmBudgetEditService,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    private credSerivce: CredentialsService,
    private tblCrmParamService: TblCrmParamService,
    @Inject('budget-server-response') private serverResponseService: ServerResponseService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.credSerivce.currentUser;

    //this page content becomes invalid if the StudyIconNumber dropdown is changed and refers to another study.
    //hence returning back to list.
    this.studyPropSub = this.studyEditService.getStudyProperties().subscribe((stProp: any) => {
      if (this.studyId && this.studyId !== stProp.studyId) {
        this.location.back();
      } else {
        this.studyId = stProp.studyId;
      }
    });
    this.route.queryParams.subscribe((params: any) => {
      let editMode = params.editMode;

      if (editMode == 'add') {
        // let studyId = params.studyId;

        this.loadNewRecord(this.studyId);
        this.title = 'create';
        this.removeButton = false;
      } else {
        this.recId = params.id;
        if (this.studyId > 0) {
          this.loadRecord(this.studyId, this.recId);
        }
        //this.loadRecord(this.recId);
        this.title = 'modify';
        this.removeButton = true;
      }
    });

    this.serverResponses = this.serverResponseService.serverResponses;
  }
  loadNewRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.crmBudgetEditService.getNewRecordModule(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          // this.setButtonVisibility(this.record);

          this.loading = false;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }
  loadRecord(studyId: number, recId: number) {
    this.loading = true;
    this.loadSubscription = this.crmBudgetEditService.getRecordForEdit(studyId, recId).subscribe(
      (res: any) => {
        console.log(res);
        // if (res.status === 400) {
        //   this.loading = false;
        //   return;
        // } else {
        this.record = res[0];
        this.currentBudget = this.record.planViewActivityTasks;
        this.recId = this.record.recId;

        this.form.reset();
        this.loading = false;
        // }
      },
      (err: any) => {
        console.log(err);
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  saveRecord() {
    this.loading = true;
    this.saveSubscription = this.crmBudgetEditService.update(this.studyId, this.record).subscribe(
      res => {
        console.log(res);
        //this.record = res;
        this.form.reset();

        this.loading = false;
        this.location.back();
        // this.router.navigate(['crm-budget-list'], { relativeTo: this.actRoute.parent});
      },
      err => {
        console.log(err);
        console.log(`error while editing = ${err}`);
        this.loading = false;
      }
    );
  }

  delete(recId: number) {
    this.deleteRecordSub = this.crmBudgetEditService.deleteBudget(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          //sucess:

          //this.serverResponseService.addServerMessages(res);
          this.serverResponses = this.serverResponseService.serverResponses;
          this.loading = false;
          this.location.back();
          //this.router.navigate(['crm-budget-list'], { relativeTo: this.actRoute.parent});
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in CRM Budget.  Click 'Ok' to continue without saving. ";
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
      key: 'currentBudget',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        type: 'input',
        required: true,
        label: 'Budget',
        helpText: 'Budget',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'currentBudgetDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        required: true,
        label: 'Budget Date',
        helpText: 'Budget Date',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'planViewActivityTasks',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        //required: true,
        label: 'Plan View Activity Tasks',
        maxLength: 500,
        helpText: 'Plan View Activity Tasks',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    // {
    //   key: 'allocationSetup',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],

    //   templateOptions: {
    //     label: 'Budgeted CDA/CM Allocation set-up (FTE based on Four month set-up)',
    //     helpText: 'Budgeted CDA/CM Allocation set-up (FTE based on Four month set-up)',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6',
    //     disabled: true
    //   }
    // },
    // {
    //   key: 'allocationDuringEnrolement',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Budgeted CDA/CM allocation during enrolment (FTE)',

    //     helpText: 'Budgeted CDA/CM allocation during enrolment (FTE)',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6',
    //     disabled: true
    //   }
    // },
    // {
    //   key: 'alloationDuringTreatment',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Budgeted CDA/CM allocation during treatment (FTE)',
    //     disabled: true,
    //     helpText: 'Budgeted CDA/CM allocation during treatment (FTE)',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   }
    // },
    // {
    //   key: 'allocationDuringLtfu',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Budgeted CDA/CM allocation during LTFU (FTE)',
    //     disabled: true,
    //     helpText: 'Budgeted CDA/CM allocation during LTFU (FTE)',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   }
    // },
    {
      key: 'contractedKomCraMeetingsCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Contracted KOM, CRAmeetings',
        options: this.tblCrmParamService.getParams(this.YesNoParId),
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
      key: 'numberOfCdaAnalysisRounds',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Number of CDA analysis rounds for the study',
        type: 'number',
        min: 0,
        helpText: 'Number of CDA analysis rounds for the study',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'cdaOversightAndQc',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDA oversight and QC (hours per review)',
        type: 'number',
        step: 1,
        //required: true,
        min: 0,
        max: 9999999.99,
        helpText: 'CDA oversight and QC (hours per review)',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'totalCrmbudgetValue',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Total CRM Budget Value',
        type: 'number',
        step: 1,
        //required: true,
        min: 0,
        max: 9999999.99,
        helpText: 'Total CRM Budget Value',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'currencyTypeId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Currency Type',
        options: this.tblCrmParamService.getParams(this.currencyTypeParId),
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
      key: 'iconikForMedicalReviewCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'ICONIK for Medical Review',
        options: this.tblCrmParamService.getParams(this.YesNoParId),
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
      key: 'complexityFactorCdaid',
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
      key: 'centralMonitoringReportingComplexityId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Central Monitoring Reporting Complexity',
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
    }
    // {
    //   key: 'setupTime',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Set up time (days)',
    //     type: 'number',
    //     min: 0,
    //     helpText: 'Set up time (days)',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   }
    // }
  ];

  cancel() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.studyPropSub?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
    this.deleteRecordSub?.unsubscribe();
    this.studyIdSubscription?.unsubscribe();
  }
}
