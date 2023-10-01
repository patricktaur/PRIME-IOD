import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginResponse, IdToken } from '@app/core/models/login-response.model';
import { User } from '@app/core/models/user.model';
import { PermissionValues } from '@app/core/models/permission.model';
import { JwtHelper } from '@app/core/authentication/jwt-helper';
import { LocalStoreManager } from '@app/core/services/local-store-manager.service';
import { DBkeys } from '@app/core/services/db-keys';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { Json2CsvDownloadService } from '@app/shared/services/json-2-csv-download.service';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

const credentialsKey = 'credentials';

export interface AssignedUser {
  userid: string | null;
  username: string | null;
  isAdmin: boolean;
  trainingSessionId: number;
}

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private _credentials: Credentials | null = null;
  private previousIsLoggedInCheck = false;
  private _loginStatus = new Subject<boolean>();

  assignedUser: AssignedUser = {
    userid: null,
    username: null,
    isAdmin: false,
    trainingSessionId: 0
  };

  constructor(private localStorage: LocalStoreManager) {
    // const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    // if (savedCredentials) {
    //   this._credentials = JSON.parse(savedCredentials);
    //}

    this.initializeLoginStatus();
  }

  private initializeLoginStatus() {
    this.localStorage.getInitEvent().subscribe(() => {
      this.reevaluateLoginStatus();
    });
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    //return this.isLoggedIn;
    //return !!this.credentials;
    return this.currentUser != null;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  setAssignedTo(userid: string, username: string, isAdmin: boolean, trainingSessionId: number) {
    this.assignedUser = {
      userid: userid,
      username: username,
      isAdmin: isAdmin,
      trainingSessionId: trainingSessionId
    };
  }

  clearAssignedTo() {
    this.assignedUser = {
      userid: null,
      username: null,
      isAdmin: false,
      trainingSessionId: 0
    };
  }

  testAuthenticated: boolean = false;
  SaveWinUserDetails(userNroles: any) {
    let user = new User(
      userNroles.id,
      userNroles.displayName,
      userNroles.displayName,
      userNroles.emailId,
      'userNroles.jobtitle',
      'userNroles.phone'
    );
    // console.log('credentials : line 171');
    this.testAuthenticated = true;
    this.saveUserDetails(
      user,
      userNroles,
      // userNroles.roles,
      // userNroles.permissions,
      'accessToken',
      'idToken',
      'refreshToken',
      null,
      false
    );
  }
  isWinAuthenticated(): boolean {
    console.log('this.currentUser :' + JSON.stringify(this.currentUser));
    return this.currentUser != null;
    // return this.testAuthenticated;
  }

  private saveUserDetails(
    user: User,
    userNRoles: any,
    //roles: number[],
    //permissions: PermissionValues[],
    accessToken: string,
    idToken: string,
    refreshToken: string,
    expiresIn: Date | null,
    rememberMe: boolean
  ) {
    let roles = userNRoles.roles;

    let resourceRoles: any[] = userNRoles.resourceRoles.map(function(e: any) {
      return 'res.' + UserRoles[e];
    });

    let rolePermissions: any[] = userNRoles.roles.map(function(e: any) {
      return 'role.' + UserRoles[e];
    });

    let mergedRolesPermissions = userNRoles.permissions.concat(rolePermissions);

    let mergedPermissions: any;
    mergedPermissions = mergedRolesPermissions.concat(resourceRoles);

    if (rememberMe) {
      this.localStorage.savePermanentData(accessToken, DBkeys.ACCESS_TOKEN);
      this.localStorage.savePermanentData(idToken, DBkeys.ID_TOKEN);
      this.localStorage.savePermanentData(refreshToken, DBkeys.REFRESH_TOKEN);
      this.localStorage.savePermanentData(expiresIn, DBkeys.TOKEN_EXPIRES_IN);
      this.localStorage.savePermanentData(mergedPermissions, DBkeys.USER_PERMISSIONS);
      this.localStorage.savePermanentData(user, DBkeys.CURRENT_USER);
      this.localStorage.savePermanentData(roles, DBkeys.USER_ROLES);
      this.localStorage.savePermanentData(userNRoles.componentPermissions, DBkeys.COMPONENT_PERMISSIONS);
      this.localStorage.savePermanentData(userNRoles.menuPermissions, DBkeys.MENU_PERMISSIONS);
    } else {
      this.localStorage.saveSyncedSessionData(accessToken, DBkeys.ACCESS_TOKEN);
      this.localStorage.saveSyncedSessionData(idToken, DBkeys.ID_TOKEN);
      this.localStorage.saveSyncedSessionData(refreshToken, DBkeys.REFRESH_TOKEN);
      this.localStorage.saveSyncedSessionData(expiresIn, DBkeys.TOKEN_EXPIRES_IN);
      this.localStorage.saveSyncedSessionData(mergedPermissions, DBkeys.USER_PERMISSIONS);
      this.localStorage.saveSyncedSessionData(user, DBkeys.CURRENT_USER);
      this.localStorage.saveSyncedSessionData(roles, DBkeys.USER_ROLES);

      this.localStorage.saveSyncedSessionData(userNRoles.componentPermissions, DBkeys.COMPONENT_PERMISSIONS);
      this.localStorage.saveSyncedSessionData(userNRoles.menuPermissions, DBkeys.MENU_PERMISSIONS);
    }
    console.log('credentials : line 237');
    // this.localStorage.savePermanentData(rememberMe, DBkeys.REMEMBER_ME);
  }

  logout(): void {
    this.localStorage.deleteData(DBkeys.ACCESS_TOKEN);
    this.localStorage.deleteData(DBkeys.ID_TOKEN);
    this.localStorage.deleteData(DBkeys.REFRESH_TOKEN);
    this.localStorage.deleteData(DBkeys.TOKEN_EXPIRES_IN);
    this.localStorage.deleteData(DBkeys.USER_PERMISSIONS);
    this.localStorage.deleteData(DBkeys.CURRENT_USER);
    this.localStorage.deleteData(DBkeys.SELECTED_ROLE);

    this.localStorage.deleteData(DBkeys.COMPONENT_PERMISSIONS);
    this.localStorage.deleteData(DBkeys.MENU_PERMISSIONS);

    //this.configurations.clearLocalChanges();

    this.reevaluateLoginStatus();
  }

  private reevaluateLoginStatus(currentUser?: User) {
    let user = currentUser || this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);
    let isLoggedIn = user != null;

    if (this.previousIsLoggedInCheck != isLoggedIn) {
      setTimeout(() => {
        this._loginStatus.next(isLoggedIn);
      });
    }

    this.previousIsLoggedInCheck = isLoggedIn;
  }

  getLoginStatusEvent(): Observable<boolean> {
    return this._loginStatus.asObservable();
  }

  get currentUser(): User {
    let user: any = this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);
    this.reevaluateLoginStatus(user);

    return user;
  }

  get userPermissions(): PermissionValues[] {
    return this.localStorage.getDataObject<PermissionValues[]>(DBkeys.USER_PERMISSIONS) || [];
  }

  get userPermissionValues() {
    return this.localStorage.getDataObject<any[]>(DBkeys.USER_PERMISSIONS) || [];
  }

  get userRoles() {
    return this.localStorage.getDataObject<any[]>(DBkeys.USER_ROLES) || [];
  }

  userHasPermission(permissionValue: any): boolean | null {
    if (permissionValue) {
      let permissionValues = permissionValue.split(',').map(function(item: any) {
        return item.trim();
      }) as string[];
      let hasPermisson = this.userPermissionValues
        .map(v => v.toLowerCase())
        .some(r => permissionValues.map((x: any) => x.toLowerCase()).includes(r));
      if (hasPermisson) {
        //exact match:
        return true;
      } else {
        if (permissionValues.indexOf('*') > -1) {
          //// also has one or ore permissions : if (permissionValue)
          return true;
        }

        if (permissionValues.indexOf('rol.*') > -1) {
          if (this.userPermissionValues.filter(x => x.startsWith('rol.').count > 0)) {
            return true;
          }
        }

        if (permissionValues.indexOf('res.*') > -1) {
          if (this.userPermissionValues.filter(x => x.startsWith('res.').count > 0)) {
            return true;
          }
        }

        return false;
      }
    } else {
      return null;
    }
  }

  userHasResourcePermission(studyId: number, resourceEnum: UserRoles): boolean {
    var permissionValue = `res.${studyId}.${resourceEnum}`;
    if (this.userPermissionValues.indexOf(permissionValue) > -1) {
      return true;
    }
    return false;
  }

  userHasRolePermission(resourceEnum: UserRoles): boolean {
    var permissionValue = `rol.${resourceEnum}`;
    if (this.userPermissionValues.indexOf(permissionValue) > -1) {
      return true;
    }
    return false;
  }

  userHasStudyResourcePermission(studyId: number, menuPath: any): boolean {
    var menuPermission = this.getMenuPermission(menuPath);

    if(menuPermission) {
      const componentCode = menuPermission.componentCode;

      const componentPermission = this.getCompPermission(componentCode);

      if ( componentPermission?.studiesPermitted?.length > 0) {
        const studyPermitted = componentPermission.studiesPermitted.find((s : any) => s.studyId === studyId);
        if(studyPermitted) {
          return true
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get accessToken(): string {
    this.reevaluateLoginStatus();

    return this.localStorage.getData(DBkeys.ACCESS_TOKEN);
  }

  get accessTokenExpiryDate(): Date | null {
    this.reevaluateLoginStatus();
    return this.localStorage.getDataObject<Date>(DBkeys.TOKEN_EXPIRES_IN, true);
  }

  get isSessionExpired(): boolean {
    if (this.accessTokenExpiryDate == null) {
      return true;
    }

    return !(this.accessTokenExpiryDate.valueOf() > new Date().valueOf());
  }

  get idToken(): string {
    this.reevaluateLoginStatus();
    return this.localStorage.getData(DBkeys.ID_TOKEN);
  }

  get compPermissions() {
    return this.localStorage.getDataObject<any[]>(DBkeys.COMPONENT_PERMISSIONS) || [];
  }

  getCompPermission(compCode: string) {
    return this.compPermissions.find((x: any) => x.compCode === compCode);
  }

  get menuPermissions() {
    return this.localStorage.getDataObject<any[]>(DBkeys.MENU_PERMISSIONS) || [];
  }

  getMenuPermission(menuId: string) {
    return this.menuPermissions.find((x: any) => x.menuPath === menuId);
  }

  hasMenuPermission(menuId: string) {
    return Boolean(this.menuPermissions.find((x: any) => x.menuPath === menuId));
  }

  get refreshToken(): string {
    this.reevaluateLoginStatus();
    return this.localStorage.getData(DBkeys.REFRESH_TOKEN);
  }

  get isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  get rememberMe(): boolean {
    return this.localStorage.getDataObject<boolean>(DBkeys.REMEMBER_ME) == true;
  }

  get selectedRole(): string {
    return this.localStorage.getData(DBkeys.SELECTED_ROLE);
  }
  //==============Read:
}
