import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

import { StudyReviewService } from '../../../study-review.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-study-timeline',
  templateUrl: './study-timeline.component.html',
  styleUrls: ['./study-timeline.component.css']
})
export class StudyTimelineComponent implements OnInit, OnDestroy {
  yesNoParId = 600;
  study: any;
  studyTimeLineForm: FormGroup | undefined;
  studyTimelines: any;

  yesNoItems: any = null;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;

  constructor(
    public router: Router,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService,
    private builder: FormBuilder,
    private studyReviewService: StudyReviewService
  ) {}

  ngOnInit(): void {
    // this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.study = st;
    //   if (this.study > 0) {
    //     this.loadStudyTimelines(this.study);
    //   }
    // });

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.study = st.studyId;

        this.loadStudyTimelines(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  loadStudyTimelines(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyTimelinesDTO(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studyTimelines = res;
          this.form.reset();
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  saveStudyTimelines() {
    this.loading = true;
    this.saveSubscription = this.studyReviewService.saveStudyTimelines(this.study, this.studyTimelines).subscribe(
      res => {
        console.log(`success`);
        this.studyTimelines = res;
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
      let message = "There are unsaved changes in Timelines.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }
  get timeLineValations(): any {
    let errorMessages: string[] = [];

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeProtocolApprovalPlanned,
      false,
      this.studyTimelines?.timeDmpsignedOffPlanned,
      false,
      'Planned DMP Sign off date should be after Protocol Approval date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeProtocolApprovalActual,
      false,
      this.studyTimelines?.timeDmpsignedOffActual,
      false,
      'Actual DMP Sign off date should be after Protocol Approval date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeProtocolApprovalPlanned,
      false,
      this.studyTimelines?.timeCdmsgolivePlanned,
      false,
      'Planned CDMS Go-live date should be after Protocol Approval date'
    );
    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeProtocolApprovalActual,
      false,
      this.studyTimelines?.timeCdmsgoLiveActual,
      false,
      'Actual CDMS Go-live date should be after Protocol Approval date'
    );
    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeEdcscreensGoLivePlanned,
      this.studyTimelines?.timeEdcscreensGoLiveFlag,
      this.studyTimelines?.timeCdmsgolivePlanned,
      false,
      'Planned CDMS Go-live date should be after EDC Screens Go-live date'
    );
    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeEdcscreensGoLiveActual,
      this.studyTimelines?.timeEdcscreensGoLiveFlag,
      this.studyTimelines?.timeCdmsgoLiveActual,
      false,
      'Actual CDMS Go-live date should be after EDC Screens Go-live date'
    );
    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeProtocolApprovalPlanned,
      false,
      this.studyTimelines?.timeFpiPlanned,
      false,
      'Planned FPI should be after Protocol Approval date'
    );
    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeProtocolApprovalActual,
      false,
      this.studyTimelines?.timeFpiActual,
      false,
      'Actual FPI should be after Protocol Approval date'
    );
    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeFpiPlanned,
      false,
      this.studyTimelines?.timeLpiPlanned,
      false,
      'Planned LPI date should be after FPI date'
    );
    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeFpiActual,
      false,
      this.studyTimelines?.timeLpiActual,
      false,
      'Actual LPI date should be after FPI date'
    );
    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeLpiPlanned,
      false,
      this.studyTimelines?.timeLpoPlanned,
      false,
      'Planned LPO date should be after LPI date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeLpiActual,
      false,
      this.studyTimelines?.timeLpoActual,
      false,
      'Actual LPO date should be after LPI date'
    );
    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeLpoPlanned,
      false,
      this.studyTimelines?.timeMainSoftLockPlanned,
      false,
      'Planned Main SoftLock date should be after LPO date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeLpoActual,
      false,
      this.studyTimelines?.timeMainSoftLockActual,
      false,
      'Actual Main SoftLock date should be after LPO date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeMainSoftLockPlanned,
      false,
      this.studyTimelines?.timeMainDblPlanned,
      false,
      'Planned Main DBL date should be after Main SoftLock date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeMainSoftLockActual,
      false,
      this.studyTimelines?.timeMainDblActual,
      false,
      'Actual Main DBL date should be after Main SoftLock date'
    );
    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeMainDblPlanned,
      false,
      this.studyTimelines?.timeFollowUpDblPlanned,
      this.studyTimelines?.timeFollowUpDblFlag,
      'Planned FollowUp DBL date should be after Main DBL date'
    );
    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeMainDblActual,
      false,
      this.studyTimelines?.timeFollowUpDblActual,
      this.studyTimelines?.timeFollowUpDblFlag,
      'Actual FollowUp DBL date should be after Main DBL date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeMainDblPlanned,
      false,
      this.studyTimelines?.timeFinalTmfarchivedPlanned,
      false,
      'Planned Final TMF Archived date should be after Main DBL date'
    );
    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeMainDblActual,
      false,
      this.studyTimelines?.timeFinalTmfarchivedActual,
      false,
      'Actual Final TMF Archived date should be after Main DBL date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeMainDblPlanned,
      false,
      this.studyTimelines?.timeFollowUpLpoPlanned,
      this.studyTimelines?.timeFollowUpLpoFlag,
      'Planned FollowUp LPO date should be after Main DBL date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeMainDblActual,
      false,
      this.studyTimelines?.timeFollowUpLpoActual,
      this.studyTimelines?.timeFollowUpLpoFlag,
      'Actual FollowUp LPO date should be after Main DBL date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeFollowUpLpoPlanned,
      this.studyTimelines?.timeFollowUpLpoFlag,
      this.studyTimelines?.timeFollowUpSoftLockPlanned,
      this.studyTimelines?.timeFollowUpSoftLockFlag,
      'Planned FollowUp SoftLock date should be after FollowUp LPO date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeFollowUpLpoActual,
      this.studyTimelines?.timeFollowUpLpoFlag,
      this.studyTimelines?.timeFollowUpSoftLockActual,
      this.studyTimelines?.timeFollowUpSoftLockFlag,
      'Actual FollowUp SoftLock date should be after FollowUp LPO date'
    );
    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeFollowUpSoftLockPlanned,
      this.studyTimelines?.timeFollowUpSoftLockFlag,
      this.studyTimelines?.timeFollowUpDblPlanned,
      this.studyTimelines?.timeFollowUpDblFlag,
      'Planned FollowUp DBL date should be after FollowUp SoftLock date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeFollowUpSoftLockActual,
      this.studyTimelines?.timeFollowUpSoftLockFlag,
      this.studyTimelines?.timeFollowUpDblActual,
      this.studyTimelines?.timeFollowUpDblFlag,
      'Actual FollowUp DBL date should be after FollowUp SoftLock date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeFollowUpLpoPlanned,
      this.studyTimelines?.timeFollowUpLpoFlag,
      this.studyTimelines?.timeFollowUpDblPlanned,
      this.studyTimelines?.timeFollowUpDblFlag,
      'Planned FollowUp DBL date should be after FollowUp LPO date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeFollowUpLpoActual,
      this.studyTimelines?.timeFollowUpLpoFlag,
      this.studyTimelines?.timeFollowUpDblActual,
      this.studyTimelines?.timeFollowUpDblFlag,
      'Actual FollowUp DBL date should be after FollowUp LPO date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeFollowUpDblPlanned,
      this.studyTimelines?.timeFollowUpDblFlag,
      this.studyTimelines?.timeFinalTmfarchivedPlanned,
      false,
      'Planned Final TMF Archived date should be after FollowUp DBL date'
    );

    this.AddValidations(
      errorMessages,
      this.studyTimelines?.timeFollowUpDblActual,
      this.studyTimelines?.timeFollowUpDblFlag,
      this.studyTimelines?.timeFinalTmfarchivedActual,
      false,
      'Actual Final TMF Archived date should be after FollowUp DBL date'
    );

    return errorMessages;
  }

  AddValidations(
    errorMessage: string[],
    firstDate: Date,
    firstDateNA: boolean,
    secondDate: Date,
    secondDateNA: boolean,
    message: string
  ) {
    if (firstDateNA == true || secondDateNA == true) {
      return;
    }
    if (!(firstDate && secondDate)) {
      return;
    }
    let errorItem: string;
    errorItem = new Date(firstDate)?.getTime() > new Date(secondDate)?.getTime() ? message : '';

    if (errorItem) {
      errorMessage.push(errorItem);
    }
  }

  form = new FormGroup({});
  model: any = {};
  //  options: FormlyFormOptions | any = {};
  public options: FormlyFormOptions | any = {
    formState: {
      mainModel: this.model,
      disabled: true
    }
  };
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row bg-green',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<label >Fields</label>'
        },
        {
          className: 'col-1',
          template: '<label >N/A</label>'
        },
        {
          className: 'col-4',
          template: '<label >Planned</label>'
        },
        {
          className: 'col-4',
          template: '<label >Actual</label>'
        }
      ]
    },
    {
      key: 'records',
      type: 'repeat',
      templateOptions: {
        hideRemoveButton: true,
        hideAddButton: true
      },
      fieldArray: {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-4',
            type: 'label',
            key: 'recId',
            wrappers: ['help-text'],
            templateOptions: {}
          },

          {
            className: 'col-2',
            key: 'numericValue',
            type: '0-100-select', //0-100-select custom-select
            wrappers: ['help-text'], //workaround for displaying mandatory *
            templateOptions: {
              // required: true
            },
            expressionProperties: {
              'templateOptions.helpText': x => x.riskSetTaskCriteria
            }
          },

          {
            type: 'textarea',
            key: 'comments',
            wrappers: ['help-text'],
            className: 'col-6'
          }
        ]
      }
    },

    {
      fieldGroupClassName: 'row  bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<label >Protocol Approval</label>'
        },
        {
          className: 'col-1'
        },
        {
          className: 'col-4',
          key: 'timeProtocolApprovalPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText:
              'date when Final protocol is received by DM: enter/update Planned date . Do not update Planned date once actual date is entered.',
            helpTextPlacement: 'left',
            required: true
          }
        },
        {
          className: 'col-4',
          key: 'timeProtocolApprovalActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText: 'Date when Final protocol is received by DM: enter Actual date .',
            helpTextPlacement: 'left'
          }
        }
      ]
    },

    //row is displayed when model.timeEdcscreensGoLiveDerivedFlag == true,
    //label for Actual Value
    {
      fieldGroupClassName: 'row bg-light-blue bg-light-blue',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label class="align-middle">EDC Screen Go-live </label>',
          hideExpression: 'model.timeEdcscreensGoLiveDerivedFlag != true'
        },
        {
          className: 'col-1 mx-auto',
          key: 'timeEdcscreensGoLiveFlag',
          type: 'checkbox',
          wrappers: ['help-text'], //workaround - checkbox is alinged in the middle
          hideExpression: 'model.timeEdcscreensGoLiveDerivedFlag != true'
        },
        {
          className: 'col-4',
          key: 'timeEdcscreensGoLivePlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText: "EDC Screens Go-live' only used with split go-live.",
            helpTextPlacement: 'left'
          },

          expressionProperties: {
            'templateOptions.disabled': x => x.timeEdcscreensGoLiveFlag,
            'templateOptions.required': x => !x.timeEdcscreensGoLiveFlag
          },
          hideExpression: 'model.timeEdcscreensGoLiveDerivedFlag != true'
        },
        {
          className: 'col-4',

          key: 'timeEdcscreensGoLiveActual',
          type: 'label',

          templateOptions: {
            description: 'Derived From CDMS Tracker',
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy'
          },
          hideExpression: 'model.timeEdcscreensGoLiveDerivedFlag != true'
        }
      ]
    },

    //row is hidden when model.timeEdcscreensGoLiveDerivedFlag == true
    //datepicker for Actual Value
    {
      fieldGroupClassName: 'row bg-light-blue bg-light-blue',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label class="align-middle">EDC Screen Go-live </label>',
          hideExpression: 'model.timeEdcscreensGoLiveDerivedFlag == true'
        },
        {
          className: 'col-1 mx-auto',
          key: 'timeEdcscreensGoLiveFlag',
          type: 'checkbox',
          wrappers: ['help-text'], //workaround - checkbox is alinged in the middle
          hideExpression: 'model.timeEdcscreensGoLiveDerivedFlag == true'
        },
        {
          className: 'col-4',
          key: 'timeEdcscreensGoLivePlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText: "EDC Screens Go-live' only used with split go-live.",
            helpTextPlacement: 'left'
          },

          expressionProperties: {
            'templateOptions.disabled': x => x.timeEdcscreensGoLiveFlag,
            'templateOptions.required': x => !x.timeEdcscreensGoLiveFlag
          },
          hideExpression: 'model.timeEdcscreensGoLiveDerivedFlag == true'
        },
        {
          className: 'col-4',

          key: 'timeEdcscreensGoLiveActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          expressionProperties: {
            'templateOptions.disabled': x => x.timeEdcscreensGoLiveFlag
          },
          hideExpression: 'model.timeEdcscreensGoLiveDerivedFlag == true'
        }
      ]
    },

    {
      fieldGroupClassName: 'row bg-light-blue',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >DMP Signed Off</label>'
        },
        {
          className: 'col-1'
        },
        {
          className: 'col-4',

          key: 'timeDmpsignedOffPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText:
              'Date when first version of DMP is signed off: : enter/update Planned date . Do not update Planned date once actual date is entered.',
            helpTextPlacement: 'left'
          }
        },
        {
          className: 'col-4',
          key: 'timeDmpsignedOffActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText: 'Date when first version of DMP is signed off: enter Actual date .',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    //row is displayed when model.timeCdmsgolivePlanned == true,
    //label for Actual Value
    //----
    //row is displayed when model.timeEdcscreensGoLiveDerivedFlag == true,
    //label for Actual Value
    {
      fieldGroupClassName: 'row bg-light-blue bg-light-blue',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label class="align-middle">CDMS GO-live</label>'
        },
        {
          className: 'col-1 mx-auto'
        },
        {
          className: 'col-4',
          key: 'timeCdmsgolivePlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText:
              'Full EDC Go-live date : enter/update Planned date . Do not update Planned date once actual date is entered',
            helpTextPlacement: 'left'
          },

          expressionProperties: {
            // 'templateOptions.disabled': (model: any, formState: any, field: FormlyFieldConfig) => {
            //   return !formState.mainModel.text;
            // }
          }
        },
        {
          className: 'col-4',

          key: 'timeCdmsgoLiveActual',
          type: 'label',

          templateOptions: {
            description: 'Derived From CDMS Tracker',
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy'
          }
        }
      ],
      hideExpression: 'model.timeCdmsgoLiveActualDerivedFlag != true'
    },

    //---
    {
      fieldGroupClassName: 'row bg-light-blue',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >CDMS GO-live</label>'
        },
        {
          className: 'col-1'
        },
        {
          className: 'col-4',

          key: 'timeCdmsgolivePlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText:
              'Full EDC Go-live date : enter/update Planned date . Do not update Planned date once actual date is entered.',
            helpTextPlacement: 'left',
            required: true
          },
          expressionProperties: {
            // 'templateOptions.disabled': (model: any, formState: any, field: FormlyFieldConfig) => {
            //   return !formState.mainModel.text;
            // }
            // 'props.disabled': 'formState.disabled',
          }
        },

        {
          className: 'col-4',
          key: 'timeCdmsgoLiveActual',
          type: 'date-picker',
          wrappers: ['help-text', 'background-color'],
          templateOptions: {
            description: 'Data Used For DM Metrics Reporting, Cleared by CDMS Tracker',
            helpText: 'Full EDC Go-live date : enter/update Planned date , then enter Actual date.',
            helpTextPlacement: 'left'
          }
        }
      ],
      hideExpression: 'model.timeCdmsgoLiveActualDerivedFlag == true'
    },

    {
      fieldGroupClassName: 'row bg-light-blue',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >FPI </label>'
        },
        {
          className: 'col-1'
        },
        {
          className: 'col-4',

          key: 'timeFpiPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText:
              'Date First subject is screened: enter/update Planned date . Do not update Planned date once actual date is entered.',
            helpTextPlacement: 'left',
            required: true
          }
        },
        {
          className: 'col-4',
          key: 'timeFpiActual',
          type: 'date-picker',
          wrappers: ['help-text', 'background-color'],
          templateOptions: {
            description: 'Data Used For DM Metrics Reporting',
            helpText: 'Date First subject is screened : enter Actual date.',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-yellow',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >CPT in Production</label>'
        },
        {
          className: 'col-1',
          key: 'timeCptinProductionFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround - checkbox is alinged in the middle
        },
        {
          className: 'col-4',

          key: 'timeCptinProductionPlanned',
          type: 'date-picker',
          wrappers: ['help-text'], //workaround for displaying mandatory sign.

          templateOptions: {
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.timeCptinProductionFlag,
            'templateOptions.required': x => !x.timeCptinProductionFlag
          }
        },
        {
          className: 'col-4',
          key: 'timeCptinProductionActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText: 'CPT in Production Actual',
            helpTextPlacement: 'left'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.timeCptinProductionFlag
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row bg-light-yellow',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >SDTM Go-Live</label>'
        },
        {
          className: 'col-1',
          key: 'timeSdtmgoLiveFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround - checkbox is alinged in the middle
        },
        {
          className: 'col-4',
          key: 'timeSdtmgoLivePlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText:
              'Enter Planned date (SDTM Go-live is met when ALL SDTM datasets are programmed , tested and accepted by the sponsor (when applicable, otherwise by Stats). If SDTM are not provided by ICON , enter the Data transfer Go-live date',
            helpTextPlacement: 'left',
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.timeSdtmgoLiveFlag,
            'templateOptions.required': x => !x.timeSdtmgoLiveFlag
          }
        },
        {
          className: 'col-4',
          key: 'timeSdtmgoLiveActual',
          type: 'date-picker',
          wrappers: ['help-text', 'background-color'],
          templateOptions: {
            helpText:
              'Enter Actual date (SDTM Go-live is met when ALL SDTM datasets are programmed , tested and accepted by the sponsor (when applicable, otherwise by Stats). If SDTM are not provided by ICON , enter the Data transfer Go-live date',
            helpTextPlacement: 'left',
            description: 'Data Used For DM Metrics Reporting'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.timeSdtmgoLiveFlag
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row bg-light-yellow',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >LPI </label>'
        },
        {
          className: 'col-1'
        },
        {
          className: 'col-4',

          key: 'timeLpiPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText:
              'Date Last subject is screened : enter/update Planned date . Do not update planned date once actual date is entered.',
            helpTextPlacement: 'left',
            required: true
          }
        },
        {
          className: 'col-4',
          key: 'timeLpiActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText: 'Date Last subject is screened: enter Actual date.',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-yellow',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >LPO</label>'
        },
        {
          className: 'col-1'
        },
        {
          className: 'col-4',

          key: 'timeLpoPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText:
              'Date Last subject is completed (if study has several database locks, consider only main efficacy DBL): enter/update Planned date . Do not update Planned date once actual date is entered.',
            helpTextPlacement: 'left',
            required: true
          }
        },
        {
          className: 'col-4',
          key: 'timeLpoActual',
          type: 'date-picker',
          wrappers: ['help-text', 'background-color'],
          templateOptions: {
            description: 'Data Used For DM Metrics Reporting',
            helpText:
              'Date Last subject is completed (if study has several database locks, consider only main efficacy DBL) : enter Actual date .',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-yellow',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Last Data Entered</label>'
        },
        {
          className: 'col-1'
        },
        {
          className: 'col-4',

          key: 'timeLastDataEnteredPlanned',
          type: 'date-picker',
          wrappers: ['help-text'], //workaround for displaying mandatory *

          templateOptions: {
            required: true
          }
        },
        {
          className: 'col-4',
          key: 'timeLastDataEnteredActual',
          type: 'date-picker',
          wrappers: ['help-text'], //workaround -- with help-text wrapper the element is positioned in line
          templateOptions: {}
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-yellow',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Last External Data Received</label>'
        },
        {
          className: 'col-1',
          key: 'timeLastExternalDataReceivedFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround -- with help-text wrapper the element is positioned in line
        },
        {
          className: 'col-4',

          key: 'timeLastExternalDataReceivedPlanned',
          type: 'date-picker',
          wrappers: ['help-text'], //workaround for displaying mandatory *

          templateOptions: {
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.timeLastExternalDataReceivedFlag,
            'templateOptions.required': x => !x.timeLastExternalDataReceivedFlag
          }
        },
        {
          className: 'col-4',
          key: 'timeLastExternalDataReceivedActual',
          type: 'date-picker',
          wrappers: ['help-text'], //workaround -- with help-text wrapper the element is positioned in line
          expressionProperties: {
            'templateOptions.disabled': x => x.timeLastExternalDataReceivedFlag
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-yellow',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Main SoftLock </label>'
        },
        {
          className: 'col-1'
        },
        {
          className: 'col-4',

          key: 'timeMainSoftLockPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText:
              'Date main SoftLock (if study has several database locks, consider only main efficacy DBL) : enter/update Planned date . Do not update Planned date once actual date is entered.',
            helpTextPlacement: 'left',
            required: true
          }
        },
        {
          className: 'col-4',
          key: 'timeMainSoftLockActual',
          type: 'date-picker',
          wrappers: ['help-text', 'background-color'],
          templateOptions: {
            description: 'Data Used For DM Metrics Reporting',
            helpText:
              'Date main SoftLock (if study has several database locks, consider only main efficacy DBL) . If no softlock, enter actual date of DBL.',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-yellow',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Main DBL </label>'
        },
        {
          className: 'col-1'
        },
        {
          className: 'col-4',

          key: 'timeMainDblPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText:
              'Date main HardLock (if study has several database locks, consider only main efficacy DBL) : enter/update Planned date . Do not update Planned date once actual date is entered.',
            helpTextPlacement: 'left',
            required: true
          }
        },
        {
          className: 'col-4',
          key: 'timeMainDblActual',
          type: 'date-picker',

          wrappers: ['help-text', 'background-color'],
          templateOptions: {
            description: 'Data Used For DM Metrics Reporting',
            helpText:
              'Date main HardLock (if study has several database locks, consider only main efficacy DBL) : enter Actual date .',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-yellow ',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Follow UP LPO</label>'
        },
        {
          className: 'col-1',
          key: 'timeFollowUpLpoFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround - checkbox is alinged in the middle
        },
        {
          className: 'col-4',
          key: 'timeFollowUpLpoPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText:
              'Optional : Date Last subject is completed in Followup (if study has several database locks, consider the last DBL) : enter/update Planned date . Do not update Planned date once actual date is entered.',
            helpTextPlacement: 'left'
          },

          expressionProperties: {
            'templateOptions.disabled': x => x.timeFollowUpLpoFlag,
            'templateOptions.required': x => !x.timeFollowUpLpoFlag
          }
        },
        {
          className: 'col-4',
          key: 'timeFollowUpLpoActual',
          type: 'date-picker',

          wrappers: ['help-text', 'background-color'],
          templateOptions: {
            helpText:
              'Optional : Date Last subject is completed in Followup (if study has several database locks, consider the last DBL) : enter Actual date .',
            helpTextPlacement: 'left',
            description: 'Data Used For DM Metrics Reporting'
          },

          expressionProperties: {
            'templateOptions.disabled': x => x.timeFollowUpLpoFlag
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row bg-light-yellow',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Follow UP SoftLock</label>'
        },
        {
          className: 'col-1',
          key: 'timeFollowUpSoftLockFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround - checkbox is alinged in the middle
        },
        {
          className: 'col-4',
          key: 'timeFollowUpSoftLockPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText:
              'Optional : Date Followup SoftLock  (if study has several database locks, consider the last DBL) : enter/update Planned date . Do not update Planned date once actual date is entered.',
            helpTextPlacement: 'left'
          },

          expressionProperties: {
            'templateOptions.disabled': x => x.timeFollowUpSoftLockFlag,
            'templateOptions.required': x => !x.timeFollowUpSoftLockFlag
          }
        },
        {
          className: 'col-4',
          key: 'timeFollowUpSoftLockActual',
          type: 'date-picker',
          wrappers: ['help-text', 'background-color'],
          templateOptions: {
            helpText:
              'Optional : Date Followup SoftLock (if study has several database locks, consider the last DBL) : enter Actual date .',
            helpTextPlacement: 'left',
            description: 'Data Used For DM Metrics Reporting'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.timeFollowUpSoftLockFlag
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row bg-light-yellow',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Follow UP DBL</label>'
        },
        {
          className: 'col-1',
          key: 'timeFollowUpDblFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround - checkbox is alinged in the middle
        },
        {
          className: 'col-4',
          key: 'timeFollowUpDblPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            helpText:
              'Optional : Date last HardLock (if study has several database locks, consider the last DBL) : enter/update Planned date . Do not update Planned date once actual date is entered.',
            helpTextPlacement: 'left'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.timeFollowUpDblFlag
          }
        },
        {
          className: 'col-4',
          key: 'timeFollowUpDblActual',
          type: 'date-picker',

          wrappers: ['help-text', 'background-color'],
          templateOptions: {
            helpText:
              'Optional : Date last HardLock (if study has several database locks, consider the last DBL) : enter/update Planned date . Do not update Planned date once actual date is entered.',
            helpTextPlacement: 'left',
            description: 'Data Used For DM Metrics Reporting'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.timeFollowUpDblFlag
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row bg-light-yellow',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<label >Final TMF Archived</label>'
        },
        {
          className: 'col-1'
        },
        {
          className: 'col-4',

          key: 'timeFinalTmfarchivedPlanned',
          type: 'date-picker'
        },
        {
          className: 'col-4',
          key: 'timeFinalTmfarchivedActual',
          type: 'date-picker'
        }
      ]
    }
  ];

  submit() {
    if (this.form.valid) {
      this.saveStudyTimelines();
    }
  }

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
