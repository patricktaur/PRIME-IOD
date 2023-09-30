import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  isProd: boolean | true = environment.production;
  //errorPwdLogin: string | undefined;
  //errorEMailTokenLogin: string | undefined;
  // loginForm!: FormGroup;
  // pwdForm!: FormGroup;
  //emailLoginForm!: FormGroup;

  //Login thru mobile number - not working - development incomplete.
  displayPhoneNumberLogin: boolean = false;

  isLoading = false;
  // canSendOTP: boolean = true;
  // canEnterOTP: boolean = false;
  // canEnterEMail: boolean = true;
  // canSubmitEMailToken: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService
  ) {
    //this.createOTPForm();
    //this.createPwdForm();
    //this.createEMailLoginForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  // verifyOTP() {
  //   this.authenticationService.verifyOTP(this.loginForm.value.password, this.loginForm.value.username).subscribe((res: any) => {
  //     if(res) {
  //       alert("OTP verified");
  //     }
  //     else {
  //       alert("Invalid OTP. Enter valid OTP");
  //     }
  //   });
  // }
}
