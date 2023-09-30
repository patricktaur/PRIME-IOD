import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { DmExportOptions } from '@app/prism/reports/exports/dm-export-options';
import { DmAllReviewExportOptions } from '@app/prism/reports/exports/dm-all-review-export-options';
@Component({
  selector: 'app-dm-exports',
  templateUrl: './dm-exports.component.html',
  styleUrls: ['./dm-exports.component.css']
})
export class DmExportsComponent implements OnInit, OnDestroy {
  title = 'Export Data (DM Studies)';

  includeAllReviews = false;

  downloadApiOnePath = 'api/Export/dm-export';
  zipOnefileName = 'dm-studies.zip';
  //workaround to separate includeAllReviews from formly controls
  //at the same time include includeAllReviews for posting to api
  selectedOptions = {
    includeAllReviews: false,
    dmExportOptions: {
      // includeAllReviews: false,
      studyDetails: true,
      studyAssumptions: true,
      studyTimelines: true,
      studyStatus: true,
      studyResources: true,
      studyTasks: true,
      studyPageFlow: true,
      projectIssueList: true,
      studyDeliverables: true,
      studyKpis: true,
      studyKpiDashboard: true,
      studyQr: true,
      studyLL: true,
      studyRiskScores: true,
      studyReviewDetails: true,
      studyFte: true,
      fteDashboard: true,
      studyTmfQc: true,
      studyEdcAccessReviewPeriodicity: true,
      studyDblSummary: true,
      studyCdmsTraskByGroup: true,
      studyCelgeneDeliverables: true,
      studyExternalData: true,
      studyDatabaseLockDashboardMainDbl: true
    }
  };

  // selectedOneOptions: DmExportOptions = {
  //   //  includeAllReviews: false,
  //   studyDetails: true,
  //   studyAssumptions: true,
  //   studyTimelines: true,
  //   studyStatus: true,
  //   studyResources: true,
  //   studyTasks: true,
  //   studyPageFlow: true,
  //   projectIssueList: true,
  //   studyDeliverables: true,
  //   studyKpis: true,
  //   studyKpiDashboard: true,
  //   studyQr: true,
  //   studyLL: true,
  //   studyRiskScores: true,
  //   studyReviewDetails: true,
  //   studyFte: true,
  //   fteDashboard: true,

  //   studyTmfQc: true,

  //   studyEdcAccessReviewPeriodicity: true,
  //   studyDblSummary: true,
  //   studyCdmsTraskByGroup: true,
  //   studyCelgeneDeliverables: true,
  //   studyExternalData: true,
  //   studyDatabaseLockDashboardMainDbl: true
  // };

  isLoading = false;

  constructor() {}

  ngOnInit(): void {}

  generateAndDownload() {
    this.isLoading = true;
  }

  get selectAllButtonOneCaption() {
    return this.totalOneSelectedControls == this.totalOneControls ? 'Unselect All' : 'Select All';
  }

  get downloadButtonOneDisabled() {
    return this.totalOneSelectedControls == 0 ? true : false;
  }

  selectOneAll() {
    const resetValue = this.totalOneSelectedControls < this.totalOneControls ? true : false;

    this.setControlValue(resetValue);
  }

  setControlValue(value: boolean) {
    Object.keys(this.formOne.controls).forEach((key: string) => {
      const abstractControl: any = this.formOne.get(key);
      abstractControl.setValue(value);
    });
  }

  get totalOneControls() {
    let count = 0;
    Object.keys(this.formOne.controls).forEach((key: string) => {
      count += 1;
    });
    return count;
  }

  get totalOneSelectedControls() {
    let count = 0;
    Object.keys(this.formOne.controls).forEach((key: string) => {
      const abstractControl: any = this.formOne.get(key);
      if (abstractControl.value == true) {
        count += 1;
      }
    });
    return count;
  }

  formOne = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    //--
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'studyCelgeneDeliverables',
          type: 'checkbox',

          templateOptions: {
            label: 'Celgene Deliverables'
          }
        },

        {
          className: 'col-3',
          key: 'studyDblSummary',
          type: 'checkbox',

          templateOptions: {
            label: 'DBL Summary'
          }
        },
        {
          className: 'col-3',
          key: 'studyEdcAccessReviewPeriodicity',
          type: 'checkbox',

          templateOptions: {
            label: 'EDC Access Review Reader'
          }
        },
        {
          className: 'col-3',
          key: 'studyExternalData',
          type: 'checkbox',

          templateOptions: {
            label: 'External Data'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'fteDashboard',
          type: 'checkbox',

          templateOptions: {
            label: 'FTE Dashboard'
          }
        },

        {
          className: 'col-3',
          key: 'studyFte',
          type: 'checkbox',

          templateOptions: {
            label: 'FTEs'
          }
        },
        {
          className: 'col-3',
          key: 'studyKpiDashboard',
          type: 'checkbox',

          templateOptions: {
            label: 'KPI Dashboard'
          }
        },
        {
          className: 'col-3',
          key: 'studyKpis',
          type: 'checkbox',

          templateOptions: {
            label: 'KPIs'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'studyLL',
          type: 'checkbox',

          templateOptions: {
            label: 'Local Labs'
          }
        },

        {
          className: 'col-3',
          key: 'studyPageFlow',
          type: 'checkbox',

          templateOptions: {
            label: 'Page Flow'
          }
        },
        {
          className: 'col-3',
          key: 'projectIssueList',
          type: 'checkbox',

          templateOptions: {
            label: 'Project Issue List'
          }
        },
        {
          className: 'col-3',
          key: 'studyQr',
          type: 'checkbox',

          templateOptions: {
            label: 'Quality Review'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'studyAssumptions',
          type: 'checkbox',

          templateOptions: {
            label: 'Study Assumptions'
          }
        },

        {
          className: 'col-3',
          key: 'studyDatabaseLockDashboardMainDbl',
          type: 'checkbox',

          templateOptions: {
            label: 'Study Database Lock Dashboard Main DBL'
          }
        },
        {
          className: 'col-3',
          key: 'studyDeliverables',
          type: 'checkbox',

          templateOptions: {
            label: 'Study Deliverables'
          }
        },
        {
          className: 'col-3',
          key: 'studyDetails',
          type: 'checkbox',

          templateOptions: {
            label: 'Study Details'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'studyResources',
          type: 'checkbox',

          templateOptions: {
            label: 'Study Resources'
          }
        },

        {
          className: 'col-3',
          key: 'studyReviewDetails',
          type: 'checkbox',

          templateOptions: {
            label: 'Study Review'
          }
        },
        {
          className: 'col-3',
          key: 'studyStatus',
          type: 'checkbox',

          templateOptions: {
            label: 'Study Status'
          }
        },
        {
          className: 'col-3',
          key: 'studyTasks',
          type: 'checkbox',

          templateOptions: {
            label: 'Study Tasks'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'studyTimelines',
          type: 'checkbox',

          templateOptions: {
            label: 'Study Timelines'
          }
        },

        {
          className: 'col-3',
          key: 'studyTmfQc',
          type: 'checkbox',

          templateOptions: {
            label: 'TMF QC'
          }
        }
      ]
    }
  ];

  //For All REviews

  // downloadApiTwoPath = 'api/Export/dm-export-all-reviews';
  // zipTwofileName = 'dm-all-reviews.zip';
  // selectedTwoOptions: DmAllReviewExportOptions = {
  //   studyDetails: true,

  //   studyAssumptions: true,
  //   studyTimelines: true,
  //   studyStatus: true,
  //   studyTasks: true,
  //   studyPageFlow: true,
  //   studyReviewDetails: true
  // };

  // get selectAllButtonTwoCaption() {
  //   return this.totalTwoSelectedControls == this.totalTwoControls ? 'Unselect All' : 'Select All';
  // }

  // get downloadButtonTwoDisabled() {
  //   return this.totalTwoSelectedControls == 0 ? true : false;
  // }

  // selectTwoAll() {
  //   const resetValue = this.totalTwoSelectedControls < this.totalTwoControls ? true : false;

  //   this.setTwoControlValue(resetValue);
  // }

  // setTwoControlValue(value: boolean) {
  //   Object.keys(this.formTwo.controls).forEach((key: string) => {
  //     const abstractControl = this.formTwo.get(key);
  //     abstractControl.setValue(value);
  //   });
  // }

  // get totalTwoControls() {
  //   let count = 0;
  //   Object.keys(this.formTwo.controls).forEach((key: string) => {
  //     count += 1;
  //   });
  //   return count;
  // }

  // get totalTwoSelectedControls() {
  //   let count = 0;
  //   Object.keys(this.formTwo.controls).forEach((key: string) => {
  //     const abstractControl = this.formTwo.get(key);
  //     if (abstractControl.value == true) {
  //       count += 1;
  //     }
  //   });
  //   return count;
  // }

  // formTwo = new FormGroup({});
  // modelTwo: any = {};
  // // options: FormlyFormOptions = {};
  // fieldsTwo: FormlyFieldConfig[] = [
  //   {
  //     fieldGroupClassName: 'row',
  //     fieldGroup: [
  //       {
  //         className: 'col-3',
  //         key: 'studyReviewDetails',
  //         type: 'checkbox',

  //         templateOptions: {
  //           label: 'Study Review '
  //           // description: ''
  //         }
  //       },
  //       {
  //         className: 'col-3',
  //         key: 'studyDetails',
  //         type: 'checkbox',

  //         templateOptions: {
  //           label: 'Study Details '
  //           //description: 'FileName: study_details.csv'
  //         }
  //       },

  //       {
  //         className: 'col-3',
  //         key: 'studyAssumptions',
  //         type: 'checkbox',

  //         templateOptions: {
  //           label: 'Study Assumptions '
  //           //description: 'FileName: study_assumptions.csv'
  //         }
  //       },
  //       {
  //         className: 'col-3',
  //         key: 'studyTimelines',
  //         type: 'checkbox',

  //         templateOptions: {
  //           label: 'Study Timelines '
  //           //description: 'FileName: study_timelines.csv'
  //         }
  //       }
  //     ]
  //   },

  //   {
  //     fieldGroupClassName: 'row',
  //     fieldGroup: [
  //       {
  //         className: 'col-3',
  //         key: 'studyStatus',
  //         type: 'checkbox',

  //         templateOptions: {
  //           label: 'Study Status '
  //           //description: 'FileName: study_status.csv'
  //         }
  //       },

  //       {
  //         className: 'col-3',
  //         key: 'studyPageFlow',
  //         type: 'checkbox',

  //         templateOptions: {
  //           label: 'Page Flow '
  //           //description: 'FileName: study_PageFlow.csv'
  //         }
  //       },
  //       {
  //         className: 'col-3',
  //         key: 'studyTasks',
  //         type: 'checkbox',

  //         templateOptions: {
  //           label: 'Study Tasks '
  //           //description: 'FileName: study_tasks.csv'
  //         }
  //       }
  //     ]
  //   }
  // ];

  //studyDatabaseLockDashboardMainDbl
  ngOnDestroy(): void {
    // this.loadSub?.unsubscribe();
  }
}
