import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SharedCompsModule } from '@app/prism/shared-comps/shared-comps.module';
import { LogDetailsRoutingModule } from './logdetails-routing.module';
import { LogdetailsContainerComponent } from './logdetails-container/logdetails-container.component';
import { ErrorLogListComponent } from './error-log/error-log-list/error-log-list.component';
import { ErrorLogFilterComponent } from './error-log/error-log-filter/error-log-filter.component';
import { ErrorLogEditComponent } from './error-log/error-log-edit/error-log-edit.component';
import { LoginDetailsLogFilterComponent } from './login-details-log/login-details-log-filter/login-details-log-filter.component';
import { LoginDetailsLogListComponent } from './login-details-log/login-details-log-list/login-details-log-list.component';
import { LoginDetailsLogEditComponent } from './login-details-log/login-details-log-edit/login-details-log-edit.component';
import { MailLogListComponent } from './mail-log/mail-log-list/mail-log-list.component';
import { MailLogFilterComponent } from './mail-log/mail-log-filter/mail-log-filter.component';
import { MailLogEditComponent } from './mail-log/mail-log-edit/mail-log-edit.component';

@NgModule({
  declarations: [
    LogdetailsContainerComponent,
    ErrorLogListComponent,
    ErrorLogFilterComponent,
    ErrorLogEditComponent,
    LoginDetailsLogFilterComponent,
    LoginDetailsLogListComponent,
    LoginDetailsLogEditComponent,
    MailLogListComponent,
    MailLogFilterComponent,
    MailLogEditComponent
  ],
  imports: [CommonModule, SharedModule, SharedCompsModule, RouterModule, LogDetailsRoutingModule]
})
export class LogDetailsModule {}
