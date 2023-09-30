import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
@Component({
  selector: 'formly-fieldset-wrapper',
  template: `
    <div class="form-group" [class.has-error]="showError">
      <ng-template #fieldComponent></ng-template>
    </div>
  `
})
export class FieldsetWrapperComponent extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef })
  override fieldComponent: ViewContainerRef | any;
}
