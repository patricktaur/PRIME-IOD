import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Logger } from '../logger.service';
import { CredentialsService } from './credentials.service';
import { environment } from '@env/environment';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | any  {
    // if (this.credentialsService.isWinAuthenticated()) {

    if (this.credentialsService.isAuthenticated()) {
      let permissionValue = route.data['permission'] as string;
      let routeName = route.data['name'] as string;

      if (permissionValue) {
        if (this.credentialsService.userPermissionValues.indexOf(permissionValue) > -1) {
          return true;
        }
        let message = 'You do not have permission to access: ' + routeName;
        this.router.navigate(['no-access', { message: message }]);

        return false;
      }

      return true;
    }
    console.log('IsLogged In:' + this.credentialsService.isLoggedIn);

    log.debug('Not authenticated, redirecting and adding redirect url...');
    log.debug('loginMode:' + environment.loginMode);

    if (environment.loginMode == 'win') {
      // this.authenticationService.winLogin();
      // this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });

      this.authenticationService.winLogin().subscribe(
        res => {
          // this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
          // return true;

          // console.log('url:' + state.url);
          if (state.url) {
            // this.router.navigate([state.url]);
            //imp: byUrl -
            //when pasted on a NEW browser window queryparams are unddefined if called via router.navigate
            this.router.navigateByUrl(state.url);
          } else {
            this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
          }
          return true;
        },
        err => {
          console.log('Login Error1:' + JSON.stringify(err));
          console.log('Login Error2:' + JSON.stringify(err.error.error_description));
          let errorMsg = err.error.errorDescription; //err.error.error_description;
          this.router.navigate(['/not-registered', { error: errorMsg }]);

          return false;
        }
      );
    }

    if (environment.loginMode == 'pwd') {
      this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
      return false;
    }

    let error = 'environment value for loginMode invalid :' + environment.loginMode;
    console.log(error);

    /****  Surekha Added */ 
    // return false;
    /****  */
    log.debug(error);
  }
}
