import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-tabs',
  template: `
    <!-- <ngb-tabset type="pills">
      <ngb-tab
        title="{{ tab.templateOptions.label }}"
        *ngFor="let tab of field.fieldGroup; let i = index; let last = last"
      >
        <ng-template ngbTabContent>
          <formly-field [field]="tab"></formly-field>
        </ng-template>
      </ngb-tab>
    </ngb-tabset> -->
    <ul ngbNav #nav="ngbNav" [(activeId)]="active" class="nav-pills">
    <li [ngbNavItem]="i"
    *ngFor="let tab of field.fieldGroup; let i = index; let last = last"
    >
      <button ngbNavLink>{{ tab.templateOptions.label }}</button>
      
      <ng-template ngbNavContent>

        <formly-field [field]="tab"></formly-field>
      </ng-template>
    </li>
    
  </ul>
  <div [ngbNavOutlet]="nav" class="mt-2"></div>

  `
})
export class FormlyFieldTabs extends FieldType {
  active = 0;
  isValid(field: FormlyFieldConfig | any): boolean {
    if (field.key) {
      return field.formControl.valid;
    }

    return field.fieldGroup.every((f: any) => this.isValid(f));
  }
}
