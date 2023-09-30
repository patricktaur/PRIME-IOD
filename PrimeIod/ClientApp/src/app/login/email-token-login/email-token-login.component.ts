// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';

// import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';
// import { finalize } from 'rxjs/operators';
// import { ToastService } from '@app/shared/services/toast.service';

// const log = new Logger('Login');

// @Component({
//   selector: 'app-email-token-login',
//   templateUrl: './email-token-login.component.html',
//   styleUrls: ['./email-token-login.component.css']
// })
// export class EmailTokenLoginComponent implements OnInit, OnDestroy {
//   isLoading = false;
//   errorEMailTokenLogin: string | undefined;
//   emailLoginForm!: FormGroup;
//   tokenGenerated: boolean = false;

//   canEnterEMail: boolean = true;
//   canSubmitEMailToken: boolean = false;
//   userRoles: any;
//   noRolesAssigned: boolean;
//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     private formBuilder: FormBuilder,
//     private i18nService: I18nService,
//     private authenticationService: AuthenticationService,
//     private toastService: ToastService
//   ) {
//     this.createEMailLoginForm();
//   }

//   ngOnInit() {}

//   ngOnDestroy() {}

//   private createEMailLoginForm() {
//     this.emailLoginForm = this.formBuilder.group({
//       username: new FormControl('', [Validators.required, Validators.email]),
//       password: new FormControl('', [
//         Validators.required,
//         Validators.min(0),
//         Validators.max(999999),
//         Validators.minLength(6)
//       ]),
//       remember: new FormControl(true),
//       role: ['all', Validators.required]
//     });

//     this.emailLoginForm.valueChanges.subscribe(() => {
//       this.errorEMailTokenLogin = '';
//     });
//   }

//   reLogin() {
//     this.tokenGenerated = false;
//     this.emailLoginForm.reset;
//   }
//   generateEMailToken() {
//     // this.authenticationService.generateToken(this.emailLoginForm.value.username, '').subscribe((res: any) => {
//     //   if (res) {
//     //     //console.log('OTP sent');
//     //     this.canEnterEMail = false;
//     //     this.canSubmitEMailToken = true;
//     //   } else {
//     //     this.errorEMailTokenLogin =
//     //       'Failed to generate token.  Confirm that the email is correct and it is registered. ';
//     //     console.log('Failed to generate Token');
//     //   }
//     // });

//     this.authenticationService.generateToken(this.emailLoginForm.value.username, '').subscribe(
//       res => {
//         this.userRoles = res;
//         if (this.userRoles) {
//           this.tokenGenerated = true;
//           this.toastService.show('Token sent to your email ' + this.emailLoginForm.value.username, {
//             classname: 'bg-success text-light',
//             delay: 3000
//           });
//           this.userRoles = res;
//           console.log('res: ' + JSON.stringify(res));
//         } else {
//           this.noRolesAssigned = true;
//         }
//       },
//       err => {
//         this.errorEMailTokenLogin = 'Token could not be generated. ' + err.error.error_description;
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
//           this.toastService.show('Login request successful.', { classname: 'bg-success text-light', delay: 3000 });

//           this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
//         },
//         (error: any) => {
//           log.debug(`Login error: ${error}`);
//           this.errorEMailTokenLogin = error.error.error_description;
//         }
//       );
//   }
// }
