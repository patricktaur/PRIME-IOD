import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyTabsService } from '@app/prism/study/study-tabs/study-tabs.service';
import { ImiStudyReviewService } from '@app/prism/study/imi-tabs/imi-study-review.service';

import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';
import { StudyCdmsService } from '@app/prism/study/study-tabs/study-cdms-group/study-cdms.service';

import { timeStamp } from 'console';
import { distinctUntilChanged, startWith, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-imi-study-cdms',
  templateUrl: './imi-study-cdms.component.html',
  styleUrls: ['./imi-study-cdms.component.css']
})
export class ImiStudyCdmsComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  studyId: number = 0;
  record: any;
  study: any;

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

  constructor(
    public router: Router,
    private studyEditService: StudyEditService,
    private studyTabService: ImiStudyReviewService,
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
      if (st?.studyType == 'DM+IMI' || st?.studyType == 'IMI') {
        this.studyId = st.studyId;
        this.loadRecord(st.studyId);
      }
      if (st?.studyType == 'DM') {
        this.router.navigate(['/study/review']);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe((value: any) => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  ngAfterViewInit(): void {
    // this.form.get('splitGoLive').valueChanges.subscribe(value => {
    //   this.CheckTimelineValidations();
    // });
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

  form : FormGroup | any = new FormGroup({});
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
      key: 'coveringCdmsLeadNameId',
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
      key: 'cdmsUrl', //??
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS URL (only required for Rave and Veeva CDMS)',

        helpText: '',
        labelColClassName: 'col-6',
        fieldColClassName: 'col-6'
      },

      validation: {
        show: true
      }
    },
    //drop down for cdmsUrl:

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
    }

    // {
    //   key: 'comment',
    //   type: 'input',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'CORE CRF Standards usage Comments',
    //     helpText: 'Enter any comments related to CORE CRF Standards',
    //     labelColClassName: 'col-6',
    //     fieldColClassName: 'col-6'
    //   },
    //   expressionProperties: {
    //     'templateOptions.required': x => x.coreCrfStandardsPid == 601
    //   },

    //   validation: {
    //     show: true
    //   }
    // },
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
