// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { map } from 'rxjs/operators';

// import { environment } from '@env/environment';
// import { Credentials, CredentialsService } from './credentials.service';
// import { LoginResponse } from '@app/core/models/login-response.model';
// import { User } from '../models/user.model';
// import { Router } from '@angular/router';
// import { LocalStoreManager } from '@app/core/services/local-store-manager.service';
// import { DBkeys } from '@app/core/services/db-keys';

// /**
//  * Provides a base for authentication workflow.
//  * The login/logout methods should be replaced with proper implementation.
//  */
// @Injectable({
//   providedIn: 'root'
// })
// export class WinAuthenticationService {
//   public reLoginDelegate: () => void;

//   constructor(
//     private credentialsService: CredentialsService,
//     private http: HttpClient,
//     private router: Router,
//     private localStorage: LocalStoreManager
//   ) {}

//   private get loginUrl() {
//     return `${environment.serverUrl}/connect/token-combo`;
//   }

//   private get winAuthUrl() {
//     return `${environment.serverUrl}/connect/win-auth`;
//   }

//   winLogin(){

//     // header.append("Content-Type", "application/json");

//     let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
//     let params = new HttpParams()
//        .append('username', 'win')
//        .append('password', 'auth')
//       .append('grant_type', 'password')
//       .append('scope', 'openid email phone profile offline_access roles')
//       // .append('role', context.role)
//        .append("withCredentials", "true")
//       ;

//     let requestBody = params.toString();

//     console.log("YYYY");
//     return this.http
//       .post<LoginResponse>(this.loginUrl, requestBody, { headers: header })
//       .pipe(
//         map(data => {
//           // store user details and jwt token in local storage to keep user logged in between page refreshes
//           console.log("ZZZZ");
//           this.credentialsService.setCredentials(data, true);

//           // return data;
//           return true;
//         })
//       );
//   }

//   refreshLogin() {
//     //console.log("inside refresh login:")
//     let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

//     let params = new HttpParams()
//       .append('refresh_token', this.credentialsService.refreshToken)
//       .append('grant_type', 'refresh_token')
//       .append('scope', 'openid email phone profile offline_access roles')
//       .append('role', this.credentialsService.selectedRole);

//     let requestBody = params.toString();

//     return this.http
//       .post<LoginResponse>(this.loginUrl, requestBody, { headers: header })
//       .pipe(
//         map(data => {
//           // store user details and jwt token in local storage to keep user logged in between page refreshes
//           this.credentialsService.setCredentials(
//             data,
//             this.credentialsService.rememberMe
//           );
//           //console.log("Relogin data:" + JSON.stringify(data));
//           return data;
//         })
//       );

//     // return this.endpointFactory.getRefreshLoginEndpoint<LoginResponse>().pipe(
//     //   map(response => this.processLoginResponse(response, this.rememberMe)));
//   }

//   reLogin() {
//     this.localStorage.deleteData(DBkeys.TOKEN_EXPIRES_IN);

//     if (this.reLoginDelegate) {
//       this.reLoginDelegate();
//     } else {
//       this.redirectForLogin();
//     }
//   }

//   redirectForLogin() {
//     //this.loginRedirectUrl = this.router.url;
//     //this.router.navigate([this.loginUrl]);
//     console.log("redirectForLogin");
//     this.router.navigate(['/login']);
//   }

//   getCurrentUser(accessToken: string) {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         Authorization: 'Bearer ' + accessToken,
//         'Content-Type': 'application/json'
//       })
//     };

//     const api = `${environment.serverUrl}/api/account/users/me`;
//     return this.http.get(api, httpOptions).pipe(response => {
//       return response;
//     });
//   }

//   sendOTP(phoneNumber: string) {
//     return this.http.get(`${environment.serverUrl}/api/message/send-otp?phoneNumber=${phoneNumber}`).pipe(res => {
//       return res;
//     });
//   }

//   // verifyOTP(otp: string, phoneNumber: string) {
//   //   let api = `${environment.serverUrl}/api/message/verify-otp?otp=${otp}&phoneNumber=${phoneNumber}`;
//   //   console.log(api);
//   //   return this.http.get(api).pipe(res => {
//   //     return res;
//   //   });
//   // }

//   generateToken(email: string, returnUrl: string) {
//     returnUrl = `${environment.serverUrl}/connect/token-combo`;
//     const api = `${environment.serverUrl}/api/account/generate-token?email=${email}&returnUrl=${returnUrl}`;
//     return this.http.get(api).pipe(res => {
//       return res;
//     });
//   }

//   /**
//    * Logs out the user and clear credentials.
//    * @return True if the user was logged out successfully.
//    */
//   logout(): Observable<boolean> {
//     // Customize credentials invalidation here
//     //todo uncomment:
//     //this.credentialsService.setCredentials();
//     this.credentialsService.logout();
//     return of(true);
//   }
// }
