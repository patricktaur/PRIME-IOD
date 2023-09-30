import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { CdmsExportOptions } from '@app/prism/reports/exports/cdms-export-options';
@Component({
  selector: 'app-cdms-exports',
  templateUrl: './cdms-exports.component.html',
  styleUrls: ['./cdms-exports.component.css']
})
export class CdmsExportsComponent implements OnInit, OnDestroy {
  title = 'CDMS Export Data';

  downloadApiPath = 'api/Export/cdms-export';
  zipfileName = 'test.zip';

  selectedOptions: CdmsExportOptions = {
    cdms: true,
    cdmsChildTable: true,
    cdmsTracker: true,
    cdmsTrackerByGroup: true,
    thirdPartyCdmsTracker: true,
    thirdPartyCdmsTrackerByGroup: true
  };

  isLoading = false;

  loadSub: Subscription | undefined;
  constructor() {}

  ngOnInit(): void {}

  generateAndDownload() {
    this.isLoading = true;
  }

  get selectAllButtonCaption() {
    return this.totalSelectedControls == this.totalControls ? 'Unselect All' : 'Select All';
  }

  get downloadButtonDisabled() {
    return this.totalSelectedControls == 0 ? true : false;
  }

  selectAll() {
    const resetValue = this.totalSelectedControls < this.totalControls ? true : false;

    this.setControlValue(resetValue);
  }

  setControlValue(value: boolean) {
    Object.keys(this.form.controls).forEach((key: string) => {
      const abstractControl: any = this.form.get(key);
      abstractControl.setValue(value);
    });
  }

  get totalControls() {
    let count = 0;
    Object.keys(this.form.controls).forEach((key: string) => {
      count += 1;
    });
    return count;
  }

  get totalSelectedControls() {
    let count = 0;
    Object.keys(this.form.controls).forEach((key: string) => {
      const abstractControl: any = this.form.get(key);
      if (abstractControl.value == true) {
        count += 1;
      }
    });
    return count;
  }

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'cdms',
      type: 'checkbox',

      templateOptions: {
        label: 'CDMS'
        // description: 'Current Review'
      }
    },
    {
      key: 'cdmsChildTable',
      type: 'checkbox',

      templateOptions: {
        label: 'CDMS CPPC'
        // description: 'Current Review'
      }
    },
    {
      key: 'cdmsTracker',
      type: 'checkbox',

      templateOptions: {
        label: 'CDMS Tracker'
        // description: 'Current Review'
      }
    },
    {
      key: 'cdmsTrackerByGroup',
      type: 'checkbox',

      templateOptions: {
        label: 'CDMS Trask By Group'
        // description: 'Current Review'
      }
    },
    {
      key: 'thirdPartyCdmsTracker',
      type: 'checkbox',

      templateOptions: {
        label: 'Clininfo CDMS Tracker'
        // description: 'Current Review'
      }
    },
    {
      key: 'thirdPartyCdmsTrackerByGroup',
      type: 'checkbox',

      templateOptions: {
        label: 'Clininfo CDMS Trask By Group'
        // description: 'Current Review'
      }
    }
  ];

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
