import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

@Component({
  selector: 'app-study-status-alt',
  templateUrl: './study-status-alt.component.html',
  styleUrls: ['./study-status-alt.component.css']
})
export class StudyStatusAltComponent implements OnInit, OnDestroy {
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

  constructor(
    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService,
    private tblParamService: TblParamService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      if (this.studyId > 0) {
        this.loadStudyStatus(this.studyId);
        // this.testLoading(this.studyId);
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
      key: 'studyStatusPid',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Study Status',
        options: this.tblParamService.getParams(this.studystatusPId),

        valueProp: 'recId',
        labelProp: 'description',
        placeholder: '-Select-',
        // type: 'email',

        required: true,
        hideRequiredMarker: true,
        labelColClassName: 'col-sm-5 ',
        fieldColClassName: 'col-sm-3'
      }
    },
    // wrappers: ['help-text'],
    // templateOptions: {
    //   // label:'Study Status',
    //   options: this.tblParamService.getParams(this.studystatusPId),
    //   placeholder: '-Select-',
    //   valueProp: 'recId',
    //   labelProp: 'description',
    //   helpText: 'Study Status'
    {
      key: 'revisedRandomisedSubjectsExpected',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Total Expected Randomized Subject',
        type: 'number',
        required: true,
        helpText: 'Helper HelpeHelper Helper Helper Helper Helper Helper r Helper Helper ',
        labelColClassName: 'col-sm-5',
        fieldColClassName: 'col-sm-5'
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
        labelColClassName: 'col-sm-5',
        fieldColClassName: 'col-sm-2'
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
        required: true,
        labelColClassName: 'col-sm-5',
        fieldColClassName: 'col-sm-2'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'actualScreenFailureSubjects',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Actual Expected Screen Failure Subjects',
        type: 'number',
        required: true,
        labelColClassName: 'col-sm-5',
        fieldColClassName: 'col-sm-2'
      },
      validation: {
        show: true
      }
    },
    {
      // fieldGroupClassName: 'study-status-form form-inline',
      fieldGroup: [
        {
          // fieldGroupClassName: 'row study-status-form',
          fieldGroupClassName: 'row ',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Study Status</label>'
            },
            {
              className: 'col-6 ',

              key: 'studyStatusPid',
              type: 'select',
              wrappers: ['help-text'],
              templateOptions: {
                // label:'Study Status',
                options: this.tblParamService.getParams(this.studystatusPId),
                placeholder: '-Select-',
                valueProp: 'recId',
                labelProp: 'description',
                helpText: 'Study Status'
              }
            }
          ]
        },

        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Total Expected Randomized Subject *</label>'
            },
            {
              className: 'col-6',
              key: 'revisedRandomisedSubjectsExpected',
              type: 'input',
              wrappers: ['help-text'],
              templateOptions: {
                // label : 'Total Expected Randomized Subject ',
                required: true,
                hideRequiredMarker: true,
                type: 'number',
                helpText:
                  'Update number of randomised subjects planned if different than in the initial protocol/contract ; if no randomisation, enter number of planned enrolled.XX'
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Actual Expected Randomized Subject *</label>'
            },
            {
              className: 'col-6',
              key: 'actualRandomisedSubjects',
              type: 'input',
              wrappers: ['help-text'],
              templateOptions: {
                type: 'number',
                required: true,
                hideRequiredMarker: true,
                helpText:
                  'Update number of randomised subjects in the study as of now; if no randomisation, enter number of enrolled subjects as of now.'
              }
            }
          ]
        },

        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Total Expected Screen Failure Subjects</label>'
            },
            {
              className: 'col-6',
              key: 'totalExpectedScreenFailureSubjects',
              type: 'input',
              wrappers: ['help-text'],
              templateOptions: {
                type: 'number'
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Actual Expected Screen Failure Subjects</label>'
            },
            {
              className: 'col-6',
              key: 'actualScreenFailureSubjects',
              type: 'input',
              wrappers: ['help-text'],
              templateOptions: {
                type: 'number'
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Actual Terminated Randomized Subject</label>'
            },
            {
              className: 'col-6',
              key: 'actualTerminatedRandomizedSubjects',
              type: 'input',
              wrappers: ['help-text'],
              templateOptions: {
                type: 'number'
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Total Pages Expected</label>'
            },
            {
              className: 'col-6',
              key: 'totalPagesExpected',
              type: 'input',
              wrappers: ['help-text'],
              templateOptions: {
                type: 'number'
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Actual Pages Processed *</label>'
            },
            {
              className: 'col-6',
              key: 'actualPagesProcessed',
              type: 'label',
              wrappers: ['help-text'],
              templateOptions: {
                hideLabel: true,
                type: 'number',
                required: true,
                hideRequiredMarker: true
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Study On-Hold</label>'
            },
            {
              className: 'col-6',
              key: 'studyOnHoldPid',
              type: 'select',
              wrappers: ['help-text'],
              templateOptions: {
                options: this.tblParamService.getParams(this.onHoldPId),
                placeholder: '-Select-',
                valueProp: 'recId',
                labelProp: 'description',
                helpText: 'if study is temporarily on-hold, enter Y , otherwise enter N'
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Date Study On-Hold</label>'
            },
            {
              className: 'col-6',
              key: 'dateStudyOnHold',
              type: 'date-picker',
              wrappers: ['help-text'],
              templateOptions: {
                helpText: 'Date Study On-Hold',
                helpTextPlacement: 'left'
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Study Cancelled</label>'
            },
            {
              className: 'col-6',
              key: 'studyCancelledPid',
              type: 'select',
              wrappers: ['help-text'],
              templateOptions: {
                options: this.tblParamService.getParams(7900),
                placeholder: '-Select-',
                valueProp: 'recId',
                labelProp: 'description',
                helpText: 'Study Cancelled'
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Date Study Cancelled</label>'
            },
            {
              className: 'col-6',
              key: 'dateStudyStopped',
              type: 'date-picker',
              wrappers: ['help-text'],
              templateOptions: {
                helpText: 'Date Study Stopped',
                helpTextPlacement: 'left'
              }
            }
          ]
        },

        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Pages still to Process</label>'
            },
            {
              className: 'col-6',
              key: 'dPagesStillToProcess',
              type: 'label',
              wrappers: ['help-text'],
              templateOptions: {
                hideLabel: true,
                type: 'number'
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6 study-status-form',
              template: '<br><label >Adjusted avg Pages Per Month</label>'
            },
            {
              className: 'col-6',
              key: 'dAdjustedAvgPagesPerMonth',
              type: 'label',
              wrappers: ['help-text'],
              templateOptions: {
                hideLabel: true,
                type: 'number'
              }
            }
          ]
        }
      ]
    }

    //---
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
