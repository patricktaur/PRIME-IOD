import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Credentials, CredentialsService } from './credentials.service';
import { LoginResponse } from '@app/core/models/login-response.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { LocalStoreManager } from '@app/core/services/local-store-manager.service';
import { DBkeys } from '@app/core/services/db-keys';
import { AppCompMenuPermissionsService } from './app-comp-menu-permissions.service';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
  role?: string;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public reLoginDelegate!: () => void;

  constructor(
    private credentialsService: CredentialsService,
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStoreManager,
    private appCompMenuPermissionsService: AppCompMenuPermissionsService
  ) {}

  private get loginUrl() {
    return `${environment.serverUrl}/connect/token-combo`;
  }

  private get winAuthUrl() {
    return `${environment.winAuthUrl}/connect/token-combo`;
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  // pwdLogin(context: LoginContext) {
  //   let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   let params = new HttpParams()
  //     .append('username', context.username)
  //     .append('password', context.password)
  //     .append('grant_type', 'password')
  //     .append('scope', 'openid email phone profile offline_access roles')
  //     .append('role', context.role);

  //   let requestBody = params.toString();
  //   console.log('params: ' + requestBody);
  //   //const api = `${environment.serverUrl}/connect/token-combo`;

  //   return this.http
  //     .post<LoginResponse>(this.loginUrl, requestBody, { headers: header })
  //     .pipe(
  //       map(data => {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         this.credentialsService.setCredentials(data, context.remember);

  //         return data;
  //       })
  //     );
  // }

  //Not tested
  // OTPlogin(context: LoginContext): Observable<Credentials> {
  //   // Replace by proper authentication call
  //   let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   let params = new HttpParams()
  //     .append('username', context.username)
  //     .append('password', context.password)
  //     .append('grant_type', 'password')
  //     .append('scope', 'openid email phone profile offline_access roles');

  //   let requestBody = params.toString();

  //   return this.http
  //     .post<any>(`${environment.serverUrl}/connect/token-combo`, requestBody, { headers: header })
  //     .pipe(
  //       map(data => {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(data.access_token));

  //         const creddata = {
  //           username: context.username,
  //           token: data.access_token,
  //           user: new User()
  //         };
  //         //todo: uncomment:
  //         //this.credentialsService.setCredentials(creddata, context.remember);
  //         console.log('auth tocken received, stored locally');

  //         this.getCurrentUser(data.access_token).subscribe(user => {
  //           const creddata = {
  //             username: context.username,
  //             token: data.access_token,
  //             user: user
  //           };

  //           //console.log(`logged in user: ${JSON.stringify(user)}`);

  //           //todo: uncomment
  //           //this.credentialsService.setCredentials(creddata, context.remember);
  //         });
  //         return data;
  //       })
  //     );
  // }

  // EMailTokenlogin(context: LoginContext): Observable<Credentials> {
  //   // Replace by proper authentication call
  //   let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   let params = new HttpParams()
  //     .append('username', context.username)
  //     .append('password', context.password)
  //     .append('grant_type', 'password')
  //     .append('scope', 'openid email phone profile offline_access roles')
  //     .append('role', context.role);

  //   let requestBody = params.toString();

  //   return this.http
  //     .post<any>(`${environment.serverUrl}/connect/token-combo`, requestBody, { headers: header })
  //     .pipe(
  //       map(data => {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(data.access_token));

  //         const creddata = {
  //           username: context.username,
  //           token: data.access_token,
  //           user: new User()
  //         };
  //         //todo: uncomment:
  //         //this.credentialsService.setCredentials(creddata, context.remember);
  //         console.log('auth tocken received, stored locally');

  //         this.getCurrentUser(data.access_token).subscribe(user => {
  //           const creddata = {
  //             username: context.username,
  //             token: data.access_token,
  //             user: user
  //           };

  //           //console.log(`logged in user: ${JSON.stringify(user)}`);
  //           //todo: uncomment:
  //           //this.credentialsService.setCredentials(creddata, context.remember);
  //         });
  //         return data;
  //       })
  //     );
  // }

  winLogin() {
    const api = `${environment.serverUrl}/api/WinAuthorization/user-n-permissions/`;

    return this.http.get(api).pipe(
      map((response: any) => {
        console.log('winLogin success');
        this.credentialsService.SaveWinUserDetails(response);

        console.log('After SaveWinUserDetails');
        // this.appCompMenuPermissionsService.reloadPermissions();
        this.appCompMenuPermissionsService.getAppPermissions(response.recId).subscribe(
          permissions => {
            //
          },
          error => {
            console.error('Failed to retrieve app component permissions:', error);
          }
        );

        return response;
      })
    );
  }

  // winLogin() {
  //   //this.credentialsService.testSaveUserDetails();

  //   // const api = `${environment.serverUrl}/win-auth-token`;
  //   const api = `${environment.serverUrl}/Test`;
  //   console.log("api:" + api);
  //   return this.http.get<LoginResponse>(api)
  //   .pipe(
  //     map(data => {
  //       // store user details and jwt token in local storage to keep user logged in between page refreshes
  //       console.log("api:" + JSON.stringify(data));

  //       //this.credentialsService.setCredentials(data, true);
  //       //this.credentialsService.testSaveUserDetails();
  //       return data;
  //       // return true;
  //     })
  //   );
  //   ;

  //  }

  refreshLogin() {
    //to reload credentials ??
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    let params = new HttpParams()
      .append('refresh_token', this.credentialsService.refreshToken)
      .append('grant_type', 'refresh_token')
      .append('scope', 'openid email phone profile offline_access roles')
      .append('role', this.credentialsService.selectedRole);

    let requestBody = params.toString();

    return this.http
      .post<LoginResponse>(this.loginUrl, requestBody, { headers: header })
      .pipe(
        map(data => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // this.credentialsService.setCredentials(data, this.credentialsService.rememberMe);
          this.credentialsService.SaveWinUserDetails(data);

          //console.log("Relogin data:" + JSON.stringify(data));
          return data;
        })
      );
  }

  reLogin() {
    this.localStorage.deleteData(DBkeys.TOKEN_EXPIRES_IN);

    if (this.reLoginDelegate) {
      this.reLoginDelegate();
    } else {
      this.redirectForLogin();
    }
  }

  redirectForLogin() {
    //this.loginRedirectUrl = this.router.url;
    //this.router.navigate([this.loginUrl]);
    console.log('redirectForLogin');
    this.router.navigate(['/login']);
  }

  getCurrentUser(accessToken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      })
    };

    const api = `${environment.serverUrl}/api/account/users/me`;
    return this.http.get(api, httpOptions).pipe(response => {
      return response;
    });
  }

  sendOTP(phoneNumber: string) {
    return this.http.get(`${environment.serverUrl}/api/message/send-otp?phoneNumber=${phoneNumber}`).pipe(res => {
      return res;
    });
  }

  // verifyOTP(otp: string, phoneNumber: string) {
  //   let api = `${environment.serverUrl}/api/message/verify-otp?otp=${otp}&phoneNumber=${phoneNumber}`;
  //   console.log(api);
  //   return this.http.get(api).pipe(res => {
  //     return res;
  //   });
  // }

  generateToken(email: string, returnUrl: string) {
    returnUrl = `${environment.serverUrl}/connect/token-combo`;
    const api = `${environment.serverUrl}/api/account/generate-token?email=${email}&returnUrl=${returnUrl}`;
    return this.http.get(api).pipe(res => {
      return res;
    });
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    //todo uncomment:
    //this.credentialsService.setCredentials();
    this.credentialsService.logout();
    return of(true);
  }
}
