import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Observable, of } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Location } from '@angular/common';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

import { StudyService } from '@app/prism/study/study.service';
import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';
import { CdmsTrackerService } from '@app/prism/study/study-tabs/study-cdms-group/study-cdms-tracker/cdms-tracker.service';

import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { CredentialsService } from '@app/core';

import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-study-cdms-tracker-edit',
  templateUrl: './study-cdms-tracker-edit.component.html',
  styleUrls: ['./study-cdms-tracker-edit.component.css']
})
export class StudyCdmsTrackerEditComponent implements OnInit, OnDestroy {
  title = 'Cdms Tracker';
  controllerName = 'TblCdmsTasksTimelinesTrackerMainRecords';

  loading: boolean = false;
  recId: number | undefined;
  record: any;
  form : FormGroup | any = new FormGroup({});

  taskGroups: any[] | undefined;
  selectedTaskGroupId: any;
  taskGroupSelectVisible: boolean = false;
  //4900
  cppcNumberExists: boolean | undefined;

  cppcStatusParId = 4900;
  cppcReasonParId = 3300;

  // requestorRoleParId = 201;

  // codingCategoryParId = 6000;
  // codingPriorityParId = 5900;
  // yesNoParId = 600;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  checkCppcExistsSub: Subscription | undefined;
  studyPropSub: Subscription | undefined;

  showStudyIconNumberDropDown = false;

  users: any[] = [];
  id: number = 0;
  stateObj: any;

  studyId: number =0;
  hasDMManagerRole: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    private credentialsService: CredentialsService,
    // private requestIdService: StudyCdsDevTaskRequestIdService,
    private studyService: StudyService,
    public location: Location, //private tblParamService: TblParamService
    private httpService: StudyHttpService,
    private cdmsTrackerService: CdmsTrackerService,
    private studyEditService: StudyEditService,
    @Inject('cdms-tracker') private serverResponseService: ServerResponseService,
  ) {}

  ngOnInit(): void {
    let studyId: number = 0;

    let id : string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }

    if (!this.id) {
      let stateObj: any = this.location.getState();
      this.id = stateObj.id;
      //the following may be redundant, this.studyId is set in this.studyEditService.getStudyProperties - for refactor.
      studyId = stateObj.studyId;
      this.studyId = studyId;
      this.taskGroupSelectVisible = true;
    }

    if (this.id > 0) {
      this.loadRecord(this.id);
    } else {
      //this.loadNewRecord(studyId);
      this.loadTaskGroups(studyId);
    }

    //this page content becomes invalid if the StudyIconNumber dropdown is changed and refers to another study.
    //hence returning back to list.
    this.studyPropSub = this.studyEditService.getStudyProperties().subscribe((stProp: any) => {
      if (this.studyId && this.studyId !== stProp.studyId) {
        this.location.back();
      } else {
        this.studyId = stProp.studyId;
      }
    });

    if(this.credentialsService.getMenuPermission("reports/cdms/cdms-tracker")) {
      this.router.navigate(['view'], {relativeTo:this.route.parent, queryParams: {id: this.id }});
    }

    if(this.studyId!=0){
   
      this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
      //alert(this.credentialsService.userRoles);
      if(this.hasDMManagerRole!=true){
        this.hasDMManagerRole = this.credentialsService.userRoles.includes(UserRoles.Admin);
      }
      if(this.hasDMManagerRole!=true){
        this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM);
      }
      if(this.hasDMManagerRole!=true){
        this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.CDL);
      }
    }
  }

  ngAfterViewInit(): void {
    this.form.get('cppcNo').valueChanges.subscribe((value: any) => {
      this.CheckIfCPPCNumberExists();
    });
  }
  CheckIfCPPCNumberExists() {
    if (!this.record?.cppcNo) {
      return;
    }

    this.checkCppcExistsSub = this.cdmsTrackerService
      .cppcNumberExists(this.record.studyId, this.record.cppcNo, this.record.recId)
      .subscribe(
        (res: any) => {
          this.cppcNumberExists = res;
        },
        (err: any) => {
          console.log(`err = ${JSON.stringify(err, null, 2)}`);
          this.loading = false;
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

  loadTaskGroups(studyId: number) {
    this.loadNewRecordSub = this.cdmsTrackerService.getTaskGroups(studyId).subscribe(
      (res: any) => {
        this.taskGroups = res;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  onTaskGroupChange() {
    this.loadNewRecord(this.studyId, this.selectedTaskGroupId);
  }

  get taskGroupTitle() {
    //Used in New mode, drop down is disabled when edit is in progress.
    return this.form.dirty ? 'Locked, Cancel/Undo the current edit to unlock.' : '';
  }

  get completedDateIsRequired() {
    //completedDate is mandatory for all other items if the Go-Live (last item in array) has comlpleted date
    // const last = arr.at(-1);
    //assumption: last item is always 'Go-Live'
    const lastItem = this.record?.childItems.at(-1);
    if (lastItem.completedDate) {
      return true;
    }
    return false;
  }

  loadNewRecord(studyId: number, taskGroupId: number) {
    this.loading = true;
    this.loadNewRecordSub = this.cdmsTrackerService.getNew(studyId, taskGroupId).subscribe(
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

  model: any = {};
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'cppcNo', //??
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CPPC Number',
        type: 'number',
        min: 1,
        helpText: '',
        labelColClassName: 'col-3',
        fieldColClassName: 'col-3'
      },
      expressionProperties: {
        'templateOptions.disabled': x => x.ocIsSetUp || x.ocId == null,
        'templateOptions.required': x => !x.ocIsSetUp
      },
      validation: {
        show: true
      }
    },
    {
      key: 'cppcStatusId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Status',

        options: this.tblParamService.getParams(this.cppcStatusParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
        required: true,
        helpText: '',
        labelColClassName: 'col-3',
        fieldColClassName: 'col-9'
      },
      expressionProperties: {
        'templateOptions.disabled': x => x.ocId == null
      }
    },
    {
      key: 'numberOfEditChecks',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Number of Edit Checks',
        type: 'number',
        min: 0,
        helpText: '',
        labelColClassName: 'col-3',
        fieldColClassName: 'col-3'
      },
      expressionProperties: {
        'templateOptions.disabled': x => x.ocId == null
      },
      validation: {
        show: true
      }
    },
    {
      key: 'cppcReasonId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CPPC Reason',

        options: this.tblParamService.getParams(this.cppcReasonParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',

        helpText: '',
        labelColClassName: 'col-3',
        fieldColClassName: 'col-9'
      },
      expressionProperties: {
        'templateOptions.disabled': x => x.ocIsSetUp || x.ocId == null
      }
    },
    {
      key: 'comments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Comments',
        rows: 3,
        helpText: '',
        labelColClassName: 'col-3',
        fieldColClassName: 'col-9'
      },
      expressionProperties: {
        'templateOptions.disabled': x => x.ocId == null
      },
      validation: {
        show: true
      }
    }, //crfupdate
    {
      key: 'crfupdate',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Number of CRF Changes',
        type: 'number',
        min: 0,
        helpText: '',
        labelColClassName: 'col-3',
        fieldColClassName: 'col-3'
      },
      expressionProperties: {
        'templateOptions.disabled': x => x.ocId == null
      },
      validation: {
        show: true
      }
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        { className: 'col-3', template: '<label class="form-label">Split Go-live CPPC<label class="form-label">' },
        {
          className: 'col-6',
          key: 'splitGoLiveCppc',
          type: 'checkbox',

          validation: {
            show: true
          }
        }
      ],
      hideExpression: '!model?.showSplitGoLiveCppcCheckBox'
    },
    {
      template: '<hr>'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        { className: 'col-3', template: '<label class="form-label"><b>Task</b><label class="form-label">' },
        { className: 'col-1', template: '<label class="form-label"><b>Not Applicable</b><label class="form-label">' },
        { className: 'col-2', template: '<label class="form-label"><b>Start Date</b><label class="form-label">' },
        { className: 'col-2', template: '<label class="form-label"><b>Planned Completion Date</b><label class="form-label">' },
        { className: 'col-2', template: '<label class="form-label"><b>Actual Completion Date</b><label class="form-label">' },
        { className: 'col-2', template: '<label class="form-label"><b>Item Status</b><label class="form-label">' }
      ]
    },
    {
      fieldGroup: [
        {
          key: 'childItems',
          type: 'repeat',
          templateOptions: {
            hideRemoveButton: true,
            hideAddButton: true
          },
          fieldArray: {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-3',
                key: 'taskTaskName',
                type: 'label',
                wrappers: ['help-text'],
                templateOptions: {
                  hideLabel: true
                }
              },
              {
                className: 'col-1',
                key: 'notApplicable',
                type: 'checkbox',
                wrappers: ['help-text'],
                templateOptions: {}
              },
              {
                className: 'col-2',
                type: 'date-picker',
                key: 'startDate',
                wrappers: ['help-text'],
                templateOptions: {},
                expressionProperties: {
                  'templateOptions.disabled': x => x.notApplicable,
                  'templateOptions.required': x => !x.notApplicable,
                  'model.startDate': 'model.notApplicable  ? null : model.startDate'
                }
              },
              {
                className: 'col-2',
                type: 'date-picker',
                key: 'completionDate',
                wrappers: ['help-text'],
                templateOptions: {},
                expressionProperties: {
                  'templateOptions.disabled': x => x.notApplicable,
                  'templateOptions.required': x => !x.notApplicable,
                  'model.completionDate': 'model.notApplicable  ? null : model.completionDate'
                }
              },
              {
                className: 'col-2',
                type: 'date-picker',
                key: 'completedDate',
                wrappers: ['help-text'],
                templateOptions: {},
                expressionProperties: {
                  'templateOptions.disabled': x => x.notApplicable,
                  'templateOptions.required': x => !x.notApplicable && this.completedDateIsRequired,
                  'model.completedDate': 'model.notApplicable  ? null : model.completedDate'
                }
              },
              {
                className: 'col-2',
                key: 'itemStatus',
                type: 'label',
                wrappers: ['help-text'],
                templateOptions: {
                  hideLabel: true
                },
                expressionProperties: {
                  'model.itemStatus':
                    '(model.notApplicable ) ? "Not Applicable" : (model.completedDate) ? "Completed" : "Open" '
                }
              }
            ]
          }
        }
      ]
    }
  ];

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
    this.checkCppcExistsSub?.unsubscribe();
    this.studyPropSub?.unsubscribe();
  }
}
