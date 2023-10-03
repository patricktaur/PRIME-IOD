import { Component, OnInit } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    
  <div class="row alt-row-form">
    
  
  <div *ngFor="let field of field.fieldGroup; let i = index" class="col">
      <formly-field class="col" [field]="field"></formly-field>
      
    </div>
  
  </div>
  
  

    
  `
})
export class RepeatHorizontalTypeComponent extends FieldArrayType {}

// <div *ngIf="!to.hideAddButton" style="margin:30px 0;">
//       <button class="btn btn-primary" type="button" (click)="add()">{{ to.addText }}</button>
//     </div>
