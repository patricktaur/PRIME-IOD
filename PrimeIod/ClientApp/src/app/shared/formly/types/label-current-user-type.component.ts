import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'formly-label-type',
  template: `
    <!-- hidden to prevent repeate of lable  -->
    <!-- when used with horizontal-wrapper the lable appears twice  -->
    <!--
  <label *ngIf="to.label">
      {{ to.label }}
    </label>
    <br />
    -->
    <app-current-user></app-current-user>

    <p class="text-muted" *ngIf="to.description">
      <small>{{ to.description }}</small>
    </p>
  `
})
export class LabelCurrentUserTypeComponent extends FieldType implements OnInit {
  //templateOption values
  //pipe : date /
  //pipeFormat : all angular pipe recognized formats
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.formControl.patchValue(6);
    // this.formControl.valueChanges.pipe().subscribe(value => {
    //   // this.selectColor(this.selectedValue.toString());
    //   value = value?.toString();
    //   this.selectColor(value);
    // });
    // this.formControl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }
  get displayValue() {
    let retValue: string = "";
    let value = this.formControl.value;

    return retValue;
  }
}
