import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-horizontal-wrapper',
  template: `
    <div class="form-group row">
      <div *ngIf="to.label" [ngClass]="labelColClassName()">
        <label [attr.for]="id">
          {{ to.label }}
          <ng-container *ngIf="to.required && to['hideRequiredMarker'] !== true">*</ng-container>
        </label>
      </div>

      <div ngbTooltip="{{ to['helpText'] }}" [placement]="placement" [ngClass]="fieldColClassName()">
        <ng-template #fieldComponent></ng-template>
        <div *ngIf="to.description" style="font-size: smaller;">
          {{ to.description }}
        </div>
        <div *ngIf="showError" class="invalid-feedback d-block">
          <formly-validation-message [field]="field"></formly-validation-message>
        </div>
      </div>
    </div>
  `
})
export class FormlyHorizontalWrapper extends FieldWrapper {
  get placement() {
    if (this.to?.['helpTextPlacement']) {
      return this.to['helpTextPlacement'];
    } else {
      return 'top';
    }
  }

  labelColClassName() {
    if (!this.to['labelColClassName']) {
      this.to['labelColClassName'] = 'col-sm-1';
    }
    return this.to['labelColClassName']; //`col-form-label ` +
  }

  fieldColClassName() {
    if (!this.to['fieldColClassName']) {
      this.to['fieldColClassName'] = 'col-sm-1';
    }
    return this.to['fieldColClassName'];
  }
}
