import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Form, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';
import { AbstractControl } from '@angular/forms';

// import { StudyCdsDevTaskRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Location } from '@angular/common';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblCdsDevelopmentCategoryCodelistService } from '@app/prism/masters/services/tblCdsDevelopmentCategoryCodelist.service';

import { StudyService } from '@app/prism/study/study.service';

import { StudyResourcesService } from '@app/prism/study/study-tabs/study-resources-group/study-resources/study-resources.service';
import { Console } from 'console';

import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
// import { now } from 'core-js/core/date';

@Component({
  selector: 'app-study-cds-development-task-requests-edit',
  templateUrl: './study-cds-dev-task-req-edit.component.html',
  styleUrls: ['./study-cds-dev-task-req-edit.component.css']
})
export class StudyCDSDevelopmentTaskRequestsEditComponent implements OnInit, OnDestroy {
  title = 'StudyCDSDevelopmentTaskRequests';
  controllerName = 'TblDevelopmentTaskRequests';

  loading: boolean = false;
  recId: number | undefined;
  record: any = {};
  form: FormGroup | any = new FormGroup({});

  requestorRoleParId = 201;
  developmentStatusParId = 4700;
  developmentCategoryParId = 4600;
  yesNoParId = 600;

  TempDate = new Date();
  TempDate1 = [this.TempDate.getFullYear(), this.TempDate.getMonth() + 1, this.TempDate.getDate()].join('');

  showStudyIconNumberDropDown = false;

  users: any[] = [];
  id: number = 0;
  temp: any;
  subCategoryExists = false;

  unitFieldDisabled = false;
  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  loadSubUnitValue: Subscription | undefined;
  loadSubProgrammingLead: Subscription | undefined;
  // loadSub: Subscription;
  stateObj: any;

  serverResponses: any = [];

  editMode = '';

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private tblParamService: TblParamService,
    private tblCdsDevelopmentCategoryCodelistService: TblCdsDevelopmentCategoryCodelistService,
    private tblUserService: TblUserService,
    // private requestIdService: StudyCdsDevTaskRequestIdService,
    private studyService: StudyService,
    public location: Location,
    private studyResourcesService: StudyResourcesService,
    private httpService: StudyHttpService,
    @Inject('cds-development-server-response') private serverResponseService: ServerResponseService
  ) {
    // super(route);
  }

  ngOnInit(): void {
    let studyId: number = 0;

    let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if (id != null) {
      this.id = +id;
    }

    if (!this.id) {
      let stateObj: any = this.location.getState();
      this.id = stateObj.id;
      studyId = stateObj.studyId;
    }

    if (this.id > 0) {
      this.TempDate1 = '0';
      this.loadRecord(this.id);
    } else {
      this.editMode = 'new';

      this.loadNewRecord(studyId);
    }

    this.serverResponses = this.serverResponseService.serverResponses;
  }

  ngAfterViewInit(): void {
    // this.form.get('developmentCategoryPid').valueChanges.subscribe(value => {
    //   if (value) {

    //     // this.loadUnitValue(value);
    //   }
    // });

    this.form.get('studyId').valueChanges.subscribe((value: any) => {
      if (value) {
        if (this.editMode == 'new') {
          //this call assigns the ClinicalDataDeliveryLeadId
          this.loadNewRecord(value);
        }
      }
    });

    this.SubCategoryCount();
  }

  checkForLoadNew() {
    if (this.editMode == 'new') {
    }
  }

  SubCategoryCount(): void {
    this.form.get('developmentCategoryPid').valueChanges.subscribe((value: any) => {
      // alert("called");
      this.form.patchValue({
        developmentSubCategoryId: null
      });

      // console.log("Sub category");
      this.temp = this.tblCdsDevelopmentCategoryCodelistService
        .getCdsDevelopmentSubCategory(this.form.get('developmentCategoryPid').value ?? 0)
        .subscribe(
          (res: any) => {
            if (res.status === 400) {
              return;
            } else {
              // console.log(res);
              // console.log(res.length);
              if (res.length <= 0) {
                this.form.patchValue({
                  developmentSubCategoryId: null
                });
                this.subCategoryExists = false;
                this.form.get('developmentSubCategoryId').disable({ onlySelf: true });
              } else {
                this.subCategoryExists = true;
                this.form.get('developmentSubCategoryId').enable({ onlySelf: true });
              }
            }
          },
          (err: any) => {
            console.log(`err = ${JSON.stringify(err, null, 2)}`);
          }
        );
    });
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

  // loadProgrammingLead(studyId: number): void {
  //   //studyId
  //   if (studyId) {
  //     this.loadRecordSub = this.studyResourcesService.getCdplClinicalProgrammerId(studyId).subscribe((res: any) => {
  //       this.record = {
  //         ...this.record,
  //         clinicalDataDeliveryLeadId: res
  //       };
  //       // console.log("dxxx:" + res);
  //       // if (res) {

  //       // }
  //     });
  //   }
  // }

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
          console.log(res);
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

  get pastDueDateWarning() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dueDate = new Date(this.record?.dueDate);
    return this.record?.recId == 0 && this.record?.dueDate && dueDate < now ? true : false;
  }

  addOrUpdate() {
    this.loading = true;

    this.addUpdateSub = this.httpService.addOrUpdate(this.controllerName, this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
        this.serverResponseService.addServerMessages(res);
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }

  cancel() {
    this.location.back();
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

        // options: this.studyService.getStudyIconNumbersA(),
        options: this.studyService.getDmAndDmPlusImiAndImiStudyIconNumbers(),

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
    // {
    //   key: 'studyIconNumber',
    //   type: 'label',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Study Icon Number',
    //     hideLabel: true,
    //     disabled: true,
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   // hideExpression: this.showStudyIconNumberDropDown === false,
    //   hideExpression: 'model.showStudyIconNumberLabel != true'
    // },

    {
      key: 'dueDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Due Date',
        helpText: 'Due Date',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validators: {
        dueDate: {
          expression: (c: AbstractControl) =>
            Number(this.TempDate1) > 0 ? (c.value ? c.value.replaceAll('-', '') : 1) * 1 >= Number(this.TempDate1) : 1,
          message: (error: any, field: FormlyFieldConfig) => `The Due Date is in the past.`
          //message: (error: any, field: FormlyFieldConfig) => `"${(field.formControl.value).replaceAll('-', '').substr(0,8)}" > "${this.TempDate1}" The Due Date is in the past. "${this.record.recId}" `,
        }
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
        //  .getUserByrole(this.requestorRoleParId),

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
      key: 'cdsassignedToId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Programmer Assigned',
        helpText: 'To be populated by CDS/IMI CDPL only',

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
      key: 'validationProgrammerId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Validation Programmer',
        helpText: 'This applies to SDTM type validation only',
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
      key: 'clinicalDataDeliveryLeadId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Programming Lead',

        options: this.tblUserService.getUsers(),
        //  .getUserByrole(this.requestorRoleParId),

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
    // priority
    {
      key: 'priority',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Priority',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'developmentStatusPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Development Status',

        options: this.tblParamService.getParams(this.developmentStatusParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
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
      key: 'developmentCategoryPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Development Category',

        options: this.tblCdsDevelopmentCategoryCodelistService.getCdsDevelopmentCategory(),
        valueProp: 'recId',
        labelProp: 'description',
        description: '',
        placeholder: '-Select-',
        required: true,
        // change: this.loadUnitValue.bind(this),
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      },
      expressionProperties: {
        'templateOptions.disabled': 'model.requestCreatedBy !=null',
        'templateOptions.description': 'model.requestCreatedBy ? "The value is set by Study Task or CDMS Tracker and cannot be altered" :""'
      }
    },
    {
      key: 'developmentSubCategoryId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Development Sub Category',
        helpText: 'Development Sub Category',

        options: [],
        valueProp: 'recId',
        labelProp: 'description',
        //required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.required': x => this.subCategoryExists,
        'templateOptions.disabled': 'model.linkedToTaskOfReviewId !=null'
        // 'templateOption.disabled':'model.developmentSubCategoryId.ItemCollection <= 0',
        // 'model.developmentSubCategoryId': '!model.developmentSubCategoryId ? null: model.developmentSubCategoryId'
      },
      // validation:
      //   show: true
      // },
      hooks: {
        onInit: (field: any) => {
          field.form.get('developmentSubCategoryId').va;
          //FormlyFieldConfig

          field.templateOptions.options = field.form.get('developmentCategoryPid').valueChanges.pipe(
            startWith(this.record.developmentCategoryPid ?? 0),
            switchMap((developmentCategoryPid: number) =>
              this.tblCdsDevelopmentCategoryCodelistService.getCdsDevelopmentSubCategory(developmentCategoryPid ?? 0)
            )
          );
        }
      }
    },
    {
      key: 'developmentDetail',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Development Detail',
        rows: 3,
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },

      validation: {
        show: true
      }
    },
    {
      key: 'drtusedId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Is this output to be uploaded to DRT',
        helpText: 'DRT is used for listings that are reviewed internally by DM only',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
        required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'comments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Comments',
        rows: 3,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'linkToDocumentation',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Link To Specification',
        required: true,
        rows: 3,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'isThisaProgrammingPpcid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Is this an update to an existing Program',

        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
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
      key: 'noOfUnits',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'No of Units',
        type: 'number',
        required: true,
        helpText:
          'A unit is equivalent to a single listing output e.g. if a DVS specification specifies 20 listings capture 20 units. A unit can also be considered to be is equivalent to a dataset output e.g. for a coding program if 3 datasets generated capture 3 units.',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      expressionProperties: {
        'templateOptions.disabled': x => this.unitFieldDisabled
      }
    },
    //Not requred: CDS UAT Findings - PRISM V2 CDS TRACKER UAT FINDINGS Siobhan 24Aug2022:
    // {
    //   key: 'cdsvalidationRequired',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Centralized Validation Team Required',

    //     options: this.tblParamService.getParams(this.yesNoParId),
    //     valueProp: 'recId',
    //     labelProp: 'description',

    //     placeholder: '-Select-',
    //     helpText: '',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   validation: {
    //     show: true
    //   }
    // },
    {
      key: 'completedDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Completed Date',
        helpText: 'Actual Completed Date that the program is validated and installed to Production',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      }
    },

    {
      key: 'completedByDisplayName',
      type: 'label',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Completed By',
        hideLabel: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
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
