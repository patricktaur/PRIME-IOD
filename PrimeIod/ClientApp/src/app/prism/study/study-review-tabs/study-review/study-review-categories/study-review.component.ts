import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
@Component({
  selector: 'app-study-review',
  templateUrl: './study-review.component.html',
  styleUrls: ['./study-review.component.css']
})
export class  StudyReviewComponent implements OnInit, OnDestroy {
  studyId: number = 0;
  review: any;
  study: any;
  // currentdate:any;

  protocolPhaseParId = 300;
  protocolComplexityParId = 400;
  rescueStudyParId = 600;
  yesNoParId = 600;
  tmfParID = 3800;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  hasDMManagerRole: boolean = false;

  constructor(
    public router: Router,
    private studyEditService: StudyEditService,
    private studyService: StudyReviewService,
    private tblParamService: TblParamService,
    private credService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;
        this.loadStudyReview(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }
   
  loadStudyReview(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyService.getStudyReview(studyId).subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`)
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.review = res;
          this.setUserRoles(this.review);
          this.form.reset();
          this.loading = false;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // console.log("here");
        this.loading = false;
      }
    );
  }
  submit() {
    if (this.form.valid) {
      // this.review.updatedOn=new Date();
      this.saveStudyReview();
    }
  }
  saveStudyReview() {
    this.loading = true;
    this.saveSubscription = this.studyService.saveStudyReview(this.studyId, this.review).subscribe(
      res => {
        this.review = res;
        this.setUserRoles(this.review);
        this.form.reset();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
    //this.loadStudyReview(this.studyId);
    //window.location.reload();
  }

  setUserRoles(model: any): any {
    model.userIsDMPM = this.credService.userHasPermission('role.admin');
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in Study Review.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions | any = {};
  //timeCdmsgoLiveActual
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row bg-green text-center',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<label >Project Status Categories</label>'
        },
        {
          className: 'col-1',
          template: '<label >N/A</label>'
        },
        {
          className: 'col-2',
          template: '<label >Project Category Score</label>'
        },
        {
          className: 'col-3',
          template: '<label >Comment</label>'
        },
        {
          className: 'col-3',
          template: '<label >Action</label>'
        }
      ]
    },

    {
      fieldGroupClassName: 'row bg-grey',
      fieldGroup: [
        {
          className: 'col-3 d-flex align-items-center',
          template: '<label >DM Tool Kit Setup </label>',
          expressionProperties: {}
        },
        {
          className: 'col-1',
          key: 'dmtoolKitSetupFlag',
          type: 'checkbox',
          wrappers: ['help-text'],
          expressionProperties: {
            'templateOptions.disabled': x => !x.timeCdmsgoLiveActual
          }
        },

        {
          className: 'col-2 form-group',
          key: 'dmtoolKitSetupScore',
          type: 'custom-select',
          wrappers: ['help-text'], //workaround for displaying mandatory *
          templateOptions: {
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.dmtoolKitSetupFlag || !x.timeCdmsgoLiveActual,
            'templateOptions.required': x => !x.dmtoolKitSetupFlag,
            'templateOptions.description': x => (!x.timeCdmsgoLiveActual ? 'Timelines - CDMS ' : '')
          }
        },
        {
          className: 'col-3 ',

          key: 'dmtoolKitSetupComment',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory *
          templateOptions: {
            maxLength: 255,

            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.dmtoolKitSetupFlag || !x.timeCdmsgoLiveActual,
            'templateOptions.required': x => !x.dmtoolKitSetupFlag && x.dataCleaningScore < 5,
            'templateOptions.description': x =>
              !x.timeCdmsgoLiveActual ? 'Golive Actual Date is not updated' : '255 characters max.'
          }
        },
        {
          className: 'col-3',
          key: 'dmtoolKitSetupAction',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.',
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.dmtoolKitSetupFlag || !x.timeCdmsgoLiveActual,
            'templateOptions.required': x => !x.dmtoolKitSetupFlag && x.dataCleaningScore < 5
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row bg-grey',
      fieldGroup: [
        {
          className: 'col-3 d-flex align-items-center',
          template: '<label >DM TMF Inventory Log Build and Review</label>',
          expressionProperties: {}
        },
        {
          className: 'col-1',
          key: 'dmtmfinventoryLogFlag',
          type: 'checkbox',
          wrappers: ['help-text'],
          expressionProperties: {
            'templateOptions.disabled': x => !x.timeCdmsgoLiveActual
          }
        },

        {
          className: 'col-2 form-group',
          key: 'dmtmfinventoryLogScore',
          type: 'custom-select',
          wrappers: ['help-text'], //workaround for displaying mandatory *
          templateOptions: {
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.dmtmfinventoryLogFlag || !x.timeCdmsgoLiveActual,
            'templateOptions.required': x => !x.dmtmfinventoryLogFlag,
            'templateOptions.description': x => (!x.timeCdmsgoLiveActual ? 'Timelines - CDMS ' : '')
          }
        },
        {
          className: 'col-3 ',

          key: 'dmtmfinventoryLogComment',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory *
          templateOptions: {
            maxLength: 255,

            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.dmtmfinventoryLogFlag || !x.timeCdmsgoLiveActual,
            'templateOptions.required': x => !x.dmtmfinventoryLogFlag && x.dmtmfinventoryLogScore < 5,
            'templateOptions.description': x =>
              !x.timeCdmsgoLiveActual ? 'Golive Actual Date is not updated' : '255 characters max.'
          }
        },
        {
          className: 'col-3',
          key: 'dmtmfinventoryLogAction',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.',
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.dmtmfinventoryLogFlag || !x.timeCdmsgoLiveActual,
            'templateOptions.required': x => !x.dmtmfinventoryLogFlag && x.dmtmfinventoryLogScore < 5
          }
        }
      ]
    },


    {
      fieldGroupClassName: 'row bg-grey',
      fieldGroup: [
        {
          className: 'col-3 d-flex align-items-center',
          template: '<label >Data Cleaning/Clean Patient Progress </label>',
          expressionProperties: {}
        },
        {
          className: 'col-1',
          key: 'dataCleaningFlag',
          type: 'checkbox',
          wrappers: ['help-text'],
          expressionProperties: {
            'templateOptions.disabled': x => !x.timeCdmsgoLiveActual
          }
        },

        {
          className: 'col-2 form-group',
          key: 'dataCleaningScore',
          type: 'custom-select',
          wrappers: ['help-text'], //workaround for displaying mandatory *
          templateOptions: {
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.dataCleaningFlag || !x.timeCdmsgoLiveActual,
            'templateOptions.required': x => !x.dataCleaningFlag,
            'templateOptions.description': x => (!x.timeCdmsgoLiveActual ? 'Timelines - CDMS ' : '')
          }
        },
        {
          className: 'col-3 ',

          key: 'dataCleaningComment',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory *
          templateOptions: {
            maxLength: 255,

            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.dataCleaningFlag || !x.timeCdmsgoLiveActual,
            'templateOptions.required': x => !x.dataCleaningFlag && x.dataCleaningScore < 5,
            'templateOptions.description': x =>
              !x.timeCdmsgoLiveActual ? 'Golive Actual Date is not updated' : '255 characters max.'
          }
        },
        {
          className: 'col-3',
          key: 'dataCleaningAction',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.',
            required: true
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.dataCleaningFlag || !x.timeCdmsgoLiveActual,
            'templateOptions.required': x => !x.dataCleaningFlag && x.dataCleaningScore < 5
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >External Data Reconciliation </label>'
        },
        {
          className: 'col-1',
          key: 'externalDataReconciliationFlag',
          type: 'checkbox',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          expressionProperties: {
            'templateOptions.disabled': x => !x.timeCdmsgoLiveActual
          }
        },
        {
          className: 'col-2  form-group',
          key: 'externalDataReconciliationScore',
          type: 'custom-select',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            required: true
          },

          expressionProperties: {
            'templateOptions.disabled': x => x.externalDataReconciliationFlag || !x.timeCdmsgoLiveActual,
            'templateOptions.required': x => !x.externalDataReconciliationFlag,
            'templateOptions.description': x => (!x.timeCdmsgoLiveActual ? 'Timelines - CDMS ' : '')
          }
        },

        {
          className: 'col-3',

          key: 'externalDataReconciliationComment',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.externalDataReconciliationFlag || !x.timeCdmsgoLiveActual,
            'templateOptions.required': x => !x.externalDataReconciliationFlag && x.externalDataReconciliationScore < 5,
            'templateOptions.description': x =>
              !x.timeCdmsgoLiveActual ? 'Golive Actual Date is not updated' : '255 characters max.'
          }
        },
        {
          className: 'col-3',
          key: 'externalDataReconciliationAction',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.externalDataReconciliationFlag || !x.timeCdmsgoLiveActual,
            'templateOptions.required': x => !x.externalDataReconciliationFlag && x.externalDataReconciliationScore < 5
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row  bg-grey',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Quality Assessment </label>'
        },
        {
          className: 'col-1',
          key: 'qualityAssessmentFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround for displaying mandatory / vertical alingment *
        },
        {
          className: 'col-2 form-group',
          type: 'custom-select',
          key: 'qualityAssessmentScore',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            required: true
          },

          // expressionProperties: {
          //   'templateOptions.disabled': x => x.externalDataReconciliationFlag || !x.timeCdmsgoLiveActual,
          //   'templateOptions.required': x => !x.externalDataReconciliationFlag
          // },

          expressionProperties: {
            'templateOptions.disabled': x => x.qualityAssessmentFlag,
            'templateOptions.required': x => !x.qualityAssessmentFlag
          }
        },
        {
          className: 'col-3',

          key: 'qualityAssessmentComment',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.qualityAssessmentFlag,
            'templateOptions.required': x => !x.qualityAssessmentFlag && x.qualityAssessmentScore < 5
          }
        },
        {
          className: 'col-3',
          key: 'qualityAssessmentAction',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.qualityAssessmentFlag,
            'templateOptions.required': x => !x.qualityAssessmentFlag && x.qualityAssessmentScore < 5
          }
        }
      ]
    },
    // EDC User Acess review renamed to Periodic quality checks
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Periodic Quality Checks</label>'
        },
        {
          className: 'col-1',
          key: 'edcuserAccessReviewFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround for displaying mandatory / vertical alingment *
        },
        {
          className: 'col-2 form-group',
          type: 'custom-select',
          key: 'edcuserAccessReviewScore',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            required: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': x => x.externalDataReconciliationFlag || !x.timeCdmsgoLiveActual,
          //   'templateOptions.required': x => !x.externalDataReconciliationFlag
          // },
          expressionProperties: {
            'templateOptions.disabled': x => x.edcuserAccessReviewFlag,
            'templateOptions.required': x => !x.edcuserAccessReviewFlag
          }
        },
        {
          className: 'col-3',

          key: 'edcuserAccessReviewComment',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.edcuserAccessReviewFlag,
            'templateOptions.required': x => !x.edcuserAccessReviewFlag && x.edcuserAccessReviewScore < 5
          }
        },
        {
          className: 'col-3',
          key: 'edcuserAccessReviewAction',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.edcuserAccessReviewFlag,
            'templateOptions.required': x => !x.edcuserAccessReviewFlag && x.edcuserAccessReviewScore < 5
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Next Milestone Deliverable </label>'
        },
        {
          className: 'col-1',
          key: 'nextMilestoneDeliverableFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround for displaying mandatory / vertical alingment *
        },
        {
          className: 'col-2 form-group',
          type: 'custom-select',
          key: 'nextMilestoneDeliverableScore',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            required: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': x => x.externalDataReconciliationFlag || !x.timeCdmsgoLiveActual,
          //   'templateOptions.required': x => !x.externalDataReconciliationFlag
          // },
          expressionProperties: {
            'templateOptions.disabled': x => x.nextMilestoneDeliverableFlag,
            'templateOptions.required': x => !x.nextMilestoneDeliverableFlag
          }
        },
        {
          className: 'col-3',

          key: 'nextMilestoneDeliverableComment',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.nextMilestoneDeliverableFlag,
            'templateOptions.required': x => !x.nextMilestoneDeliverableFlag && x.nextMilestoneDeliverableScore < 5
          }
        },
        {
          className: 'col-3',
          key: 'nextMilestoneDeliverableAction',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.nextMilestoneDeliverableFlag,
            'templateOptions.required': x => !x.nextMilestoneDeliverableFlag && x.nextMilestoneDeliverableScore < 5
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row  bg-grey',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Resourcing  </label>'
        },
        {
          className: 'col-1',
          key: 'resourcingFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround for displaying mandatory / vertical alingment *
        },
        {
          className: 'col-2 form-group',
          type: 'custom-select',
          key: 'resourcingScore',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            required: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': x => x.externalDataReconciliationFlag || !x.timeCdmsgoLiveActual,
          //   'templateOptions.required': x => !x.externalDataReconciliationFlag
          // },
          expressionProperties: {
            'templateOptions.disabled': x => x.resourcingFlag,
            'templateOptions.required': x => !x.resourcingFlag
          }
        },
        {
          className: 'col-3',

          key: 'resourcingComment',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.resourcingFlag,
            'templateOptions.required': x => !x.resourcingFlag && x.resourcingScore < 5
          }
        },
        {
          className: 'col-3',
          key: 'resourcingAction',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.resourcingFlag,
            'templateOptions.required': x => !x.resourcingFlag && x.resourcingScore < 5
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Project Financial Health  </label>'
        },
        {
          className: 'col-1',
          key: 'projectFinancialHealthFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround for displaying mandatory / vertical alingment *
        },
        {
          className: 'col-2 form-group',
          type: 'custom-select',
          key: 'projectFinancialHealthScore',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            required: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': x => x.externalDataReconciliationFlag || !x.timeCdmsgoLiveActual,
          //   'templateOptions.required': x => !x.externalDataReconciliationFlag
          // },
          expressionProperties: {
            'templateOptions.disabled': x => x.projectFinancialHealthFlag,
            'templateOptions.required': x => !x.projectFinancialHealthFlag
          }
        },
        {
          className: 'col-3',

          key: 'projectFinancialHealthComment',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.projectFinancialHealthFlag,
            'templateOptions.required': x => !x.projectFinancialHealthFlag && x.projectFinancialHealthScore < 5
          }
        },
        {
          className: 'col-3',
          key: 'projectFinancialHealthAction',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.projectFinancialHealthFlag,
            'templateOptions.required': x => !x.projectFinancialHealthFlag && x.projectFinancialHealthScore < 5
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row  bg-grey',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >TMF status </label>'
        },
        {
          className: 'col-1',
          key: 'tmfstatusFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround for displaying mandatory / vertical alingment *
        },
        {
          className: 'col-2 form-group',
          type: 'custom-select',
          key: 'tmfstatusScore',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *

          templateOptions: {
            required: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': x => x.externalDataReconciliationFlag || !x.timeCdmsgoLiveActual,
          //   'templateOptions.required': x => !x.externalDataReconciliationFlag
          // },
          expressionProperties: {
            'templateOptions.disabled': x => x.tmfstatusFlag,
            'templateOptions.required': x => !x.tmfstatusFlag
          }
        },
        {
          className: 'col-3',

          key: 'tmfstatusComment',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.tmfstatusFlag,
            'templateOptions.required': x => !x.tmfstatusFlag && x.tmfstatusScore < 5
          }
        },
        {
          className: 'col-3',
          key: 'tmfstatusAction',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.tmfstatusFlag,
            'templateOptions.required': x => !x.tmfstatusFlag && x.tmfstatusScore < 5
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row  bg-grey',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Other ICON Department </label>'
        },
        {
          className: 'col-1',
          key: 'otherIcondeptFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround for displaying mandatory / vertical alingment *
        },
        {
          className: 'col-2 form-group',
          type: 'custom-select',
          key: 'otherIcondeptScore',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            required: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': x => x.externalDataReconciliationFlag || !x.timeCdmsgoLiveActual,
          //   'templateOptions.required': x => !x.externalDataReconciliationFlag
          // },
          expressionProperties: {
            'templateOptions.disabled': x => x.otherIcondeptFlag,
            'templateOptions.required': x => !x.otherIcondeptFlag
          }
        },
        {
          className: 'col-3',

          key: 'otherIcondeptComment',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.otherIcondeptFlag,
            'templateOptions.required': x => !x.otherIcondeptFlag && x.otherIcondeptScore < 5
          }
        },
        {
          className: 'col-3',
          key: 'otherIcondeptAction',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.otherIcondeptFlag,
            'templateOptions.required': x => !x.otherIcondeptFlag && x.otherIcondeptScore < 5
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label >Sponsor Relationship </label>'
        },
        {
          className: 'col-1',
          key: 'sponsorRelationshipFlag',
          type: 'checkbox',
          wrappers: ['help-text'] //workaround for displaying mandatory / vertical alingment *
        },
        {
          className: 'col-2 form-group',
          type: 'custom-select',
          key: 'sponsorRelationshipScore',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            required: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': x => x.externalDataReconciliationFlag || !x.timeCdmsgoLiveActual,
          //   'templateOptions.required': x => !x.externalDataReconciliationFlag
          // },
          expressionProperties: {
            'templateOptions.disabled': x => x.sponsorRelationshipFlag,
            'templateOptions.required': x => !x.sponsorRelationshipFlag
          }
        },
        {
          className: 'col-3',

          key: 'sponsorRelationshipComment',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.sponsorRelationshipFlag,
            'templateOptions.required': x => !x.sponsorRelationshipFlag && x.sponsorRelationshipScore < 5
          }
        },
        {
          className: 'col-3',
          key: 'sponsorRelationshipAction',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.sponsorRelationshipFlag,
            'templateOptions.required': x => !x.sponsorRelationshipFlag && x.sponsorRelationshipScore < 5
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row  bg-grey',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<br><label > DMPM Oversight </label>'
        },
        {
          className: 'col-1',
          key: 'dmpmoversightFlag',
          type: 'checkbox',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *

          expressionProperties: {
            'templateOptions.disabled': x => !x.userIsDMPM
          }
        },
        {
          className: 'col-2 form-group',
          type: 'custom-select',
          key: 'dmpmoversightScore',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *

          templateOptions: {
            required: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': x => x.externalDataReconciliationFlag || !x.timeCdmsgoLiveActual,
          //   'templateOptions.required': x => !x.externalDataReconciliationFlag
          // },
          expressionProperties: {
            'templateOptions.disabled': x => x.dmpmoversightFlag || !x.userIsDMPM,
            'templateOptions.required': x => !x.dmpmoversightFlag && x.userIsDMPM
          }
        },
        {
          className: 'col-3',

          key: 'dmpmoversightComment',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.dmpmoversightFlag || !x.userIsDMPM,
            'templateOptions.required': x => !x.dmpmoversightFlag && x.dmpmoversightScore < 5
          }
        },
        {
          className: 'col-3',
          key: 'dmpmoversightAction',
          type: 'textarea',
          wrappers: ['help-text'], //workaround for displaying mandatory / vertical alingment *
          templateOptions: {
            maxLength: 255,
            description: '255 characters max.'
          },
          expressionProperties: {
            'templateOptions.disabled': x => x.dmpmoversightFlag || !x.userIsDMPM,
            'templateOptions.required': x => !x.dmpmoversightFlag && x.dmpmoversightScore < 5
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
