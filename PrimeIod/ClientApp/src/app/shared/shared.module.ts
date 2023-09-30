import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './toast/toast.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { PaginationControlComponent } from './pagination-control/pagination-control.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { HasPermissionsDirective } from './has-permissions/has-permissions.directive';
import { DropDownComponent } from './form-fields/drop-down/drop-down.component';
import { TextBoxComponent } from './form-fields/text-box/text-box.component';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { GuiGridModule } from '@generic-ui/ngx-grid';
import { DataTableBaseComponent } from './data-table/data-table-base/data-table-base.component';
import { DataTableShellComponent } from './data-table/data-table-shell/data-table-shell.component';
import { ColumnManagerComponent } from './column-manager/column-manager/column-manager.component';
import { CellComponent } from './cell/cell.component';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { LabelTypeComponent } from './formly/types/label-type.component';
import { LabelColorComponent } from './formly/types/label-color.component';
// import { FieldsetWrapperComponent } from './formly/wrappers/fieldset-wrapper.component';
import { FieldsetWrapperComponent } from './formly/wrappers/fieldset-wrapper.component';

import { LabelWrapperComponent } from './formly/wrappers/label-wrapper.component';

import { DatePickerComponent } from './formly/types/date-picker/date-picker.component';
import { DatePickerValueAccessor } from './formly/types/date-picker/date-picker.directive';
import { BackgroundColorWrapperComponent } from './formly/wrappers/background-color-wrapper.component';
import { RepeatTypeComponent } from './formly/types/repeat-type-component';
import { CustomSelectTypeComponent } from './formly/types/custom-select';
import { HelpTextWrapperComponent } from './formly/wrappers/help-text-wrapper.component';
import { FormlyFieldTabs } from './formly/types/tabs.type';
import { ZeroToTenSelectTypeComponent } from './formly/types/zero-to-ten-select-type.component';
import { ZeroToHundredSelectTypeComponent } from './formly/types/zero-to-hundred-select-type.component';
import { CurrentUserComponent } from './current-user/current-user.component';
import { LabelCurrentUserTypeComponent } from './formly/types/label-current-user-type.component';
import { NgSelectTypeComponent } from './formly/types/formly-ng-select-type-component';
import { FormlyHorizontalWrapper } from './formly/wrappers/horizontal-wrapper';
import { ColumnManagerShellComponent } from './column-manager/column-manager-shell/column-manager-shell.component';
import { ConfirmationShellComponent } from './confirmation-shell/confirmation-shell.component';
import { RecurringFrequencyTypeComponent } from './formly/types/recurring-frequency-type/recurring-frequency-type.component';
import { NgMultiSelectComponent } from './ng-multi-select/ng-multi-select.component';
import { NgMultiSelectTypeComponent } from './formly/types/formly-ng-multi-select-type-component';
import { RecurringFrequencyComponent } from './recurring-frequency/recurring-frequency.component';
import { CopyLinkComponent } from './copy-link/copy-link';
import { CardDashboardComponent } from './dashboards/card-dashboard/card-dashboard.component';
import { FormlyFieldButton } from './formly/types/button-type.component';
import { TableDashboardComponent } from './dashboards/table-dashboard/table-dashboard.component';
import { ServerResponseMessagesComponent } from './server-response/server-response-messages/server-response-messages.component';
import { FormStatusComponent } from './form-status/form-status.component';
import { IntCheckBoxTypeComponent } from './formly/types/int-check-box';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { ViewTableComponent } from './view-table/view-table.component';
import { PanelWrapperComponent } from './formly/wrappers/panel-wrapper/panel-wrapper.component';
import { ComponentAccessComponent } from './component-access/component-access.component';
import { MenuAccessLinkDirective } from './directives/menu-access-link.directive';
import { HtmlEditorComponent } from './html-editor/html-editor.component';
import { HtmlEditorTypeComponent } from './formly/types/html-editor-type/html-editor-type.component';
import { LastSavedComponent } from './last-saved/last-saved.component';
import { NavigationService } from './navigation.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxFileUploadComponent } from './ngx-file-upload/ngx-file-upload.component';
import { MenuAccessDirective} from './directives/menu-access.directive';  

export function minlengthValidationMessage(err: any, field: any) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err: any, field: any) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err: any, field: any) {
  return `This value should be more than ${field.templateOptions.min}`;
}

export function maxValidationMessage(err: any, field: any) {
  return `This value should be less than ${field.templateOptions.max}`;
}

export function emailIdValidator(err: any, field: any) {
  return /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}/.test(field.formControl.value)
    ? null
    : { emailValidation: true };
}

export function emailIdValidatorMessage(err: any, field: any) {
  return `"${field.formControl.value}" is not a valid Email ID`;
}

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    GuiGridModule,
    FormlySelectModule,
    FileUploadModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      types: [
        {
          name: 'label',
          component: LabelTypeComponent
        },
        { name: 'date-picker', component: DatePickerComponent, wrappers: ['label', 'fieldset'] },
        { name: 'repeat', component: RepeatTypeComponent },
        { name: 'custom-select', component: CustomSelectTypeComponent }, //0-5-select
        { name: 'label-color', component: LabelColorComponent },
        { name: 'tabs', component: FormlyFieldTabs },
        { name: '0-10-select', component: ZeroToTenSelectTypeComponent },
        { name: '0-100-select', component: ZeroToHundredSelectTypeComponent },
        { name: 'label-current-user', component: LabelCurrentUserTypeComponent },
        { name: 'ng-select', component: NgSelectTypeComponent },
        { name: 'recurring-frequency', component: RecurringFrequencyTypeComponent },
        { name: 'ng-multi-select', component: NgMultiSelectTypeComponent },
        {
          name: 'button',
          component: FormlyFieldButton,
          wrappers: ['form-field'],
          defaultOptions: {
            templateOptions: {
              btnType: 'default',
              type: 'button'
            }
          }
        },
        { name: 'int-checkbox', component: IntCheckBoxTypeComponent },
        { name: 'html-editor', component: HtmlEditorTypeComponent }
      ],
      wrappers: [
        { name: 'label', component: LabelWrapperComponent },
        { name: 'fieldset', component: FieldsetWrapperComponent },
        { name: 'background-color', component: BackgroundColorWrapperComponent },
        { name: 'help-text', component: HelpTextWrapperComponent },
        { name: 'horizontal-layout', component: FormlyHorizontalWrapper },
        { name: 'panel', component: PanelWrapperComponent }
      ],
      validators: [{ name: 'emailValidation', validation: emailIdValidator }],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minLength', message: minlengthValidationMessage },
        { name: 'maxLength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
        { name: 'emailValidation', message: emailIdValidatorMessage },
        { name: 'valueExists', message: 'Value exists' }
      ]
    }),
    FormlyBootstrapModule,
    AngularEditorModule
  ],

  declarations: [
    LoaderComponent,
    ToastComponent,
    ConfirmationModalComponent,
    PaginationControlComponent,
    HasPermissionsDirective,
    
    DropDownComponent,
    TextBoxComponent,
    YesNoPipe,
    DataTableBaseComponent,
    DataTableShellComponent,
    ColumnManagerComponent,
    CellComponent,
    PlaceholderDirective,
    LabelTypeComponent,
    FieldsetWrapperComponent,
    LabelWrapperComponent,
    HelpTextWrapperComponent,
    DatePickerComponent,
    DatePickerValueAccessor,
    BackgroundColorWrapperComponent,
    RepeatTypeComponent,
    CustomSelectTypeComponent,
    LabelColorComponent,
    FormlyFieldTabs,
    ZeroToTenSelectTypeComponent,
    ZeroToHundredSelectTypeComponent,
    CurrentUserComponent,
    LabelCurrentUserTypeComponent,
    NgSelectTypeComponent,
    FormlyHorizontalWrapper,
    ColumnManagerShellComponent,
    ConfirmationShellComponent,
    RecurringFrequencyTypeComponent,
    NgMultiSelectComponent,
    NgMultiSelectTypeComponent,
    RecurringFrequencyComponent,
    CopyLinkComponent,
    CardDashboardComponent,
    FormlyFieldButton,
    TableDashboardComponent,
    ServerResponseMessagesComponent,
    FormStatusComponent,
    IntCheckBoxTypeComponent,
    ViewTableComponent,
    PanelWrapperComponent,
    ComponentAccessComponent,
    MenuAccessLinkDirective,
    HtmlEditorComponent,
    HtmlEditorTypeComponent,
    LastSavedComponent,
    FileUploadComponent,
    DragDropDirective,
    NgxFileUploadComponent,
    MenuAccessDirective
  ],

  entryComponents: [ConfirmationModalComponent],
  exports: [
    CommonModule,
    LoaderComponent,
    NgbModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    ToastComponent,
    ConfirmationModalComponent,
    PaginationControlComponent,
    NgSelectModule,
    HasPermissionsDirective,
    
    DropDownComponent,
    TextBoxComponent,
    YesNoPipe,
    GuiGridModule,
    DataTableShellComponent,
    CellComponent,
    PlaceholderDirective,
    DataTableBaseComponent,
    FormlyBootstrapModule,
    FormlyModule,
    CurrentUserComponent,
    ColumnManagerShellComponent,
    ConfirmationShellComponent,
    NgMultiSelectComponent,
    RecurringFrequencyComponent,
    CopyLinkComponent,
    CardDashboardComponent,
    TableDashboardComponent,
    ServerResponseMessagesComponent,
    FormStatusComponent,
    ViewTableComponent,
    PanelWrapperComponent,
    ComponentAccessComponent,
    MenuAccessLinkDirective,
    HtmlEditorComponent,
    LastSavedComponent,
    FileUploadComponent,
    FileUploadModule,
    NgxFileUploadComponent,
    MenuAccessDirective

    // GoogleChartsModule
    // HumanizePipe
  ],
  providers: [DatePipe, YesNoPipe, NavigationService]
})
export class SharedModule {}
