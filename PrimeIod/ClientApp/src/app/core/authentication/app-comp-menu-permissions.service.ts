import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import {MenuPermission} from './app-access-enums';
import {ComponentPermission} from './app-access-enums';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

// interface MenuPermission {
//   menuPath: string;
//   menuStatus: number;
//   title: number;
//   mode: string;
//   ComponentCode: string,
// }

@Injectable({
  providedIn: 'root'
})
export class AppCompMenuPermissionsService implements OnInit {
  private appCompPermissions: MenuPermission[] | null = null;
  private appMenuPermissions: MenuPermission[] | null = null;
  private userId: any = undefined;

  constructor(private http: HttpClient, private credSerivce: CredentialsService) {
    // this.userId = this.credSerivce.currentUser.id;
    this.userId = 2;
  }

  ngOnInit(): void {}

  getAppPermissions(userId: number): Observable<MenuPermission[]> {
    if (this.appCompPermissions) {
      return of(this.appCompPermissions);
    } else {
      return this.loadPermissions(userId).pipe(
        map(response => {
          this.appCompPermissions = response.appCompPermissions;
          this.appMenuPermissions = response.appMenuPermissions;
          return this.appCompPermissions;
        })
      );
    }
  }

  getComponentPermissionsByUserId(userId : number): Observable<{ componentPermission: ComponentPermission[] }> {
    let api = `${environment.serverUrl}/api/AppComponent/app-component-permissions/${userId}`;
    return this.http.get<{ componentPermission: ComponentPermission[]  }>(api);
  }

  

  getCompPermissionByCompCode(compCode: string): Observable<MenuPermission | undefined> {
    if (!this.appCompPermissions) {
      return throwError('appCompPermissions is undefined');
    } else {
      return of(this.appCompPermissions.find(permission => permission.menuPath === compCode));
    }
  }

  getMenuPermissionByMenuCode(menuCode: string): Observable<MenuPermission | undefined> {
    if (!this.appMenuPermissions) {
      return throwError('appMenuPermissions is undefined');
    } else {
      return of(this.appMenuPermissions.find(permission => permission.menuPath === menuCode));
    }
  }

  reloadPermissions(): void {
    this.appCompPermissions = null;
    this.appMenuPermissions = null;
  }

  private loadPermissions(
    userId: number
  ): Observable<{ appCompPermissions: MenuPermission[]; appMenuPermissions: MenuPermission[] }> {
    let api = `${environment.serverUrl}/api/AppComponent/app-comp-menu-permissions/${userId}`;
    return this.http.get<{ appCompPermissions: MenuPermission[]; appMenuPermissions: MenuPermission[] }>(api);
  }
}
