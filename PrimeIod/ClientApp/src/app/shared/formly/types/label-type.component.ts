import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'formly-label-type',
  template: `
    <div *ngIf="!to['hideLabel']">
      <label *ngIf="to.label">
        {{ to.label }}
      </label>
      <br />
    </div>
    <div style="padding-left: 10px; padding-top: 5px">
      {{ displayValue }}
    </div>
    <p class="text-muted">
      <small>{{ to.description }}</small>
    </p>
  `
})
export class LabelTypeComponent extends FieldType {
  //templateOption values
  //pipe : date /
  //pipeFormat : all angular pipe recognized formats
  constructor(private datePipe: DatePipe, private decimalPipe: DecimalPipe) {
    super();
  }
  get displayValue() {
    let retValue: string | null;
    let value = this.formControl.value;
    //dataType: date /
    switch (this.to['pipe']) {
      case 'date':
        retValue = this.datePipe.transform(value, this.to['pipeFormat']);
        break;

      default:
        retValue = value;
        break;
    }
    return retValue;
  }
}
