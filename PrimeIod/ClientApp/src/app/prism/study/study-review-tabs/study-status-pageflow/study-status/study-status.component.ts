import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-study-status',
  templateUrl: './study-status.component.html',
  styleUrls: ['./study-status.component.css']
})
export class StudyStatusComponent implements OnInit, OnDestroy {
  studyId: number = 0;
  studystatus: any;
  studystatusPId: any = 100;
  onHoldPId: any = 500;
  cancelledPId: any = 7900;
  testData: any;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;

  hasDMManagerRole: boolean = false;

  constructor(
    public router: Router,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService,
    private tblParamService: TblParamService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.studyId = st;
    //   if (this.studyId > 0) {
    //     this.loadStudyStatus(this.studyId);
    //     // this.testLoading(this.studyId);
    //   }
    // });

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadStudyStatus(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }
  
  loadStudyStatus(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyStatusDTO(studyId).subscribe(
      (res: any) => {
        console.log(`study status = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studystatus = res;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  saveStudyStatus() {
    this.loading = true;
    this.saveSubscription = this.studyReviewService.saveStudyStatus(this.studyId, this.studystatus).subscribe(
      res => {
        this.studystatus = res;
        this.form.reset();
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
      let message = "There are unsaved changes in Study Status.  Click 'Ok' to continue without saving. ";
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
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'study-status-form',
      fieldGroup: [
        //---

        {
          key: 'studyStatusPid',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Study Status',
            helpText: 'Study Status',
            options: this.tblParamService.getParams(this.studystatusPId),
            valueProp: 'recId',
            labelProp: 'description',
            labelColClassName: 'col-5',
            fieldColClassName: 'col-6'
          },
          validation: {
            show: true
          }
        },

        {
          key: 'revisedRandomisedSubjectsExpected',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Total Expected Randomized Subject',
            type: 'number',
            required: true,
            helpText:
              'Update number of randomised subjects planned if different than in the initial protocol/contract ; if no randomisation, enter number of planned enrolled',

            labelColClassName: 'col-5',
            fieldColClassName: 'col-6'
          },
          validation: {
            show: true
          }
        },

        {
          key: 'actualRandomisedSubjects',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Actual Expected Randomized Subject',
            type: 'number',
            required: true,
            helpText:
              'Update number of randomised subjects in the study as of now; if no randomisation, enter number of enrolled subjects as of now.',

            labelColClassName: 'col-5',
            fieldColClassName: 'col-3'
          },
          validation: {
            show: true
          }
        },
        {
          key: 'totalExpectedScreenFailureSubjects',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Total Expected Screen Failure Subjects',
            type: 'number',

            helpText:
              'Update number of randomised subjects in the study as of now; if no randomisation, enter number of enrolled subjects as of now.',

            labelColClassName: 'col-5',
            fieldColClassName: 'col-3'
          }
        },

        {
          key: 'actualScreenFailureSubjects',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Actual Screen Failure Subjects',
            type: 'number',
            labelColClassName: 'col-5',
            fieldColClassName: 'col-3'
          }
        },
        {
          key: 'actualTerminatedRandomizedSubjects',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Actual Terminated Randomized Subject',
            type: 'number',
            labelColClassName: 'col-5',
            fieldColClassName: 'col-3'
          }
        },
        {
          key: 'totalPagesExpected',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Total Pages Expected',
            type: 'number',
            labelColClassName: 'col-5',
            fieldColClassName: 'col-3'
          }
        },
        {
          key: 'actualPagesProcessed',
          type: 'input',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Actual Pages Processed',
            type: 'number',
            labelColClassName: 'col-5',
            fieldColClassName: 'col-3'
          }
        },
        {
          key: 'studyOnHoldPid',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Study On-Hold',
            helpText: 'if study is temporarily on-hold, enter Y , otherwise enter N',

            options: this.tblParamService.getParams(this.onHoldPId),
            valueProp: 'recId',
            labelProp: 'description',
            labelColClassName: 'col-5',
            fieldColClassName: 'col-6'
          },
          validation: {
            show: true
          }
        },
        {
          key: 'dateStudyOnHold',
          type: 'date-picker',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Date Study On-Hold',
            helpText: 'Date Study On-Hold',
            helpTextPlacement: 'left',
            labelColClassName: 'col-5',
            fieldColClassName: 'col-4'
          }
        },
        {
          key: 'studyCancelledPid',
          type: 'ng-select',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Study Cancelled',
            helpText: 'Study Cancelled',

            options: this.tblParamService.getParams(this.cancelledPId),
            valueProp: 'recId',
            labelProp: 'description',
            labelColClassName: 'col-5',
            fieldColClassName: 'col-6'
          },
          validation: {
            show: true
          }
        },
        {
          key: 'dateStudyStopped',
          type: 'date-picker',
          wrappers: ['horizontal-layout'],
          templateOptions: {
            label: 'Date Study Cancelled',
            helpText: 'Date Study Stopped',
            helpTextPlacement: 'left',
            labelColClassName: 'col-5',
            fieldColClassName: 'col-4'
          }
        },
        //---
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-5',
              key: 'dPagesStillToProcess',
              type: 'label',
              templateOptions: {
                label: 'Pages still to Process'
              }
            },
            {
              className: 'col-6',
              key: 'dAdjustedAvgPagesPerMonth',
              type: 'label',
              templateOptions: {
                label: 'Adjusted avg Pages Per Month'
              }
            }
          ]
        }
      ]
    }
  ];
  submit() {
    if (this.form.valid) {
      this.saveStudyStatus();
    }
  }

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
