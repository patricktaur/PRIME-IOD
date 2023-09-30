import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
@Component({
  selector: 'formly-label-wrapper',
  template: `
    <label [attr.for]="id" class="form-control-label control-label" *ngIf="to.label">
      {{ to.label }}
      <ng-container *ngIf="to.required && to['hideRequiredMarker'] !== true">*</ng-container>
    </label>
    <ng-template #fieldComponent></ng-template>
  `
})
export class LabelWrapperComponent extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef }) override fieldComponent: ViewContainerRef | any;
}
