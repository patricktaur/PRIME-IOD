import { Component, OnInit } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index" class="row alt-row-form">
      <formly-field class="col" [field]="field"></formly-field>
      <div *ngIf="!to['hideRemoveButton']" class="col-sm-2 d-flex align-items-center">
        <button class="btn btn-danger" type="button" (click)="remove(i)">Remove</button>
      </div>
    </div>
  `
})
export class RepeatTypeComponent extends FieldArrayType {}

// <div *ngIf="!to.hideAddButton" style="margin:30px 0;">
//       <button class="btn btn-primary" type="button" (click)="add()">{{ to.addText }}</button>
//     </div>
