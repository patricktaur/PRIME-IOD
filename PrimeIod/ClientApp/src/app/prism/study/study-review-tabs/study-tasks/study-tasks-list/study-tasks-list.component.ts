import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { StudyReviewService } from '../../../study-review.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
@Component({
  selector: 'app-study-tasks-list',
  templateUrl: './study-tasks-list.component.html',
  styleUrls: ['./study-tasks-list.component.css']
})
export class StudyTasksListComponent implements OnInit, OnDestroy {
  form = new FormGroup({});
  loading: boolean = false;

  studyTasks: any;

  yesNoParId = 600;
  studyId: any;
  studyTimeLineForm: FormGroup | undefined;
  studyTimelines: any;

  yesNoItems: any = null;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  constructor(
    public router: Router,

    private studyEditService: StudyEditService,
    // private builder: FormBuilder,
    private studyReviewService: StudyReviewService,
    private tblParamService: TblParamService
  ) {}

  ngOnInit(): void {
    // this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.studyId = st;
    //   if (this.studyId > 0) {
    //     this.loadStudyTasks(this.studyId);
    //   }
    // });

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadStudyTasks(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  loadStudyTasks(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyTasksDTO(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studyTasks = res;
          this.form.reset();
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  saveStudyTasks() {
    this.loading = true;
    this.saveSubscription = this.studyReviewService.saveStudyTasks(this.studyId, this.studyTasks).subscribe(
      res => {
        // this.setPageFlow(res);
        this.studyTasks = res;
        this.form.reset();
        this.loading = false;
        console.log(`success`);
      },
      err => {
        console.log(`error while editing = ${err}`);
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in Tasks.  Click 'Ok' to continue without saving. ";
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
      this.saveStudyTasks();
    }
  }

  model: any = {};
  options: FormlyFormOptions | any = {};

  fields: FormlyFieldConfig[] = [
    {
      type: 'tabs',
      fieldGroup: [
        {
          templateOptions: { label: 'Database Build' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-4',
                  template: '<label >Tasks</label>'
                },
                {
                  className: 'col-2',
                  template: '<label >Progress</label>'
                },
                {
                  className: 'col-6',
                  template: '<label >Comment</label>'
                }
              ]
            },
            {
              key: 'databaseBuildTasks',
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
                    key: 'riskSetTaskTaskPDescription',
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
            }
          ]
        },
        {
          templateOptions: { label: 'Programming' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-4',
                  template: '<label >Tasks</label>'
                },
                {
                  className: 'col-2',
                  template: '<label >Required</label>'
                },
                {
                  className: 'col-3',
                  template: '<label >Progress</label>'
                },
                {
                  className: 'col-3',
                  template: '<label >In Production</label>'
                }
              ]
            },
            {
              key: 'programmingTasks',
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
                    wrappers: ['help-text'],
                    type: 'label',
                    key: 'riskSetTaskTaskPDescription',
                    templateOptions: {}
                  },
                  {
                    className: 'col-2',
                    key: 'valuePid',
                    type: 'select',
                    wrappers: ['help-text'],
                    templateOptions: {
                      options: this.tblParamService.getParams(this.yesNoParId),
                      valueProp: 'recId',
                      labelProp: 'description'
                    }
                  },
                  // {
                  //   type: 'input',
                  //   key: 'numericValue',
                  //   wrappers: ['help-text'],
                  //   className: 'col-2'
                  // },
                  {
                    className: 'col-2',
                    key: 'numericValue',
                    type: '0-10-select', //0-100-select custom-select
                    wrappers: ['help-text'], //workaround for displaying mandatory *
                    templateOptions: {
                      // required: true
                    },
                    expressionProperties: {
                      'templateOptions.disabled': x => x.valuePid == 602,
                      'templateOptions.required': x => x.valuePid == 601,
                      'templateOptions.helpText': x => x.riskSetTaskCriteria
                    }
                  },
                  {
                    className: 'col-3',

                    key: 'dateProgramInProduction',
                    type: 'date-picker',
                    wrappers: ['help-text'],
                    templateOptions: {
                      helpText:
                        'Date when DM work starts at ICON: enter/update Planned date . Do not update Planned date once actual date is entered.',
                      helpTextPlacement: 'left',
                      description: '',
                    },
                    expressionProperties: {
                      'templateOptions.disabled': x => x.valuePid == 602 || x.cdsDevelopmentTaskCompleted,
                      'templateOptions.description':'model.cdsDevelopmentTaskCompleted ? "Date Posted By CDS Development Request On Completion" :""'
                    }
                  }
                ]
              }
            }
          ]
        },
        {
          templateOptions: { label: 'Data Processing' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-4',
                  template: '<label >Tasks</label>'
                },
                {
                  className: 'col-2',
                  template: '<label >Progress</label>'
                },
                {
                  className: 'col-6',
                  template: '<label >Comment</label>'
                }
              ]
            },
            {
              key: 'dataProcessing',
              type: 'repeat',
              templateOptions: {
                hideRemoveButton: true,
                hideAddButton: true
              },
              fieldArray: {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'col-sm-4',
                    wrappers: ['help-text'],
                    type: 'label',
                    key: 'riskSetTaskTaskPDescription',
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
                    wrappers: ['help-text'],
                    key: 'comments',
                    className: 'col-6'
                  }
                ]
              }
            }
          ]
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
