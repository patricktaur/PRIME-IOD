import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ImiExportOptions } from '@app/prism/reports/exports/imi-export-options';

@Component({
  selector: 'app-imi-exports',
  templateUrl: './imi-exports.component.html',
  styleUrls: ['./imi-exports.component.css']
})
export class ImiExportsComponent implements OnInit, OnDestroy {
  title = 'IMI Export Data';

  downloadApiPath = 'api/Export/imi-export';
  zipfileName = 'IMICDMSExport.zip';

  selectedOptions: ImiExportOptions = {
    imiCdms: true,
    imiCdmsTracker: true,
    imiCdmsChildTable: true
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
      key: 'imiCdms',
      type: 'checkbox',

      templateOptions: {
        label: 'IMI CDMS'
        // description: 'Current Review'
      }
    },
    {
      key: 'imiCdmsChildTable',
      type: 'checkbox',

      templateOptions: {
        label: 'IMI CDMS CPPC'
        // description: 'Current Review'
      }
    },
    {
      key: 'imiCdmsTracker',
      type: 'checkbox',

      templateOptions: {
        label: 'IMI CDMS Tracker'
        // description: 'Current Review'
      }
    }
  ];

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
