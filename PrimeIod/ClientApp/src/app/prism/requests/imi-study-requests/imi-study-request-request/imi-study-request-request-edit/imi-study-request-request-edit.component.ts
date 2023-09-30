import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
//for user
import { UserRoles } from '@app/core/authentication/credentials.enums';

//for user with filter dropdown values:
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

// import { RequestsStudyService } from '@app/prism/requests/study-requests/requests-study-.service';
import { RequestsIMIStudyService } from '@app/prism/requests/imi-study-requests/requests-imi-study-.service';

import { CredentialsService } from '@app/core/authentication/credentials.service';

@Component({
  selector: 'app-imi-study-request-request-edit',
  templateUrl: './imi-study-request-request-edit.component.html',
  styleUrls: ['./imi-study-request-request-edit.component.css']
})
export class ImiStudyRequestRequestEditComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  title = 'Request to create new IMI only Study';
  controllerName = 'TblRequestStudy';
  form = new FormGroup({});
  recId: number = 0;
  record: any;
  currentUser: any;

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
  clinicalResearchOrIconFunctional = 6400;
  imiCdms = 11372; //check value in staging and prod

  //User Table contains two special records:
  //recId 690 - Clinical Data Programming Lead Not Required
  //recId 790 - Clinical Programming Lead Not Assigned
  //and are used in cds sdtm programmer drop down selection.
  sdtmNotRequired = 690; // UerId -2
  sdtmNotAssigned = 724; //UserId -1
  //expressionProperties users hard coded values -as  variables could not be used

  iconNumberInStudy: string = '';

  submitForApprovalButton: boolean = false;
  withdrawRequestButton: boolean = false;
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
    private credSerivce: CredentialsService,
    private requestsService: RequestsIMIStudyService //for user with filter dropdown values: //private tblParamService: TblParamService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.credSerivce.currentUser;
    this.route.queryParams.subscribe((params: any) => {
      let editMode = params.editMode;

      if (editMode == 'add') {
        // let studyId = params.studyId;

        this.loadNewRecord();
        this.title = this.title + ' -create';
      } else {
        this.recId = params.id;

        this.loadRecord(this.recId);
        this.title = this.title + ' -modify';
      }
    });
  }

  loadNewRecord() {
    this.loading = true;
    this.loadNewRecordSub = this.requestsService.getImiStudyRequestNew().subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.setButtonVisibility(this.record);

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
    if (!record?.isActioned) {
      record.isActioned = 0;
    }

    if (record.isActioned == 0 && this.currentUserIsLastUpdatedByUser()) {
      this.saveButton = true;
      this.submitForApprovalButton = true;
    }
    if (record.isActioned == 1 && this.currentUserIsLastUpdatedByUser()) {
      this.withdrawRequestButton = true;
    }
    // record: { "requestUserDTO": { "recId": 0,
    this.removeButton = false;
    if (record?.recId > 0 && record.isActioned == 0 && this.currentUserIsLastUpdatedByUser()) {
      this.removeButton = true;
    }
  }

  showOtherUserAlert() {
    return this.record?.recId > 0 && //update
      !this.currentUserIsLastUpdatedByUser() &&
      (this.record.isActioned == 0 || this.record.isActioned == 1) //not submitted
      ? true
      : false;

    return;
  }

  currentUserIsLastUpdatedByUser() {
    return true;
    // return this.record?.recId == 0 || this.currentUser.id === this.record?.updatedById ? true : false;
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

  submit() {
    if (this.form.dirty) {
      this.addOrUpdate();
    }
  }

  validateAndSubmitForApproval() {
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
          this.submitForApproval();
        }
      });
  }

  submitForApproval() {
    if (this.form.valid) {
      this.loading = true;

      this.addUpdateSub = this.requestsService.submitForApproval(this.record).subscribe(
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
  }
  withdrawRequest() {
    this.loading = true;

    this.addUpdateSub = this.requestsService.withdraw(this.record).subscribe(
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

  back() {
    this.location.back();
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

  // iconNumberExists(secondIconNumberCont: any): any {
  //   const firstIconNumber = this.record?.firstIconNumber;

  //   if (firstIconNumber?.length === 4 && secondIconNumberCont?.length === 4) {
  //     this.deleteRecordSub = this.requestsService
  //       .iconNumberExists(firstIconNumber, secondIconNumberCont)
  //       .subscribe((res: any) => {
  //         return res;
  //       });
  //   }
  // }

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
            required: true,
            // type: 'number',
            minLength: 4,
            maxLength: 4
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
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
            required: true,
            // type: 'number',
            minLength: 4,
            maxLength: 4
          },
          expressionProperties: {
            'templateOptions.disabled': x => !this.saveButton
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
        'templateOptions.disabled': x => !this.saveButton
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
        'templateOptions.disabled': x => !this.saveButton
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
        'templateOptions.disabled': x => !this.saveButton
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
        'templateOptions.disabled': x => !this.saveButton
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
        'templateOptions.disabled': x => !this.saveButton
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
        'templateOptions.disabled': x => !this.saveButton
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
        'templateOptions.disabled': x => !this.saveButton
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
        label: 'IMI PM Required',
        required: true,

        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
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
        'templateOptions.disabled': x => !this.saveButton
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
        'templateOptions.disabled': x => !this.saveButton
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
        'templateOptions.disabled': x => !this.saveButton
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
        'templateOptions.disabled': x => !this.saveButton
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
        'templateOptions.disabled': x => !this.saveButton
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
        'templateOptions.disabled': x => !this.saveButton
      }
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          template: '<label >Approver Comments</label>'
        },
        {
          className: 'col-4',

          key: 'approverComments',
          type: 'label',
          templateOptions: {
            hideLabel: true
          }
        }
      ],
      hideExpression: 'model.isActioned < 2'
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