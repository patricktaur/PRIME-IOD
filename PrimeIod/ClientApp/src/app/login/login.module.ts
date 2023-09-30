import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
// import { EmailTokenLoginComponent } from './email-token-login/email-token-login.component';
// import { UserNamePwdLoginComponent } from './user-name-pwd-login/user-name-pwd-login.component';
// import { SmsOtpLoginComponent } from './sms-otp-login/sms-otp-login.component';
import { NotRegisteredComponent } from './not-registered/not-registered.component';
import { LogOutComponent } from '@app/login/log-out/log-out.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, NgbModule, LoginRoutingModule],
  declarations: [
    LoginComponent,
    // EmailTokenLoginComponent,
    // UserNamePwdLoginComponent,
    // SmsOtpLoginComponent,
    NotRegisteredComponent,
    LogOutComponent
  ]
})
export class LoginModule {}
