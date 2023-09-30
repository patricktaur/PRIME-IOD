import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
//for user
import { UserRoles } from '@app/core/authentication/credentials.enums';

//for user with filter dropdown values:
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

// import { RequestsStudyService } from '@app/prism/requests/study-requests/requests-study-.service';
import { RequestsIMIStudyService } from '@app/prism/requests/imi-study-requests/requests-imi-study-.service';

// import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-imi-study-request-approval-edit',
  templateUrl: './imi-study-request-approval-edit.component.html',
  styleUrls: ['./imi-study-request-approval-edit.component.css']
})
export class ImiStudyRequestApprovalEditComponent implements OnInit {
  loading: boolean = false;
  title = 'Approve request to create new IMI Study';
  controllerName = 'TblRequestStudy';
  form = new FormGroup({});
  recId: number = 0;
  record: any;

  ApprovedOrRejectedButton: boolean = true;
  undoRejectButton: boolean = false;

  regionParId = 1000;
  portfolioParId = 1100;
  sponsorParId = 1200;
  protocolPhaseParId = 300;
  cdmsParId = 1300;
  therapeuticAreaParid = 1400;
  subTaParid = 8700;
  yesNoParId = 600;
  sOPsParId = 1500;
  ePROParId = 1600;
  eProNonePId = 1603;
  specialPopulationParId = 1900;
  yesNoItems: any = null;

  fieldDisabled: boolean = true;
  approverCommentsDisabled: boolean = false;

  //User Table contains two special records:
  //recId 690 - Clinical Data Programming Lead Not Required
  //recId 790 - Clinical Programming Lead Not Assigned
  //and are used in cds sdtm programmer drop down selection.
  sdtmNotRequired = 690; // UerId -2
  sdtmNotAssigned = 724; //UserId -1
  //expressionProperties users hard coded values -as  variables could not be used
  clinicalResearchOrIconFunctional = 6400;
  imiCdms = 11372; //check value in staging and prod

  iconNumberInStudy: string = '';

  submitForApprovalButton: boolean = false;
  withdrawRequestButton: boolean = false;
  showCanModifyAlert: boolean = false;
  canEditGroupOne: boolean = false; //enabled while approving, disabled while Undo Reject
  canEditGroupTwo: boolean = false; //disabled while approving

  // F: boolean = false;
  saveButton: boolean = false;
  removeButton: boolean = false;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,

    private requestsService: RequestsIMIStudyService //for user with filter dropdown values: //private tblParamService: TblParamService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      let editMode = params.editMode;

      if (editMode == 'add') {
        // let studyId = params.studyId;

        // this.loadNewRecord();
        this.title = this.title + ' -create';
      } else {
        this.recId = params.id;

        this.loadRecord(this.recId);
        this.title = this.title + ' -modify';
      }
    });
  }

  // loadNewRecord() {
  //   this.loading = true;
  //   this.loadNewRecordSub = this.requestsService.getStudyRequestNew().subscribe(
  //     (res: any) => {
  //       if (res.status === 400) {
  //         this.loading = false;
  //         return;
  //       } else {
  //         this.record = res;
  //         this.setButtonVisibility(this.record);

  //         this.loading = false;
  //       }
  //       // this.isLoading = false;
  //     },
  //     (err: any) => {
  //       console.log(`err = ${JSON.stringify(err, null, 2)}`);
  //       this.loading = false;
  //     }
  //   );
  // }
  loadRecord(recId: number) {
    this.loading = true;
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.requestsService.getStudyRequestForEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.loading = false;
          this.setButtonVisibility(this.record);
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  setButtonVisibility(record: any) {
    if (this.record.isActioned == 1) {
      this.ApprovedOrRejectedButton = true;
      this.showCanModifyAlert = true;
      this.canEditGroupOne = true;
      this.canEditGroupTwo = false;
    }
    if (this.record.isActioned == 2 || this.record.isActioned == 3) {
      this.ApprovedOrRejectedButton = false;
    }
    if (this.record.isActioned == 3) {
      this.undoRejectButton = true;
      this.approverCommentsDisabled = true;
    }
  }

  addOrUpdate() {
    this.loading = true;

    this.addUpdateSub = this.requestsService.addOrUpdateStudyRequest(this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }

  deleteRecord(recId: number) {
    this.deleteRecordSub = this.requestsService.deleteStudyRequest(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          //sucess:

          this.location.back();
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
      let message = "There are unsaved changes in Study Request.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  iconNumberExists(): boolean {
    const firstIconNumber = this.record?.firstIconNumber;
    const secondIconNumber = this.record?.secondIconNumber;

    this.deleteRecordSub = this.requestsService
      .iconNumberExists(firstIconNumber, secondIconNumber)
      .subscribe((res: boolean | any) => {
        return res;
      });

    return false;
  }

  validateAndApprove() {
    this.iconNumberInStudy = '';
    const firstIconNumber = this.record?.firstIconNumber;
    const secondIconNumber = this.record?.secondIconNumber;

    this.deleteRecordSub = this.requestsService
      .iconNumberExists(firstIconNumber, secondIconNumber)
      .subscribe((res: boolean | any) => {
        if (res == true) {
          //found
          this.iconNumberInStudy = firstIconNumber + '/' + secondIconNumber;
        }
        if (this.iconNumberInStudy.length == 0) {
          this.imiApprove();
        }
      });
  }
  imiApprove() {
    this.loading = true;
    // this.record.approvedBy = this.credSerivce.currentUser.fullName;
    this.addUpdateSub = this.requestsService.imiApprove(this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }

  reject() {
    this.loading = true;
    // this.record.rejectedBy = this.credSerivce.currentUser.fullName;
    this.addUpdateSub = this.requestsService.reject(this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }

  undoReject() {
    this.loading = true;
    // this.record.rejectedBy = this.credSerivce.currentUser.fullName;
    this.addUpdateSub = this.requestsService.undoReject(this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }

  canReject() {
    if (this.ApprovedOrRejectedButton && this.record?.approverComments) {
      return true;
    } else {
      return false;
    }
  }

  back() {
    this.location.back();
  }

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Study Icon Number</label>'
        },

        {
          className: 'col-3',

          key: 'firstIconNumber',
          type: 'input',

          templateOptions: {
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.canEditGroupOne
          },
          validation: {
            show: true
          }
        },
        {
          className: 'col-1',
          template: '<label >-</label>'
        },
        {
          className: 'col-3',

          key: 'secondIconNumber',
          type: 'input',

          templateOptions: {
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.canEditGroupOne
          },
          validation: {
            show: true
          }
        }
      ]
    },
    {
      key: 'studyName',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Study Name',
        required: true,
        helpText: 'Enter a Name for the study. This should exactly match the study name in EDC.',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupOne
      },
      validation: {
        show: true
      }
    },
    {
      key: 'regionPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Region',
        required: true,

        options: this.tblParamService.getParams(this.regionParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupOne
      },
      validation: {
        show: true
      }
    },
    {
      key: 'portfolioPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Portfolio',
        required: true,

        options: this.tblParamService.getParams(this.portfolioParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupOne
      },
      validation: {
        show: true
      }
    },
    {
      key: 'dmpmmanagerPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'IMI TPM',
        required: true,
        options: this.tblUserService.getUserByrole(UserRoles.IMI_TPM),
        valueProp: 'id',
        labelProp: 'value',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupOne
      },
      validation: {
        show: true
      }
    },
    {
      key: 'dmpmpid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'IMI PM',
        required: true,
        options: this.tblUserService.getUserByrole(UserRoles.IMI_PM),
        valueProp: 'id',
        labelProp: 'value',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupOne
      },
      validation: {
        show: true
      }
    },
    {
      key: 'imipdpmid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'IMI PD',
        required: true,
        options: this.tblUserService.getUserByrole(UserRoles.IMI_PD_PM),
        valueProp: 'id',
        labelProp: 'value',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupOne
      },
      validation: {
        show: true
      }
    },

    {
      key: 'specialProjectPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Special Project',
        required: true,

        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupOne
      },
      validation: {
        show: true
      }
    },
    {
      key: 'dmpmrequiredPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'DMPM Required',
        required: true,

        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupOne
      },
      validation: {
        show: true
      }
    },

    {
      key: 'crspiconPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Clinical Research Services Project OR IconFunctional Solutions Project',
        required: true,

        options: this.tblParamService.getParams(this.clinicalResearchOrIconFunctional),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupOne
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
        // required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupOne
      },
      validation: {
        show: true
      }
    },

    {
      key: 'protocalPhasePid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Protocol Phase',
        // required: true,

        options: this.tblParamService.getParams(this.protocolPhaseParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupOne
      },
      validation: {
        show: true
      }
    },

    {
      key: 'imicdmspid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'IMI CDMS',
        // required: true,

        options: this.tblParamService.getParams(this.imiCdms),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupOne
      },
      validation: {
        show: true
      }
    },
    {
      key: 'sponsorPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Sponsor',
        required: true,

        options: this.tblParamService.getParams(this.sponsorParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupOne
      },
      validation: {
        show: true
      }
    },

    {
      template: '<hr>'
    },
    {
      key: 'requestorComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Requestor Comments',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.canEditGroupTwo
      }
    },

    {
      key: 'approverComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Approver Comments',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => this.approverCommentsDisabled
      }
    },

    {
      template: '<hr>'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'recId',
          type: 'label',

          templateOptions: {
            label: '  Request Id'
          }
        },

        {
          className: 'col-6',
          key: 'status',
          type: 'label',
          templateOptions: {
            label: '  Status'
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'requestedOn',
          type: 'label',
          templateOptions: {
            label: 'Request On',
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy'
          }
        },
        {
          className: 'col-9',
          key: 'requestedBy',
          type: 'label',
          templateOptions: {
            label: 'Requested By'
          }
        }
      ],
      hideExpression: 'model?.isActioned == 0'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'approvedOn',
          type: 'label',
          className: 'col-3',
          templateOptions: {
            label: 'Actioned On',
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy',
            labelColClassName: 'col-4',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'approvedBy',
          type: 'label',
          className: 'col-9',

          templateOptions: {
            label: 'Actioned by'
          }
        }
      ],
      hideExpression: 'model?.isActioned < 2'
    },
    {
      template: '<hr>'
    }
  ];

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
    this.deleteRecordSub?.unsubscribe();
  }
}
