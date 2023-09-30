// //Not tested:
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { finalize } from 'rxjs/operators';

// import { environment } from '@env/environment';
// import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';
// import { ToastService } from '@app/shared/services/toast.service';

// const log = new Logger('Login');

// @Component({
//   selector: 'app-sms-otp-login',
//   templateUrl: './sms-otp-login.component.html',
//   styleUrls: ['./sms-otp-login.component.css']
// })
// export class SmsOtpLoginComponent implements OnInit, OnDestroy {
//   isLoading = false;
//   loginForm!: FormGroup;
//   //displayPhoneNumberLogin: boolean = false;
//   tokenGenerated: boolean = false;

//   //canEnterOTP: boolean = false;
//   //canSendOTP: boolean = true;

//   errorOTPLogin: string | undefined;
//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     private formBuilder: FormBuilder,
//     private i18nService: I18nService,
//     private authenticationService: AuthenticationService,
//     private toastService: ToastService
//   ) {
//     this.createOTPForm();
//   }

//   ngOnInit() {}

//   ngOnDestroy() {}
//   private createOTPForm() {
//     this.loginForm = this.formBuilder.group({
//       // username: ['admin', Validators.required],
//       // password: ['tempP@ss123', Validators.required],
//       // remember: true
//       username: new FormControl('', [
//         Validators.required,
//         Validators.minLength(10),
//         Validators.maxLength(10),
//         Validators.pattern('[0-9]*')
//       ]),
//       password: new FormControl('', [Validators.required]),
//       remember: new FormControl(true)
//     });
//   }

//   reLogin() {
//     this.tokenGenerated = false;
//     this.loginForm.reset;
//   }

//   sendOTP() {
//     // this.authenticationService.sendOTP(this.loginForm.value.username).subscribe((res: any) => {
//     //   if (res) {
//     //     console.log('OTP sent');
//     //     this.canSendOTP = false;
//     //     this.canEnterOTP = true;
//     //   } else {
//     //     console.log('Failed to send OTP');
//     //   }
//     // });

//     this.authenticationService.sendOTP(this.loginForm.value.username).subscribe(
//       res => {
//         this.tokenGenerated = true;
//         this.toastService.show('OTP sent to your number  ' + this.loginForm.value.username, {
//           classname: 'bg-success text-light',
//           delay: 3000
//         });
//       },
//       err => {
//         this.errorOTPLogin = 'OTP could not be generated. ' + err.error.error_description;
//       }
//     );
//   }

//   login(loginForm: FormGroup) {
//     this.isLoading = true;
//     const login$ = this.authenticationService.pwdLogin(loginForm.value);
//     login$
//       .pipe(
//         finalize(() => {
//           loginForm.markAsPristine();
//           this.isLoading = false;
//         }),
//         untilDestroyed(this)
//       )
//       .subscribe(
//         (credentials: any) => {
//           log.debug(`${credentials.username} successfully logged in`);
//           this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
//         },
//         (error: any) => {
//           log.debug(`Login error: ${error}`);
//           this.errorOTPLogin = error.error.error_description;
//         }
//       );
//   }
// }
