import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
@Component({
  selector: 'formly-label-wrapper',
  template: `
    <div class="bg-info">
      <ng-template #fieldComponent></ng-template>
    </div>
  `,
  styles: ['div{padding:3px}']
})
export class BackgroundColorWrapperComponent extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef }) override fieldComponent: ViewContainerRef | any;
}
