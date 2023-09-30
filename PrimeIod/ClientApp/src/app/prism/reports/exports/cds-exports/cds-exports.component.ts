import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { CdsExportOptions } from '@app/prism/reports/exports/cds-export-options';

@Component({
  selector: 'app-cds-exports',
  templateUrl: './cds-exports.component.html',
  styleUrls: ['./cds-exports.component.css']
})
export class CdsExportsComponent implements OnInit, OnDestroy {
  title = 'CDS Export Data';

  downloadApiPath = 'api/Export/cds-export';
  zipfileName = 'test.zip';

  selectedOptions: CdsExportOptions = {
    cds: true,
    cdsCodingRequest: true,
    cdsDeliveryRequest: true,
    cdsDevelopmentRequest: true,
    cdsOutputRequest: true
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
      key: 'cds',
      type: 'checkbox',

      templateOptions: {
        label: 'CDS'
        // description: 'Current Review'
      }
    },

    {
      key: 'cdsDevelopmentRequest',
      type: 'checkbox',

      templateOptions: {
        label: 'CDS Development Request Details'
        // description: 'Current Review'
      }
    },
    {
      key: 'cdsDeliveryRequest',
      type: 'checkbox',

      templateOptions: {
        label: 'CDS Delivery Request Details'
        // description: 'Current Review'
      }
    },
    {
      key: 'cdsOutputRequest',
      type: 'checkbox',

      templateOptions: {
        label: 'CDS Output Request Details'
        // description: 'Current Review'
      }
    },
    {
      key: 'cdsCodingRequest',
      type: 'checkbox',

      templateOptions: {
        label: 'CDS Coding Request'
        // description: 'Current Review'
      }
    }
  ];

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
