import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

// import { StudyReviewService } from '../../../study-review.service';
import { ImiStudyReviewService } from '@app/prism/study/imi-tabs/imi-study-review.service';

@Component({
  selector: 'app-imi-study-timelines',
  templateUrl: './imi-study-timelines.component.html',
  styleUrls: ['./imi-study-timelines.component.css']
})
export class ImiStudyTimelinesComponent implements OnInit, OnDestroy {
  yesNoParId = 600;
  study: any;
  studyTimeLineForm: FormGroup | any;
  studyTimelines: any;

  yesNoItems: any = null;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;

  constructor(
    public router: Router,

    private studyEditService: StudyEditService,
    private studyReviewService: ImiStudyReviewService
  ) {}

  ngOnInit(): void {
    // this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.study = st;
    //   if (this.study > 0) {
    //     this.loadStudyTimelines(this.study);
    //   }
    // });
    this.studyEditService.setDashboard('imi');
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      // if (st?.studyType?.startsWith('IMI')) {
      //   this.study = st.studyId;

      //   this.loadStudyTimelines(st.studyId);
      // }

      // if (st?.studyType?.startsWith('DM')) {
      //   this.router.navigate(['/study/review']);
      // }
      if (st?.studyType == 'IMI' || st?.studyType == 'DM+IMI') {
        this.study = st.studyId;

        this.loadStudyTimelines(st.studyId);
      }

      // if (st?.studyType == 'DM') {
      //   this.router.navigate(['/study/review']);
      // }
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
        this.studyTimelines = res;
        this.form.reset();
        this.studyEditService.loadStudyProperties();
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

  submit() {
    if (this.form.valid) {
      this.saveStudyTimelines();
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
          className: 'col-4',
          template: '<label >Milestone Tasks</label>'
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
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Award Notification</label>'
        },

        {
          className: 'col-4',

          key: 'awardNotificationPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'awardNotificationActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Communication Plan complete</label>'
        },

        {
          className: 'col-4',

          key: 'communicationPlanPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'communicationPlanActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Contract execution date</label>'
        },

        {
          className: 'col-4',

          key: 'contractexecutionPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'contractexecutionActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Data Delivery Specification (DDS)-Inbound compplete</label>'
        },

        {
          className: 'col-4',

          key: 'dataDeliverySpecificationInboundPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'dataDeliverySpecificationInboundActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Data Delivery Specification (DDS)-Outbound compplete</label>'
        },

        {
          className: 'col-4',

          key: 'dataDeliverySpecificationOutboundPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'dataDeliverySpecificationOutboundActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Database Lock</label>'
        },

        {
          className: 'col-4',

          key: 'databaseLockPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'databaseLockActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >EDC Installation complete</label>'
        },

        {
          className: 'col-4',

          key: 'edcinstallationPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'edcinstallationActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Final Protocol with signatures</label>'
        },

        {
          className: 'col-4',

          key: 'finalProtocolsignaturesPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'finalProtocolsignaturesActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Final Read Delivery</label>'
        },

        {
          className: 'col-4',

          key: 'finalReadDeliveryPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'finalReadDeliveryActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >First Patient in (Screened/Enrolled/Randomized)</label>'
        },

        {
          className: 'col-4',

          key: 'firstPatientInPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'firstPatientInActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Image Upload Configuration complete</label>'
        },

        {
          className: 'col-4',

          key: 'imageUploadConfigurationPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'imageUploadConfigurationActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Imaging Manual complete</label>'
        },

        {
          className: 'col-4',

          key: 'imagingManualcompletePlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'imagingManualcompleteActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >IMI Involvement Begins</label>'
        },

        {
          className: 'col-4',

          key: 'imiinvolvementbeginsPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'imiinvolvementbeginsActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >IMI Involvement Ends</label>'
        },

        {
          className: 'col-4',

          key: 'imiinvolvementendsPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'imiinvolvementendsActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Independent Review Charter complete</label>'
        },

        {
          className: 'col-4',

          key: 'independentReviewCharterPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'independentReviewCharterActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Independent Review Training Manual (IRTM) complete</label>'
        },

        {
          className: 'col-4',

          key: 'independentReviewTrainingManualPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'independentReviewTrainingManualActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >IPOP complete</label>'
        },

        {
          className: 'col-4',

          key: 'ipopcompletePlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'ipopcompleteActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Last Patient In (Screened/Enrolled/Randomized)</label>'
        },

        {
          className: 'col-4',

          key: 'lastPatientInPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'lastPatientInActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Last Patient Out / Last Patient Last Visit</label>'
        },

        {
          className: 'col-4',

          key: 'lastPatientOutPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'lastPatientOutActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >MSA Checks Specifications complete</label>'
        },

        {
          className: 'col-4',

          key: 'msachecksSpecificationsPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'msachecksSpecificationsActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Programming Start Date</label>'
        },

        {
          className: 'col-4',

          key: 'programmingStartPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'programmingStartActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >QA Approval Date</label>'
        },

        {
          className: 'col-4',

          key: 'qaapprovalPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'qaapprovalActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Reader Performance Set-up complete</label>'
        },

        {
          className: 'col-4',

          key: 'readerPerformanceSetupPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'readerPerformanceSetupActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Sponsor Approval of EDC</label>'
        },

        {
          className: 'col-4',

          key: 'sponsorApprovalPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'sponsorApprovalActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Systems Requirement Specification (SRS) complete</label>'
        },

        {
          className: 'col-4',

          key: 'systemsRequirementSpecificationPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'systemsRequirementSpecificationActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >UAT / Testing Handover Date</label>'
        },

        {
          className: 'col-4',

          key: 'uatTestingHandoverPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'uatTestingHandoverActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >UAT Approval</label>'
        },

        {
          className: 'col-4',

          key: 'uatapprovalPlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'uatapprovalActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-light-blue align-items-center',
      fieldGroup: [
        {
          className: 'col-4 ',
          template: '<label >Validation complete</label>'
        },

        {
          className: 'col-4',

          key: 'validationcompletePlanned',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'XXX',
            helpTextPlacement: 'left'
            // required: true
          }
        },
        {
          className: 'col-4',
          key: 'validationcompleteActual',
          type: 'date-picker',
          wrappers: ['help-text'],
          templateOptions: {
            // helpText: 'YYYY',
            helpTextPlacement: 'left'
          }
        }
      ]
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
