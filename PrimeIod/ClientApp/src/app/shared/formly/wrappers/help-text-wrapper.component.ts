import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-help-text',
  template: `
    <div ngbTooltip="{{ to['helpText'] }}" [placement]="placement">
      <label>
        {{ to.label }}
      </label>
      <span *ngIf="to.required && to['hideRequiredMarker'] !== true">*</span>
      <ng-container #fieldComponent></ng-container>

      <small class="text-muted">{{ to.description }} </small>

      <small class="text-danger"> <formly-validation-message [field]="field"></formly-validation-message></small>
    </div>
  `
})
export class HelpTextWrapperComponent extends FieldWrapper {
  // placement : string =  'top'; //this.to.helpTextPlacement ? 'top' :  this.to.helpTextPlacement;
  // xyz  = (this.to.helpText)  == null ? "abc" : "--" ;

  get placement() {
    if (this.to?.['helpTextPlacement']) {
      return this.to['helpTextPlacement'];
    } else {
      return 'top';
    }
  }
}
