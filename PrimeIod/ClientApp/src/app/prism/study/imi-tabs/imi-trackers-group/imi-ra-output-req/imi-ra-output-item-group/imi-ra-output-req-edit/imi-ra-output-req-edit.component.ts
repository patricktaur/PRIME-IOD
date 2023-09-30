import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';
// import { StudyCdsDevTaskRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Location } from '@angular/common';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

import { StudyService } from '@app/prism/study/study.service';

import { StudyResourcesService } from '@app/prism/study/study-tabs/study-resources-group/study-resources/study-resources.service';
import { Console } from 'console';

import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';

@Component({
  selector: 'app-imi-ra-output-req-edit',
  templateUrl: './imi-ra-output-req-edit.component.html',
  styleUrls: ['./imi-ra-output-req-edit.component.css']
})
export class ImiRaOutputReqEditComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'XXXXX';
  controllerName = 'TblImiRaOutputRequest';

  loading: boolean = false;
  recId: number = 0;
  record: any;
  form = new FormGroup({});

  requestorRoleParId = 201;
  developmentStatusParId = 4700;
  developmentCategoryParId = 4600;
  yesNoParId = 600;

  outputTypeParId = 9700; //9700
  requestPriorityParId = 9800;
  outputStatusParId = 9850;
  // requestTypeParId = 9350;

  showStudyIconNumberDropDown = false;

  users: any[] = [];
  id: number = 0;

  unitFieldDisabled = false;
  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  loadSubUnitValue: Subscription | undefined;
  loadSubProgrammingLead: Subscription | undefined;
  // loadSub: Subscription;
  stateObj: any;

  serverResponses: any = [];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    // private requestIdService: StudyCdsDevTaskRequestIdService,
    private studyService: StudyService,
    public location: Location,
    private studyResourcesService: StudyResourcesService,
    private httpService: StudyHttpService // @Inject('cds-development-server-response') private serverResponseService: ServerResponseService
  ) {}

  ngOnInit(): void {
    let studyId: number = 0;

   let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }

    if (!this.id) {
      let stateObj: any = this.location.getState();
      this.id = stateObj.id;
      studyId = stateObj.studyId;
    }

    if (this.id > 0) {
      this.loadRecord(this.id);
    } else {
      this.loadNewRecord(studyId);
    }

    // this.serverResponses = this.serverResponseService.serverResponses;
  }

  ngAfterViewInit(): void {
    // this.form.get('developmentCategoryPid').valueChanges.subscribe(value => {
    //   if (value) {
    //     this.loadUnitValue(value);
    //   }
    // });
    // //studyId
    // this.form.get('studyId').valueChanges.subscribe(value => {
    //   if (value) {
    //     this.loadProgrammingLead(value);
    //   }
    // });
  }

  loadUnitValue(id: number): void {
    this.unitFieldDisabled = false;
    this.loadRecordSub = this.tblParamService.getFieldValue(id).subscribe((res: any) => {
      if (res) {
        this.unitFieldDisabled = true;
        this.record = {
          ...this.record,
          noOfUnits: res
        };
      }
    });
  }

  loadProgrammingLead(studyId: number): void {
    //studyId
    if (studyId) {
      this.loadRecordSub = this.studyResourcesService.getCdplClinicalProgrammerId(studyId).subscribe((res: any) => {
        this.record = {
          ...this.record,
          clinicalDataDeliveryLeadId: res
        };
        // console.log("dxxx:" + res);
        // if (res) {

        // }
      });
    }
  }

  //--

  loadRecord(recId: number) {
    this.loading = true;
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.httpService.getRecordToEdit(this.controllerName, recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
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

  loadNewRecord(studyId: any) {
    this.loading = true;
    this.loadNewRecordSub = this.httpService.getNew(this.controllerName, studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
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

  addOrUpdate() {
    this.loading = true;

    this.addUpdateSub = this.httpService.addOrUpdate(this.controllerName, this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
        // this.serverResponseService.addServerMessages(res);
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes.  Click 'Ok' to continue without saving. ";
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
      this.addOrUpdate();
    }
  }

  back() {
    this.location.back();
  }

  //--

  options: FormlyFormOptions | any = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'studyId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Study Icon Number',

        options: this.studyService.getImiStudyIconNumbers(),
        valueProp: 'studyId',
        labelProp: 'studyIconNumber',

        required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => x.showStudyIconNumberDropDown != true
      },
      // hideExpression: 'model.showStudyIconNumberDropDown != true',

      //showStudyIconNumberDropDown
      validation: {
        show: true
      }
    },
    {
      key: 'outputTypeIds',
      type: 'ng-multi-select', //'multicheckbox',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Output Types',
        helpText: '',
        // options: this.model.deliveryTypes,
        multiple: true,
        min: 1,
        valueProp: 'recId',
        labelProp: 'description',

        options: this.tblParamService.getParams(this.outputTypeParId),

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },

    {
      key: 'requestTitle',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Request Title',
        required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      }
    },

    {
      key: 'outputRequestDetails',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Output Request Details',
        rows: 3,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'requestedpriorityPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Request Priority',
        options: this.tblParamService.getParams(this.requestPriorityParId),
        valueProp: 'recId',
        labelProp: 'description',
        required: true,
        placeholder: '-Select-',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'requestedDueDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Requested Due Date',
        helpText: 'First Programming Output Due Date',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'requestorId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Requestor',

        options: this.tblUserService.getUsers(),

        valueProp: 'id',
        labelProp: 'value',
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
      fieldGroupClassName: 'row bg-green',
      fieldGroup: [
        {
          className: 'col-12',
          template: '<label >To be completed by R&A</label>'
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          template: '<hr>'
        }
      ]
    },
    {
      key: 'developerAssignedId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Developer Assigned',
        helpText: '',

        options: this.tblUserService.getUsers(),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'outputReviewAssignedIds',
      type: 'ng-multi-select', //'multicheckbox',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Output Review Assigned',
        helpText: '',
        // options: this.model.deliveryTypes,
        multiple: true,
        valueProp: 'id',
        labelProp: 'value',

        options: this.tblUserService.getUsers(),

        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      }
    },
    {
      key: 'outputStatusId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Output Status',
        options: this.tblParamService.getParams(this.outputStatusParId),
        valueProp: 'recId',
        labelProp: 'description',
        required: true,
        placeholder: '-Select-',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'outputCompletedDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Output Completed Date',
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'progressDetails',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Progress Details',
        rows: 3,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    }
  ];

  ngOnDestroy(): void {
    this.loadSubUnitValue?.unsubscribe();
    this.loadSubProgrammingLead?.unsubscribe();
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
  }
}