// import { Component, OnInit, OnDestroy, Input } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { finalize } from 'rxjs/operators';

// import { environment } from '@env/environment';
// import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';

// const log = new Logger('Login');
// @Component({
//   selector: 'app-user-name-pwd-login',
//   templateUrl: './user-name-pwd-login.component.html',
//   styleUrls: ['./user-name-pwd-login.component.css']
// })
// export class UserNamePwdLoginComponent implements OnInit, OnDestroy {
//   @Input() envIsProd: boolean = true;
//   isLoading = false;
//   errorPwdLogin: string | undefined;
//   pwdForm!: FormGroup;
//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     private formBuilder: FormBuilder,
//     private i18nService: I18nService,
//     private authenticationService: AuthenticationService
//   ) {
//     this.createPwdForm();
//   }

//   ngOnInit() {
//     if (this.envIsProd == false) {
//       this.fillDetaultValues();
//     }
//   }

//   ngOnDestroy() {}

//   private createPwdForm() {
//     this.pwdForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//       remember: true,
//       role: ['all', Validators.required]
//     });
//   }
//   //this.roleForm.patchValue(role);

//   private fillDetaultValues() {
//     console.log('Inside fillDetaultValues');
//     this.pwdForm.setValue({
//       username: 'admin',
//       password: 'tempP@ss123',
//       remember: true,
//       role: 'all'
//     });
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
//           this.errorPwdLogin = error.error.error_description;
//         }
//       );
//   }
// }
