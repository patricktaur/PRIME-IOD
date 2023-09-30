import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyTabsService } from '@app/prism/study/study-tabs/study-tabs.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';
import { StudyCdmsService } from '@app/prism/study/study-tabs/study-cdms-group/study-cdms.service';
import { timeStamp } from 'console';
import { distinctUntilChanged, startWith, map, switchMap, tap } from 'rxjs/operators';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
@Component({
  selector: 'app-study-cdms',
  templateUrl: './study-cdms.component.html',
  styleUrls: ['./study-cdms.component.css']
})
export class StudyCdmsComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  studyId: number = 0;
  record: any = {};
  study: any = {};

  yesNoParId = 600;
  cdmsRoleId = 203;
  cdmsVersionParId = 2100;
  rolesPermissionsParId = 650;

  timelineValidation: any = {};
  updateTimelines: boolean = false;

  // deliveryTypesParId = 5600;
  // yesNoParId = 600;
  // cdsNetworkLocationParId = 6300;
  // reportingPartnerParId = 5700;
  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  checkTimelineValSub: Subscription | undefined;
  getRaveVeevaIconOwnedValueSub: Subscription | undefined;

  hasDMManagerRole: boolean = false;

  constructor(
    public router: Router,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService,
    private studyTabService: StudyTabsService,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    private studyCdmsService: StudyCdmsService
  ) {}

  ngOnInit(): void {
    // this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.studyId = st;
    //   if (this.studyId > 0) {
    //     this.loadRecord(this.studyId);
    //   }
    // });

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadRecord(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe((value: any) => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  ngAfterViewInit(): void {
    this.form.get('splitGoLive').valueChanges.subscribe((value: any) => {
      this.CheckTimelineValidations();
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getStudyCdmsDTO(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          setTimeout(() => {
            this.setupValueChanges();
          }, 0);

          this.form.reset();

          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  setupValueChanges() {
    if (this.record?.isRave == true) {
      this.form.get('cdmsUrl').valueChanges.subscribe((value: any) => {
        this.setRaveIconOwnedValue(value);
      });
    }

    if (this.record?.isVeevaCdms == true) {
      this.form.get('cdmsUrlVeeva').valueChanges.subscribe((value: any) => {
        this.setVeevaCdmsIconOwnedValue(value);
      });
    }
  }

  CheckTimelineValidations() {
    // if (!this.record?.splitGoLive) {
    //   return;
    // }
    let splitGoLive = this.record?.splitGoLive ? this.record.splitGoLive : false;
    this.checkTimelineValSub = this.studyCdmsService.cdmsTimelineValidate(this.record.studyId, splitGoLive).subscribe(
      (res: any) => {
        this.timelineValidation = res;
        if (res.updateRequired == true) {
          this.record.updateTimelines = true; //for use during save.
          // this.record.showUpdatetimeLinesCheckBox =true;
          if (res.timelineValidationSuccess == false && res.updateRequired == true) {
            this.record.showUpdatetimeLinesCheckBox = res.updateRequired;
          }
          // if (res.updateRequired == true){
          //   this.form.markAsTouched();
          //   this.form.markAsDirty();

          // }
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  setRaveIconOwnedValue(cdmsUrl: string) {
    this.getRaveVeevaIconOwnedValueSub = this.studyCdmsService.getRaveIconOwned(cdmsUrl).subscribe((res: any) => {
      this.form.get('sponsorUrl').setValue(!res);
    });
  }

  setVeevaCdmsIconOwnedValue(cdmsUrl: string) {
    this.getRaveVeevaIconOwnedValueSub = this.studyCdmsService.getVeevaVaultIconOwned(cdmsUrl).subscribe((res: any) => {
      this.form.get('sponsorUrl').setValue(!res);
    });
  }

  saveRecord() {
    this.loading = true;
    this.saveSubscription = this.studyTabService.saveStudyCdms(this.studyId, this.record).subscribe(
      res => {
        this.record = res;
        this.form.reset();
        this.loading = false;
      },
      err => {
        console.log(`error while editing = ${err}`);
        this.loading = false;
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in CDMS.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  get cdsmLeadNameAndCoveringCdmsLeadNameAreIdentical() {
    return this.record?.cdmsLeadNameId > 0 && this.record?.cdmsLeadNameId == this.record?.secondCdmsLeadNameId
      ? true
      : false;
  }

  get requireTimeLineUpdate() {
    return true;
  }

  submit() {
    if (this.form.valid) {
      this.saveRecord();
    }
  }

  form: FormGroup | any = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      //1
      key: 'cdmsLeadNameId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS Lead Name',
        required: true,
        options: this.tblUserService.getUserByrole(this.cdmsRoleId),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',
        helpText: 'Select the name of the Lead CDMS.',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },

      validation: {
        show: true
      }
    },
    {
      //2
      key: 'secondCdmsLeadNameId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Covering CDMS Lead Name',

        options: this.tblUserService.getUserByrole(this.cdmsRoleId),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',
        helpText: 'Select the name of the second Lead CDMS.',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'cdmsVersionPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS Version',

        options: this.tblParamService.getParams(this.cdmsVersionParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
        //required: true,
        helpText:
          'CDMS version will be populated automatically once the CDMS URL is selected for Rave studies; Manually choose the appropriate CDMS version for other EDC studies; this need to be updated intermittently once the system is in production.',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => x.isRaveOrCdms
      }
    },

    {
      key: 'cdmsUrlText', //??
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS URL (only required for Rave and Veeva CDMS)',

        helpText: '',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      hideExpression: 'model?.isRaveOrCdms',
      validation: {
        show: true
      }
    },
    //drop down for cdmsUrl:
    {
      key: 'cdmsUrl', //??
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS URL (only required for Rave and Veeva CDMS)',

        options: this.studyCdmsService.getRaveUrls(),
        valueProp: 'recId',
        labelProp: 'value',

        placeholder: '-Select from Rave Urls-',

        helpText: '',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      hideExpression: '!model?.isRave',
      // hide: false,
      // hooks : {
      //   onInit: (field : FormlyFieldConfig) => {
      //     if (this.model?.isRave){
      //       const cdmsUrlControl = field.form.get('cdmsUrl');
      //       console.log("cdmsUrlControl" + cdmsUrlControl);

      //     }
      //     console.log("XXX");
      //     // const sponsorUrlControl = field.form.get('sponsorUrl');
      //     // const val = field.form.get('cdmsUrl').valueChanges.pipe(
      //     //   distinctUntilChanged(),
      //     //   tap(() => console.log("Value changed")),
      //     //   startWith(this.model.cdmsUrl),
      //     //   map((id => this.studyCdmsService.getRaveIconOwned(id)))
      //     // )
      //     // sponsorUrlControl.setValue(!sponsorUrlControl.value);
      //     //  console.log("val:" + JSON.stringify(sponsorUrlControl.value));
      //   }
      // },
      validation: {
        show: true
      }
    },
    {
      key: 'cdmsUrlVeeva', //??
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS URL (only required for Rave and Veeva CDMS)',

        options: this.studyCdmsService.getVeevaVaultUrls(),
        valueProp: 'id',
        labelProp: 'value',

        placeholder: '-Select from Veeva Vault Urls-',

        helpText: '',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      hideExpression: '!model?.isVeevaCdms',

      validation: {
        show: true
      }
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        { className: 'col-6', template: '<label class="form-label">Sponsor-owned/Sponsor-contracted URL/Vault <label class="form-label">' },
        {
          className: 'col-6',
          key: 'sponsorUrl',
          type: 'checkbox',

          expressionProperties: {
            'templateOptions.disabled': x => x.isRaveOrCdms
          },
          validation: {
            show: true
          }
        }
      ]
    },
    {
      key: 'actualNumberOfUniqueCrfs',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Actual Number of Unique CRFs',
        type: 'number',
        min: 0,
        helpText: 'Actual Number of Unique CRFs (This information should be updated throughout the study)',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-3'
      },

      validation: {
        show: true
      }
    },
    {
      key: 'editChecksCompleted',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Edit Checks Completed (including CFs)',
        type: 'number',
        min: 0,
        helpText: 'Actual Number of Unique CRFs (This information should be updated throughout the study)',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-3'
      },

      validation: {
        show: true
      }
    },

    {
      key: 'editChecksErrorsInDvsCdmsReview',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Edit Check Specification Errors (including CFs)',
        type: 'number',
        min: 0,
        helpText:
          'Enter the total number of Edit Checks (ECs and CFs) in error for initial CDMS Go-live. Errors are found through a review of the DVS 1st final version (or effective draft) by the CDMS team. The review focuses on the accuracy of the specs: logic, table names, variable names, visit names, etc. The aim is to identify inaccurate specs which would impact the quality of the CDMS programming and increase the failures during the validation step. The review occurs before and during the 1st round of programming of ECs and CFs. Potential errors are discussed with the DMPM/CDL. Edit checks with confirmed errors are counted. PPCs are not included.',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-3'
      },

      validation: {
        show: true
      }
    },
    {
      key: 'editChecksFailedRound1ValidationOnly',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Edit Checks Failed (including CFs) Round 1 Validation only',
        type: 'number',
        min: 0,
        helpText:
          'Enter the total number of Edit Checks (ECs and CFs) failed during 1st round of validation for initial CDMS Go-live (PPCs are not included).',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-3'
      },

      validation: {
        show: true
      }
    },

    {
      key: 'cdmsComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS Comments',
        helpText: 'Enter any comments related to CDMS',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },

      validation: {
        show: true
      }
    },
    {
      key: 'customFunctions',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Custom Functions',
        type: 'number',
        min: 0,
        helpText:
          'Enter the number of Custom Functions requested for initial CDMS Go-live. Update to actual number of Custom Functions when programming is complete.',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-3'
      },

      validation: {
        show: true
      }
    },
    //--
    {
      fieldGroupClassName: 'row',
      fieldGroup: [{ className: 'col-6', template: '<label class="form-label">Type of Inetegration Used <label class="form-label">' }]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        { className: 'col-1' },
        { className: 'col-2', template: '<label class="form-label"><b>Applicable</b><label class="form-label">' },
        { className: 'col-4', template: '<label class="form-label"><b>Description</b><label class="form-label">' },
        { className: 'col-5', template: '<label class="form-label"><b>Vendor Name</b><label class="form-label">' }
      ]
    },
    {
      fieldGroup: [
        {
          key: 'childIntegration',
          type: 'repeat',
          templateOptions: {
            hideRemoveButton: true,
            hideAddButton: true
          },
          fieldArray: {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-1'
              },
              {
                className: 'col-2',
                key: 'applicable',
                type: 'checkbox',
                wrappers: ['help-text'],
                templateOptions: {}
              },
              {
                className: 'col-4',
                type: 'label',
                key: 'typeOfIntegrationUsedPDescription',

                templateOptions: {}
              },
              {
                type: 'input',
                key: 'vendorName',
                className: 'col-5',
                wrappers: ['help-text'],
                templateOptions: {
                  //helpText: 'Enter the number of pages expected to be entered in the month, INCLUDING diary/QOL pages',
                  // type: 'number'
                },
                expressionProperties: {
                  'templateOptions.required': x => x.applicable
                }
              }
            ]
          }
        }
      ]
    },

    {
      key: 'otherIntegrationSpecify1',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Other Integration (Specify 1)',
        helpText: 'Other  Type of Integration1',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },

      validation: {
        show: true
      }
    },
    {
      key: 'otherIntegrationSpecify1VendorName',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Other Integration (Specify 1) Vendor Name',
        helpText: 'Other  Type of Integration1  Vendor Name',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },

      validation: {
        show: true
      }
    },
    {
      key: 'otherIntegrationSpecify2',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Other Integration (Specify 2)',
        helpText: 'Other  Type of Integration2',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },

      validation: {
        show: true
      }
    },
    {
      key: 'otherIntegrationSpecify2VendorName',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Other Integration (Specify 2) Vendor Name',
        helpText: 'Other  Type of Integration2  Vendor Name',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },

      validation: {
        show: true
      }
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        { className: 'col-6', template: '<label class="form-label">Split Go-live <label class="form-label">' },
        {
          className: 'col-6',
          key: 'splitGoLive',
          type: 'checkbox',

          validation: {
            show: true
          }
        }
      ]
    },
    {
      key: 'omrdbSetupCompleted',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'OMR Database Setup Completed',

        options: [
          { recId: true, description: 'Yes' },
          { recId: false, description: 'No' }
        ],
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',

        helpText: '',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },

    {
      key: 'visitDateFieldName',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Visit Date Field Name',
        helpText: 'Enter Visit Date Field Name',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },

      validation: {
        show: true
      }
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        { className: 'col-6', template: '<label class="form-label">Does this study use OC/OptiCON?<label class="form-label">' },
        {
          className: 'col-6',
          key: 'ocOptIcon',
          type: 'checkbox',

          validation: {
            show: true
          }
        }
      ]
    },
    {
      key: 'omrsubjectdispositionCompleted',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'OMR Subject Disposition Form Used in the Study',

        // options: this.tblParamService.getParams(this.yesNoParId),
        options: [
          { recId: true, description: 'Yes' },
          { recId: false, description: 'No' }
        ],
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',

        helpText: '',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'coreCrfStandardsPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CORE CRF Standards',

        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',

        helpText: '',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'comment',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CORE CRF Standards usage Comments',
        helpText: 'Enter any comments related to CORE CRF Standards',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.required': x => x.coreCrfStandardsPid == 601
      },

      validation: {
        show: true
      }
    },
    {
      key: 'universalCrfspecToolUsedId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Universal CRF Spec Tool Used',

        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',

        helpText: '',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'iconStandardRolesAndPermissionUsedId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'ICON Standard Roles and Permissions used',

        options: this.tblParamService.getParams(this.rolesPermissionsParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',

        helpText: '',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        { className: 'col-6', template: '<label class="form-label">Update Timelines' },
        {
          className: 'col-6',
          key: 'updateTimelines',
          type: 'checkbox',
          templateOptions: {
            // description:
            //   'Uncheck if you do not wish to update the derived dates to Timelins'
          },
          //timelineValidation
          // expressionProperties: {
          //   'templateOptions.disabled': x => x.isRaveOrCdms
          // },
          validation: {
            show: true
          }
        }
      ],
      hideExpression: '!model?.showUpdatetimeLinesCheckBox'
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
    this.checkTimelineValSub?.unsubscribe();
    this.getRaveVeevaIconOwnedValueSub?.unsubscribe();
  }
}
