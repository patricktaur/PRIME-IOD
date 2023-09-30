import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-ng-select',
  template: `
    <div>
      <!-- <div>{{to.options | async | json}}</div>
      <div>{{to['valueProp']}}</div> -->
      <ng-select
        [items]="to.options | async"
        [placeholder]="to.label? to.label: ''"
        [bindValue]="to['valueProp'] || 'name'"
        [bindLabel]="to['labelProp'] || 'id'"
        [formControl]="formControl"
        [class.is-invalid]="showError"
        [multiple]="to['multiple'] || false"
      >
      </ng-select>
      <!-- <ng-select
        [placeholder]="to.label? to.label: ''"
        [bindValue]="to['valueProp'] || 'name'"
        [bindLabel]="to['labelProp'] || 'id'"
        [formControl]="formControl"
        [class.is-invalid]="showError"
        [multiple]="to['multiple'] || false"
      >
      </ng-select> -->
    </div>
  `
})
export class NgSelectTypeComponent extends FieldType {}
