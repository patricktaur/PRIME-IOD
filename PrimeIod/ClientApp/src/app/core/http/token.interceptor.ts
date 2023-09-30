import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';

import { CredentialsService } from '@app/core/authentication/credentials.service';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Router } from '@angular/router';
import { untilDestroyed } from '@app/core';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  private taskPauser: Subject<any> | null = new Subject();
  private isRefreshingLogin: boolean = false;

  constructor(
    public cred: CredentialsService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.cred.isLoggedIn) {
      request = request.clone({
        setHeaders: {
          //Authorization: `Bearer ${this.cred.credentials.token}`

          Authorization: `Bearer ${this.cred.accessToken}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          return this.refreshAuthToken(err, () => this.intercept(request, next));
          //this.attemptReloginWithRefreshToken();
          //this.router.navigate(['/login']);
        }
        if (err.status === 403) {
          this.router.navigate(['/no-access']);
        }

        //const error = err.error.message || err.statusText;
        const error = err; //err.error || err.statusText;
        return throwError(error);
      })
    );

    //return next.handle(request);
  }

  protected refreshAuthToken(error: any, continuation: () => Observable<any>) {
    let loginUrl = '/connect/token-combo';
    if (error.status == 401) {
      if (this.isRefreshingLogin) {
        return this.pauseTask(continuation);
      }

      this.isRefreshingLogin = true;

      return this.authenticationService.refreshLogin().pipe(
        mergeMap(data => {
          this.isRefreshingLogin = false;
          this.resumeTasks(true);

          return continuation();
        }),
        catchError(refreshLoginError => {
          this.isRefreshingLogin = false;
          this.resumeTasks(false);

          if (
            refreshLoginError.status == 401 ||
            (refreshLoginError.url && refreshLoginError.url.toLowerCase().includes(loginUrl.toLowerCase()))
          ) {
            this.authenticationService.reLogin();
            return throwError('session expired');
          } else {
            return throwError(refreshLoginError || 'server error');
          }
        })
      );
    }
    //for testing, to be from single source, declared in authenti...service.ts

    if (error.url && error.url.toLowerCase().includes(loginUrl.toLowerCase())) {
      this.authenticationService.reLogin();

      return throwError(
        error.error && error.error.error_description
          ? `session expired (${error.error.error_description})`
          : 'session expired'
      );
    } else {
      return throwError(error);
    }
  }

  private pauseTask(continuation: () => Observable<any>) {
    if (!this.taskPauser) this.taskPauser = new Subject();

    return this.taskPauser.pipe(
      switchMap(continueOp => {
        return continueOp ? continuation() : throwError('session expired');
      })
    );
  }

  private resumeTasks(continueOp: boolean) {
    setTimeout(() => {
      if (this.taskPauser) {
        this.taskPauser.next(continueOp);
        this.taskPauser.complete();
        this.taskPauser = null;
      }
    });
  }
}
