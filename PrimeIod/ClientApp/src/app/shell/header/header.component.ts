import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, CredentialsService, I18nService } from '@app/core';
import { PermissionValues } from '@app/core/models/permission.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  url = '';

  //permissions:
  // homeMenuGroupPermissions = 'rol.*, res.*'; //'TblStudy.view';

  // studyMenuGroupPermissions = 'rol.*, res.*'; //'TblStudy.view';
  // reportsMenuGroupPermissions = 'rol.*, res.*'; //'reports.view, reports.study.review.compliance, reports.study.omr';

  // requestsMernuGroupPermissions = 'reportsXX.view';
  // masterMenuGroupPermissions = 'task-category.view, TblAnnouncements.view';

  // appAdminMenuGroupPermissions = 'users.view, users.manage, roles.view, roles.manage, roles.assign';

  // requestPermissions =
  //   'rol.Admin, rol.DMPM_manager, rol.DMPM_oversight, rol.DMPM, rol.CDMS Manager, rol.CDS Manager, rol.IMI_TPM';

  reportsMenuVisible : boolean = false;
  
    constructor(
    public router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    this.reportsMenuVisible = this.credentialsService.hasMenuPermission("reports")
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    switch (environment.loginMode) {
      case 'pwd': {
        this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
        break;
      }
      case 'win': {
        this.authenticationService.logout().subscribe(() => this.router.navigate(['/log-out'], { replaceUrl: true }));

        break;
      }
      default: {
        this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
        break;
      }
    }

    this.credentialsService.clearAssignedTo();
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get userEmail(): string | undefined {
    const currentUser = this.credentialsService.currentUser;
    try{
        return currentUser.email;
    }
    catch(e){
      return "";
    }
  }
  get username(): string | undefined {
    const currentUser = this.credentialsService.currentUser;

    return currentUser.userName;
  }

  userHasPermission(permissionValue: PermissionValues): boolean {
    return this.permissions.some((p: any) => p == permissionValue);
  }

  hasPermission(permission: string) {
    return this.credentialsService.userPermissionValues.includes(permission);
  }

  get permissions() {
    return this.credentialsService.userPermissionValues;
  }
  // {{credentialsService.userPermissionValues|json}}
  routerUrl(url: any): string | string {
    let displayUrl = '';
    let split_by_query_params = url.split('?')[0];
    let split_url = split_by_query_params.split('/');
    for (let i = 1; i < split_url.length; i++) {
      displayUrl = displayUrl + split_url[i].toUpperCase();
      if (i != split_url.length - 1) {
        displayUrl = displayUrl + ' / ';
      }
    }
    return displayUrl;
  }

  reloadPermissions() {
    this.authenticationService.refreshLogin().subscribe();
  }

  get appVersion() : any {
    let ver = environment.appVersion;
    if (ver == undefined) {
      ver = 'Version Unknown';
    } else {
      return ver;
    }
  }

  get site() : any {
    let site = environment.site;
    if (site == undefined) {
      site = '-';
    } else {
      return site;
    }
  }
}
