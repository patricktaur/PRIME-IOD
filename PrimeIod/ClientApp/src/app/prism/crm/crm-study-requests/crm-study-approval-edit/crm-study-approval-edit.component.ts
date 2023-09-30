import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
//for user
import { UserRoles } from '@app/core/authentication/credentials.enums';

//for user with filter dropdown values:
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';
import { TblCrmParamService } from '@app/prism/masters/TblCrmParam/TblCrmParam.service';
import { CrmStudyRequestService } from '@app/prism/crm/crm-study-requests/crm-study-request-service';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { CrmStudyDetailsEditService } from '@app/prism/crm/crm-tabs/crm-study-details-edit.service';

@Component({
  selector: 'app-crm-study-approval-edit',
  templateUrl: './crm-study-approval-edit.component.html',
  styleUrls: ['./crm-study-approval-edit.component.css']
})
export class CrmStudyApprovalEditComponent implements OnInit {
  loading: boolean = false;
  title = 'Request to create new CRM Study - Approve/Reject';
  controllerName = 'TblRequestStudy';
  form = new FormGroup({});
  recId: number = 0;
  record: any;
  currentUser: any;

  sponsorParId = 1200;
  protocolPhaseParId = 300;
  therapeuticAreaParid = 1400;
  YesNoParId = 1000;
  yesNoItems: any = null;
  activityParId = 100;
  CentralMonitoringStatusParId = 200;
  cdaAnalysisFrequencyParId = 400;

  ComplixityFactorParId = 500;
  sdtmNotRequired = 690; // UerId -2
  sdtmNotAssigned = 724; //UserId -1

  iconNumberInStudy: string = '';

  submitForApprovalButton: boolean = false;
  withdrawRequestButton: boolean = false;

  ApprovedOrRejectedButton: boolean = true;
  undoRejectButton: boolean = false;

  showCanModifyAlert: boolean = false;
  canEditGroupOne: boolean = false; //enabled while approving, disabled while Undo Reject
  canEditGroupTwo: boolean = false; //disabled while approving

  // F: boolean = false;
  saveButton: boolean = false;
  removeButton: boolean = false;

  approverCommentsDisabled: boolean = false;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tblParamService: TblParamService,
    private tblCrmParamService: TblCrmParamService,
    private tblUserService: TblUserService,
    private credSerivce: CredentialsService,
    private crmStudyDetailsEditService: CrmStudyDetailsEditService,
    private requestsService: CrmStudyRequestService //for user with filter dropdown values: //private tblParamService: TblParamService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.credSerivce.currentUser;
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
  //   this.loadNewRecordSub = this.requestsService.getNewRecordModule().subscribe(
  //     (res: any) => {
  //       if (res.status === 400) {
  //         this.loading = false;
  //         return;
  //       } else {
  //         this.record = res;
  //        // this.setButtonVisibility(this.record);

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
        // if (res.status === 400) {
        //   this.loading = false;
        //   return;
        // } else {
        console.log(res);
        this.record = res;
        var temp = this.record.iconStudyCode;
        var temp1 = this.record.iconStudyCode;
        // this.record.firstIconNumber=temp.slice(0,4);
        // this.record.secondIconNumber=temp1.slice(5,9);
        //this.record.dmVendor=Number(this.record.dmVendor);
        this.loading = false;
        this.setButtonVisibility(this.record);
        //}
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  // setButtonVisibility(record: any) {
  //   if (!record?.statusCpId) {
  //     record.statusCpId = 1201;
  //   }

  //   if (record.statusCpId == 1201 && this.currentUserIsLastUpdatedByUser()) {
  //     this.saveButton = true;
  //     this.submitForApprovalButton = true;
  //   }
  //   if (record.statusCpId == 1202 && this.currentUserIsLastUpdatedByUser()) {
  //     this.withdrawRequestButton = true;
  //   }
  //   // record: { "requestUserDTO": { "recId": 0,
  //   this.removeButton = false;
  //   if (record?.recId > 0 && record.statusCpId == 1201 && this.currentUserIsLastUpdatedByUser()) {
  //     this.removeButton = true;
  //   }
  // }

  setButtonVisibility(record: any) {
    if (this.record.statusCpId == 1202) {
      this.ApprovedOrRejectedButton = true;
      this.showCanModifyAlert = true;
      this.canEditGroupOne = true;
      this.canEditGroupTwo = false;
    }
    if (this.record.statusCpId == 1203 || this.record.statusCpId == 1204) {
      this.ApprovedOrRejectedButton = false;
    }
    if (this.record.statusCpId == 1204) {
      this.undoRejectButton = true;
      //this.approverCommentsDisabled = true;
    }
  }

  showOtherUserAlert() {
    return this.record?.recId > 0 && //update
      !this.currentUserIsLastUpdatedByUser() &&
      this.record.statusCpId == 1201 //not submitted
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
    this.record.iconStudyCode = this.record.firstIconNumber + '/' + this.record.secondIconNumber;
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
          this.approve();
        }
      });
  }
  approve() {
    this.loading = true;
    // this.record.approvedBy = this.credSerivce.currentUser.fullName;
    this.addUpdateSub = this.requestsService.approve(this.record).subscribe(
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
          // modelOptions: {
          //   updateOn: 'blur',
          // },

          // asyncValidators: {
          //   validation: [
          //     (control: FormControl) => this.iconNumberExists(control.value).pipe(
          //       map(isValid => isValid ? null : true),
          //     ),
          //   ]
          // },
        }
      ]
    },
    // {
    //   key: 'studyName',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Study Name',
    //     maxLength: 100,
    //     description: 'Max 100 characters',
    //     required: true,
    //     helpText: 'Enter a Study Name',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   expressionProperties: {
    //     'templateOptions.disabled': x => !this.saveButton
    //   },
    //   validation: {
    //     show: true
    //   }
    // },
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
      key: 'sponsorStudyNo',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Sponsor Study No',
        required: true,
        maxLength: 10,
        description: 'Max 10 characters',
        helpText: 'Enter a Sponsor Study No',
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
      key: 'globalProjectManager',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Global Project Manager',
        required: true,
        maxLength: 250,
        description: 'Max 250 characters',
        helpText: 'Enter a Global Project Manager',
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
      key: 'cdmsEdcSystem',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS EDC System',
        // required: true,
        maxLength: 250,
        description: 'Max 250 characters',
        helpText: 'CDMS EDC System',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      // validation: {
      //   show: true
      // }
    },

    {
      key: 'iconDmContractedCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'ICON DM Contracted',
        //  required: true,

        options: this.tblCrmParamService.getParams(this.YesNoParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      // validation: {
      //   show: true
      // }
    },
    {
      key: 'dmVendor',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'DM Vendor',
        maxLength: 250,
        description: 'Max 250 characters',
        // required: true,

        // options: this.tblCrmParamService.getParams(this.YesNoParId),
        // valueProp: 'recId',
        // labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      // validation: {
      //   show: true
      // }
    },
    // {
    //   key: 'dmPmPointOfContract',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'DMPM Point of Contact',
    //     //  required: true,
    //     maxLength: 250,
    //     description: 'Max 250 characters',
    //     helpText: 'DMPM Point of Contact',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   }
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   // validation: {
    //   //   show: true
    //   // }
    // },
    // {
    //   key: 'cdlPointOfContract',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'CDL Point of Contact',
    //     // required: true,
    //     maxLength: 250,
    //     description: 'Max 250 characters',
    //     helpText: 'CDL Point of Contact',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   }
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   // validation: {
    //   //   show: true
    //   // }
    // },

    {
      key: 'therapeuticAreaPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Therapeutic Area',
        //  required: true,

        options: this.tblParamService.getParams(this.therapeuticAreaParid),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      // validation: {
      //   show: true
      // }
    },
    {
      key: 'protocolPhasePid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Protocol Phase',
        //   required: true,

        options: this.tblParamService.getParams(this.protocolPhaseParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      // validation: {
      //   show: true
      // }
    },
    {
      key: 'activityCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Activity',
        //   required: true,

        options: this.tblCrmParamService.getParams(this.activityParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      // validation: {
      //   show: true
      // }
    },

    {
      key: 'centralMonitoringStatusCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Central Monitoring Status',
        //  required: true,
        options: this.tblCrmParamService.getParams(this.CentralMonitoringStatusParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      // validation: {
      //   show: true
      // }
    },
    {
      key: 'complexityFactorCpId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Complexity Factor',
        //  required: true,
        options: this.tblCrmParamService.getParams(this.ComplixityFactorParId),
        valueProp: 'recId',
        labelProp: 'description',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      // validation: {
      //   show: true
      // }
    },
    // {
    //   key: 'cdaAnalysisFrequencyCpId',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'CDA Analysis Frequency',

    //     options: this.tblCrmParamService.getParams(this.cdaAnalysisFrequencyParId),
    //     valueProp: 'recId',
    //     labelProp: 'description',

    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   }
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   // validation: {
    //   //   show: true
    //   // }
    // },
    // {
    //   key: 'cdaId',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'CDA',
    //     //  required: true,
    //     options: this.tblUserService.getUserByrole(UserRoles.CRM_Central_Monitor),
    //     valueProp: 'id',
    //     labelProp: 'value',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   }
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   // validation: {
    //   //   show: true
    //   // }
    // },
    // {
    //   key: 'clinicalRiskManagerId',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Clinical Risk Manager',
    //     //  required: true,
    //     options: this.tblUserService.getUserByrole(UserRoles.CRM_Central_Monitor),
    //     valueProp: 'id',
    //     labelProp: 'value',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   }
    //   // expressionProperties: {
    //   //   'templateOptions.disabled': x => !this.saveButton
    //   // },
    //   // validation: {
    //   //   show: true
    //   // }
    // },
    // {
    //   key: 'dmstudyId',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'DM Study Icon Number',
    //     options: this.crmStudyDetailsEditService.getDMStudyIconNumber(),
    //     valueProp: 'recId',
    //     labelProp: 'studyIconNumber',
    //     //required: true,
    //     helpText: '',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   validation: {
    //     show: true
    //   }
    // },

    {
      template: '<hr>'
    },
    {
      key: 'requestorComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Requestor Comments',
        maxLength: 500,
        description: 'Max 500 characters',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // }
    },

    {
      key: 'approverComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Approver/Reject Comments',
        maxLength: 500,
        description: 'Max 500 characters',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => this.approverCommentsDisabled
      }
      //hideExpression:'model.statusCpId == 1202'
    },

    // {
    //   fieldGroupClassName: 'row',
    //   fieldGroup: [
    //     {
    //       className: 'col-4',
    //       template: '<label >Approver Comments</label>'
    //     },
    //     {
    //       key: 'approverComments',
    //       type: 'textarea',
    //       templateOptions: {
    //         maxLength:500,
    //         description: 'Max 500 characters',
    //         labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //       },
    //       expressionProperties: {
    //         'templateOptions.disabled': x => this.approverCommentsDisabled
    //       }
    //     }

    //   ],
    //   hideExpression: 'model.statusCpId == 1202'
    // },

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
      hideExpression: 'model.statusCpId < 1202'
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
      hideExpression: 'model.statusCpId < 1203'
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
