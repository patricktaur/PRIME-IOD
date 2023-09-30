import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AbstractControl } from '@angular/forms';

// import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';
// import { StudyCdsDevTaskRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Location } from '@angular/common';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblCdsOutputCategoryCodelistService } from '@app/prism/masters/services/TblCdsOutputCategoryCodelist.service';
import { TblCdsDevelopmentCategoryCodelistService } from '@app/prism/masters/services/tblCdsDevelopmentCategoryCodelist.service';

import { StudyService } from '@app/prism/study/study.service';
import { StudyCDSOutputReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-output-task/study-cds-output-req.service';
import { StudyResourcesService } from '@app/prism/study/study-tabs/study-resources-group/study-resources/study-resources.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StudyCdsInstTaskViewShellComponent } from '@app/prism/study/study-tabs/study-cds-group/study-cds-inst-task/study-cds-inst-task-item-group/study-cds-inst-task-view-shell/study-cds-inst-task-view-shell.component';

import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';

@Component({
  selector: 'app-study-cds-output-task-edit',
  templateUrl: './study-cds-output-task-edit.component.html',
  styleUrls: ['./study-cds-output-task-edit.component.css']
})
export class StudyCDSOutputTaskEditComponent implements OnInit, OnDestroy {
  title = 'StudyCDSOutputTask';
  controllerName = 'TblOutputTaskRequests';
  loading: boolean = false;
  recId: number | undefined;
  record: any = {};
  form: FormGroup | any = new FormGroup({});
  temp: any;
  subCategoryExists = false;

  TempDate = new Date();
  TempDate1 = [this.TempDate.getFullYear(), this.TempDate.getMonth() + 1, this.TempDate.getDate()].join('');

  requestorRoleParId = 201;
  // developmentStatusParId = 4700;
  outputCategoryParId = 5100;
  yesNoParId = 600;
  yesNoNAParId = 7500;

  recurringFreqPId = 4800;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;

  showStudyIconNumberDropDown = false;

  users: any[] = [];
  id: number | any | null;
  editMode: string | undefined;
  stateObj: any;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private tblParamService: TblParamService,
    private tblCdsOutputCategoryCodelistService: TblCdsOutputCategoryCodelistService,
    private tblCdsDevelopmentCategoryCodelistService: TblCdsDevelopmentCategoryCodelistService,
    private tblUserService: TblUserService,
    // private requestIdService: StudyCdsDevTaskRequestIdService,
    private studyService: StudyService,
    public location: Location, //private tblParamService: TblParamService //private tblParamService: TblParamService
    private studyCDSOutputReqService: StudyCDSOutputReqService,
    private studyResourcesService: StudyResourcesService,
    private modalService: NgbModal,
    private httpService: StudyHttpService,
    @Inject('cds-output-server-response') private serverResponseService: ServerResponseService
  ) {
    // super(route);
  }

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
      this.TempDate1 = '0';
      this.editMode = 'edit';
      this.loadRecord(this.id);
    } else {
      this.editMode = 'new';
      this.loadNewRecord(studyId);
    }
  }

  ngAfterViewInit(): void {
    this.form.get('studyId').valueChanges.subscribe((value: any) => {
      //prevent change of clinicalDataDeliveryLeadId in edit mode:
      if (this.editMode == 'new') {
        this.loadProgrammingLead(value);
      }
    });

    this.SubCategoryCount();
  }

  SubCategoryCount(): void {
    this.form.get('outputTaskCategoryPid').valueChanges.subscribe((value: any) => {
      // alert("called");
      this.form.patchValue({
        outputTaskSubCategoryId: null
      });

      // console.log("Sub category");
      this.temp = this.tblCdsOutputCategoryCodelistService
        .getCdsOutputSubCategory(this.form.get('outputTaskCategoryPid').value ?? 0)
        .subscribe(
          (res: any) => {
            if (res.status === 400) {
              return;
            } else {
              // console.log(res);
              // console.log(res.length);
              if (res.length <= 0) {
                this.form.patchValue({
                  outputTaskSubCategoryId: null
                });
                this.subCategoryExists = false;
                this.form.get('outputTaskSubCategoryId').disable({ onlySelf: true });
              } else {
                this.subCategoryExists = true;
                this.form.get('outputTaskSubCategoryId').enable({ onlySelf: true });
              }
            }
          },
          (err: any) => {
            console.log(`err = ${JSON.stringify(err, null, 2)}`);
          }
        );
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
      });
    }
  }

  onShowInstructionTaskClicked(value: any) {
    const modalRef = this.modalService.open(StudyCdsInstTaskViewShellComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.taskId = this.record.cdsinstructionTaskId;
    modalRef.componentInstance.action = 'Add';

    modalRef.result.then(
      result => {
        if (result) {
          // result.roles = this.removeNonSelectedRolesFromRoles(result.roles);
          // this.addUser(result);
          // this.getUsersOnSearch(this.filter.value);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

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
      //  hideExpression: 'model.showStudyIconNumberDropDown != true',
      expressionProperties: {
        'templateOptions.disabled': x => x.showStudyIconNumberDropDown != true
      },

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
      key: 'repeatTaskDetailsJson',
      type: 'recurring-frequency',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Recurring Frequency',
        // helpText: 'Due Date',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
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
    {
      key: 'outputTaskCategoryPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Output Category',
        options: this.tblCdsOutputCategoryCodelistService.getCdsOutputCategory(),
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
      key: 'outputTaskSubCategoryId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Output Sub Category',
        helpText: 'Output Sub Category',

        options: [],
        valueProp: 'recId',
        labelProp: 'description',
        //required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.required': x => this.subCategoryExists
      },
      // validation: {
      //   show: true
      // },
      hooks: {
        onInit: (field: any) => {
          //FormlyFieldConfig
          field.templateOptions.options = field.form.get('outputTaskCategoryPid').valueChanges.pipe(
            startWith(this.record.outputTaskCategoryPid ?? 0),

            switchMap((outputTaskCategoryPid: number) =>
              this.tblCdsOutputCategoryCodelistService.getCdsOutputSubCategory(outputTaskCategoryPid ?? 0)
            )
          );
        }
      }
    },
    {
      key: 'onSchedulerPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'On Scheduler',

        options: this.tblParamService.getParams(this.yesNoNAParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',

        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'globalscape',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Globalscape',

        options: this.tblParamService.getParams(this.yesNoNAParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',

        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'outputTaskDetail',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Output Detail',
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
        label: 'Link To Task Instructions',

        rows: 3,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    //
    {
      key: 'cdsinstructionTaskId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDS Instruction Task Id',
        // helpText: 'Resource',

        options: [],
        valueProp: 'recId',
        labelProp: 'taskIdAndProgramName',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      },
      hooks: {
        onInit: (field: any) => {
          //FormlyFieldConfig
          field.templateOptions.options = field.form.get('studyId').valueChanges.pipe(
            startWith(this.record?.studyId),
            // switchMap((rolePId: number) => this.tblUserService.getUserByrole(rolePId))
            switchMap((studyId: number) => this.studyCDSOutputReqService.getInstIdAndNames(studyId ?? 0))
          );
        }
      }
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4'
        },
        {
          className: 'col-6',
          type: 'button',
          templateOptions: {
            text: 'Instruction Details',
            btnType: 'link',
            onClick: ($event: any) => this.onShowInstructionTaskClicked($event)
          }
        }
      ],
      hideExpression: 'model.cdsinstructionTaskId == null'
      // expressionProperties: {
      //   'templateOptions.disabled': x => true //x.cdsinstructionTaskId === null
      // },
    },

    {
      key: 'overDueComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Overdue Comments',
        rows: 3,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
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
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
  }
}
