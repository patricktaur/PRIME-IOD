import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'int-check-box-type',

  template: `
    <div *ngIf="!to['hideLabel']">
      <label *ngIf="to.label">
        {{ to.label }}
      </label>
    </div>
    <input type="checkbox" [checked]="checked === 1 ? true : false" (change)="onChange($event)" />
  `
})
export class IntCheckBoxTypeComponent extends FieldType implements OnInit {
  checked: number | undefined;

  ngOnInit(): void {
    this.formControl.valueChanges.pipe().subscribe((value: number | undefined) => {
      this.checked = value;
    });
    this.formControl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  onChange(value: any) {
    const val = value.target.checked ? 1 : 0;
    this.formControl.setValue(val);
    this.formControl.markAsDirty();
  }
}
