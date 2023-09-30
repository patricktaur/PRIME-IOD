import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-ng-multi-select',
  template: `
    <app-ng-multi-select
      [fieldValue]="fieldValue"
      [bindValue]="to['valueProp'] || 'id'"
      [bindLabel]="to['labelProp'] || 'value'"
      [options]="to.options | async"
      (selectionChange)="onSelectionChange($event)"
    ></app-ng-multi-select>
  `
})
export class NgMultiSelectTypeComponent extends FieldType implements OnInit {
  fieldValue: any;

  // [bindValue]="to.valueProp || 'id'"
  // [bindLabel]="to.labelProp || 'value'"
  ngOnInit(): void {
    this.formControl.valueChanges.pipe().subscribe((value: any) => {
      this.fieldValue = value;
    });
  }

  onSelectionChange(changedValue: string) {
    this.fieldValue = changedValue;
    this.formControl.setValue(changedValue);
    this.formControl.markAsDirty();
  }
}
