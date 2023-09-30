import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { CredentialsService } from '@app/core/authentication/credentials.service';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

interface Permission {
  compCode: string;
  status: number;
  title: number;
  mode: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppCompMenuPermissionsServiceBak implements OnInit {
  private appCompPermissions: Permission[] | null = null;
  private appMenuPermissions: Permission[] | null = null;
  private userId: any = undefined;

  constructor(private http: HttpClient, private credSerivce: CredentialsService) {
    this.userId = this.credSerivce.currentUser.id;
  }

  ngOnInit(): void {}

  getAppCompPermissions(): Observable<Permission[]> {
    if (this.appCompPermissions) {
      return of(this.appCompPermissions);
    } else {
      return this.loadPermissions().pipe(
        map(response => {
          this.appCompPermissions = response.appCompPermissions;
          this.appMenuPermissions = response.appMenuPermissions;
          return this.appCompPermissions;
        })
      );
    }
  }

  getAppMenuPermissions(): Observable<Permission[]> {
    if (this.appMenuPermissions) {
      return of(this.appMenuPermissions);
    } else {
      return this.loadPermissions().pipe(
        map(response => {
          this.appCompPermissions = response.appCompPermissions;
          this.appMenuPermissions = response.appMenuPermissions;
          return this.appMenuPermissions;
        })
      );
    }
  }

  getCompPermissionByCompCode(compCode: string): Observable<Permission | undefined> {
    if (!this.appCompPermissions) {
      return this.getAppCompPermissions().pipe(
        map(permissions => {
          return permissions.find(permission => permission.compCode === compCode);
        })
      );
    } else {
      return of(this.appCompPermissions.find(permission => permission.compCode === compCode));
    }
  }

  getMenuPermissionByMenuCode(menuCode: string): Observable<Permission | undefined> {
    if (!this.appMenuPermissions) {
      return this.getAppMenuPermissions().pipe(
        map(permissions => {
          return permissions.find(permission => permission.compCode === menuCode);
        })
      );
    } else {
      return of(this.appMenuPermissions.find(permission => permission.compCode === menuCode));
    }
  }

  reloadPermissions(): void {
    this.appCompPermissions = null;
    this.appMenuPermissions = null;
  }

  private loadPermissions(): Observable<{ appCompPermissions: Permission[]; appMenuPermissions: Permission[] }> {
    let api = `${environment.serverUrl}/api/AppComponent/app-comp-menu-permissions/${this.userId}`;
    return this.http.get<{ appCompPermissions: Permission[]; appMenuPermissions: Permission[] }>(api);
  }
}
