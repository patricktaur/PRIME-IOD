import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';
// import { StudyCdsDevTaskRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Observable, of } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Location } from '@angular/common';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

import { StudyService } from '@app/prism/study/study.service';
import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-study-cds-coding-task-edit',
  templateUrl: './study-cds-coding-task-edit.component.html',
  styleUrls: ['./study-cds-coding-task-edit.component.css']
})
export class StudyCDSCodingTaskEditComponent implements OnInit, OnDestroy {
  title = 'StudyCDSCodingTask';
  controllerName = 'TblCodingRequest';

  loading: boolean = false;
  recId: number = 0;
  record: any;
  form = new FormGroup({});

  requestorRoleParId = 201;

  codingCategoryParId = 6000;
  codingPriorityParId = 5900;
  yesNoParId = 600;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;

  showStudyIconNumberDropDown = false;

  TempDate = new Date();
  TempDate1 = [this.TempDate.getFullYear(), this.TempDate.getMonth() + 1, this.TempDate.getDate()].join('');

  users: any[] = [];
  id: number = 0;
  stateObj: any;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    // private requestIdService: StudyCdsDevTaskRequestIdService,
    private studyService: StudyService,
    public location: Location, //private tblParamService: TblParamService
    private httpService: StudyHttpService,
    @Inject('cds-coding-server-response') private serverResponseService: ServerResponseService
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
      this.loadRecord(this.id);
    } else {
      this.loadNewRecord(studyId);
    }
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
      hideExpression: 'model.showStudyIconNumberDropDown != true',

      validation: {
        show: true
      }
    },
    {
      key: 'studyIconNumber',
      type: 'label',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Study Icon Number',
        hideLabel: true,
        disabled: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      hideExpression: 'model.showStudyIconNumberLabel != true'
    },
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
      key: 'codingSpecialistAssignedToId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Primary Coding Specialist',
        required: true,
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
      key: 'secondaryCodingSpecialistAssignedToId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Secondary Coding Specialist',

        options: this.tblUserService.getUsers(),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',

        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'codingTaskCategoryPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Coding Category',

        options: this.tblParamService.getParams(this.codingCategoryParId),
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
      key: 'codingPriorityPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Coding Priority',

        options: this.tblParamService.getParams(this.codingPriorityParId),
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
      key: 'codingTaskDetail',
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
