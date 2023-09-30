import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-crm-exports',
  templateUrl: './crm-exports.component.html',
  styleUrls: ['./crm-exports.component.css']
})
export class CrmExportsComponent implements OnInit, OnDestroy  {
  title = 'Export Data (CRM Studies)';

  includeAllReviews = false;

  downloadApiOnePath = 'api/Export/crm-export';
  zipOnefileName = 'crm-studies.zip';
  //workaround to separate includeAllReviews from formly controls
  //at the same time include includeAllReviews for posting to api
  selectedOptions = {
    includeAllReviews: false,
    crmExportOptions: {
      // includeAllReviews: false,
      crmDescription: true,
      crmAward: true,
      crmTimeline: true,
      crmDesAwaTime: true,
      crmResource: true,
      crmBudget: true
    }
  };


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
          key: 'crmDescription',
          type: 'checkbox',

          templateOptions: {
            label: 'CRM Description Report'
          }
        },

        {
          className: 'col-3',
          key: 'crmAward',
          type: 'checkbox',

          templateOptions: {
            label: 'CRM Award Report'
          }
        },
        {
          className: 'col-3',
          key: 'crmTimeline',
          type: 'checkbox',

          templateOptions: {
            label: 'CRM Timeline Report'
          }
        },
        {
          className: 'col-3',
          key: 'crmDesAwaTime',
          type: 'checkbox',

          templateOptions: {
            label: 'CRM Description + Award + Timeline'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'crmResource',
          type: 'checkbox',

          templateOptions: {
            label: 'CRM Resource Report'
          }
        },

        {
          className: 'col-3',
          key: 'crmBudget',
          type: 'checkbox',

          templateOptions: {
            label: 'CRM Budget Report'
          }
        },
        // {
        //   className: 'col-3',
        //   key: 'studyKpiDashboard',
        //   type: 'checkbox',

        //   templateOptions: {
        //     label: 'KPI Dashboard'
        //   }
        // },
        // {
        //   className: 'col-3',
        //   key: 'studyKpis',
        //   type: 'checkbox',

        //   templateOptions: {
        //     label: 'KPIs'
        //   }
        // }
      ]
    }
  ];

  //studyDatabaseLockDashboardMainDbl
  ngOnDestroy(): void {
    // this.loadSub?.unsubscribe();
  }
}
