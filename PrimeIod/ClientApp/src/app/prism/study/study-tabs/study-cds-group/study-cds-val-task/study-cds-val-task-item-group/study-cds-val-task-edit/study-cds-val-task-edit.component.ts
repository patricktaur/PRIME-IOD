import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Location } from '@angular/common';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

import { StudyService } from '@app/prism/study/study.service';
import { StudyCDSValReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-val-task/study-cds-val-req.service';
import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';

@Component({
  selector: 'app-study-cds-val-task-edit',
  templateUrl: './study-cds-val-task-edit.component.html',
  styleUrls: ['./study-cds-val-task-edit.component.css']
})
export class StudyCDSValTaskEditComponent implements OnInit, OnDestroy {
  title = 'Validation Request';
  controllerName = 'TblCdsvalidationRequest';

  loading: boolean = false;
  recId: number = 0;
  record: any;
  form = new FormGroup({});

  requestorRoleParId = 201;
  validationStatusParId = 4700;
  developmentCategoryParId = 4600;
  yesNoParId = 600;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;

  showStudyIconNumberDropDown = false;

  testOptions: any;

  users: any[] = [];
  id: number = 0;
  stateObj: any;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public location: Location,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    private studyService: StudyService,
    private studyCdsService: StudyCDSValReqService,
    private httpService: StudyHttpService,
    @Inject('cds-validation-server-response') private serverResponseService: ServerResponseService
  ) {
    // super(route);
  }

  ngOnInit(): void {
    // super.ngOnInit();
    // this.stateObj = this.location.getState();
    // this.id = this.stateObj.id;
    // let studyId = this.stateObj.studyId;

    // if (this.id > 0) {
    //   this.loadRecord(this.id);

    //   this.validationTaskInvolvedOptions();
    // } else {
    //   this.loadNewRecord(studyId);
    // }

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

    console.log('val id:' + this.id);

    if (this.id > 0) {
      this.loadRecord(this.id);
      this.validationTaskInvolvedOptions();
    } else {
      this.loadNewRecord(studyId);
    }
  }

  validationTaskInvolvedOptions() {
    this.studyCdsService.getValidationTasks().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.testOptions = res;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  onSelectionChange(changedValue: string) {
    console.log('In Parent: ' + changedValue);

    this.record.validationTaskInvolved = changedValue;
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
      key: 'validationStatus',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Validation Status',

        options: this.studyCdsService.getValidationStatus(),
        valueProp: 'id',
        labelProp: 'value',

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
      key: 'currentValidationRound',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Current Validation Round',
        type: 'number',
        required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    // {
    //   key: 'validationTaskInvolved',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Validation Task Involved',

    //     options: this.studyCdsService.getValidationTasks(),
    //     valueProp: 'id',
    //     labelProp: 'value',

    //     placeholder: '-Select-',
    //     required: true,
    //     helpText: '',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   validation: {
    //     show: true
    //   }
    // },
    {
      key: 'validationTaskInvolved',
      type: 'ng-multi-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Validation Task Involved',

        options: this.studyCdsService.getValidationTasks(),
        valueProp: 'id',
        labelProp: 'value',

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
      key: 'validationStartDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Validation Start Date',

        required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'validationEndDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Validation End Date',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      }
    },
    {
      key: 'finalValidationRound',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Final Validation Round',
        type: 'number',
        required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'totalProgIssues',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Total Prog Issues',
        type: 'number',
        required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'totalSpecIssues',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Total Spec Issues',
        type: 'number',
        required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'totalValIssues',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Total Val Issues',
        type: 'number',
        required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'linkToValDocuments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Link To Val Documents',

        rows: 3,
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
        label: 'Validation Comments',

        rows: 3,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'validationPoc',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Validation POC',
        // helpText: 'To be populated by CDS/IMI CDPL only',

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
      key: 'validationMembers',
      type: 'ng-multi-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Validation Members',
        // helpText: 'To be populated by CDS/IMI CDPL only',

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
      key: 'validationDueDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Validataion Due Date',
        // helpText: 'Validation Due DAte',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    }
  ];

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
  }
}
