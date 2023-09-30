import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-recurring-frequency-type',
  templateUrl: './recurring-frequency-type.component.html',
  styleUrls: ['./recurring-frequency-type.component.css']
})
export class RecurringFrequencyTypeComponent extends FieldType implements OnInit {
  // constructor() { }
  fieldValue: any;
  frequency: number | undefined;
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
