import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';
// import { StudyCdsDevTaskRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Location } from '@angular/common';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

import { StudyService } from '@app/prism/study/study.service';

import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { StudyCdsInstSelectTaskComponent } from '../study-cds-inst-select-task/study-cds-inst-select-task.component';
@Component({
  selector: 'app-study-cds-inst-task-edit',
  templateUrl: './study-cds-inst-task-edit.component.html',
  styleUrls: ['./study-cds-inst-task-edit.component.css']
})
export class StudyCDSInstTaskEditComponent implements OnInit, OnDestroy {
  title = 'StudyCDSInstTask';
  controllerName = 'TblInstructionRequest';

  loading: boolean = false;
  recId: number | undefined;
  record: any;

  form: FormGroup | any = new FormGroup({});

  requestorRoleParId = 201;
  developmentStatusParId = 4700;
  programmingTaskParId = 4600; //7000;
  yesNoParId = 600;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  loadRecordToCopy: Subscription | undefined;

  showStudyIconNumberDropDown = false;

  users: any[] = [];
  id: number | undefined;
  stateObj: any;

  editMode = '';
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    // private requestIdService: StudyCdsDevTaskRequestIdService,
    private studyService: StudyService,
    public location: Location,
    private httpService: StudyHttpService,
    @Inject('cds-instruction-server-response') private serverResponseService: ServerResponseService,
    private modalService: NgbModal
  ) {
    // super(route);
  }

  ngOnInit(): void {
    let studyId: number | undefined;
    let id: any = this.route.snapshot.queryParamMap.get('id');

    //let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if (id != null) {
      this.id = +id;
    }
    if (id != null) {
      this.id = parseInt(id);

      if (this.id > 0) {
        this.loadRecord(this.id);
      } else {
        this.editMode = 'new';
        this.loadNewRecord(studyId);
      }
    }
    if (this.id == null) {
      this.loadNewRecord(0);
    }
  }

  ngAfterViewInit(): void {
    this.form.get('studyId').valueChanges.subscribe((value: any) => {
      if (value) {
        if (this.editMode == 'new') {
          //this call assigns the CDPL
          this.loadNewRecord(value);
        }
      }
    });
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

  showSelectTaskPage() {
    const modalRef = this.modalService.open(StudyCdsInstSelectTaskComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      scrollable: true
    });

    modalRef.componentInstance.taskId = this.id;
    modalRef.componentInstance.taskIdToCopy.subscribe((taskIdToCopy: number) => {
      this.copyInstructions(taskIdToCopy);
    });
  }

  copyInstructions(sourceId: number) {
    const cdpPid = this.record.cdpPid;
    const cdplPid = this.record.cdplPid;
    this.loadRecordToCopy = this.httpService.getRecordToEdit(this.controllerName, sourceId).subscribe((res: any) => {
      console.log(res);
      this.form.get('programmingTaskPid').setValue(res.programmingTaskPid);
      this.form.get('programName').setValue(res.programName);

      if (this.record.cdplPid == 0 || this.record.cdplPid == null) {
       // this.form.get('cdpPid').setValue(res.cdpPid);
        this.form.get('cdplPid').setValue(res.cdplPid);
      }
      else if (this.record.cdplPid != 0 || this.record.cdplPid != null) {
        //this.form.get('cdpPid').setValue(cdpPid);
        this.form.get('cdplPid').setValue(cdplPid);
      }


      this.form.get('instructions').setValue(res.instructions);
      this.form.get('programLocation').setValue(res.programLocation);
      this.form.get('logLocation').setValue(res.logLocation);
      this.form.get('outputLocation').setValue(res.outputLocation);
      this.form.get('additionalComments').setValue(res.additionalComments);
      this.form.markAsDirty();
    });
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
      // hideExpression: 'model.showStudyIconNumberDropDown != true',
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

    // {
    //   key: 'cdpPid',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'CDL',

    //     options: this.tblUserService.getUsers(),
    //     //  .getUserByrole(this.requestorRoleParId),

    //     valueProp: 'id',
    //     labelProp: 'value',

    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   validation: {
    //     show: true
    //   }
    // },

    {
      key: 'cdplPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDPL',

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
      key: 'programmingTaskPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Instruction Program Task Category',

        options: this.tblParamService.getParams(this.programmingTaskParId),
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
      key: 'programName',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Program Detail',
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
      key: 'instructions',
      type: 'html-editor',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Instruction',
        rows: 4,
        toolbarPosition: 'bottom',
        // showToolbar: false,

        defaultFontSize: '5',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      }
    },
    // {
    //   key: 'instructions',
    //   type: 'html-editor',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Instruction',
    //     rows: 4,
    //     toolbarPosition : 'bottom',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-8'
    //   }
    // },
    {
      key: 'programLocation',
      type: 'html-editor',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Program Location',
        rows: 4,
        toolbarPosition: 'bottom',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      }
    },
    {
      key: 'logLocation',
      type: 'html-editor',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Log Location',
        rows: 4,
        toolbarPosition: 'bottom',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      }
    },
    {
      key: 'outputLocation',
      type: 'html-editor',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Output Location',
        rows: 4,
        toolbarPosition: 'bottom',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      }
    },
    {
      key: 'additionalComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Additional Comments',
        rows: 3,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      }
    }
  ];

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
    this.loadRecordToCopy?.unsubscribe();
  }
}
