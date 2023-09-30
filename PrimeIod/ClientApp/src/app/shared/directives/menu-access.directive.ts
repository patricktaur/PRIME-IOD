import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { environment } from '@env/environment';
import { AppCompMenuPermissionsService } from '@app/core/authentication/app-comp-menu-permissions.service';
@Directive({
  selector: '[appMenuAccess]'
})
export class MenuAccessDirective implements OnInit {
  @Input('appMenuAccess') menuPath: string = "";
  @Input() debugMode : boolean = false;

  constructor(
    private elementRef: ElementRef,
    private credentialsService: CredentialsService,
    private appCompMenuPermissionsService: AppCompMenuPermissionsService
  ) {}

  ngOnInit(): void {    
    if (this.debugMode){
      console.log(`this.debugMode = ${this.debugMode}`);
      console.log(`menupath = ${this.menuPath}`);
    }
    const menuPermission = this.credentialsService.getMenuPermission(this.menuPath);
    if (!menuPermission) {
      this.elementRef.nativeElement.style.display = 'none';
      return;
    }

    this.elementRef.nativeElement.title = this.getStatusTitle(menuPermission.status);
    if (this.isElementDisabled(menuPermission.status)) {
      this.elementRef.nativeElement.disabled = true;
    }
  }

  private getStatusTitle(status: number): string {
    switch (status) {
      case 0:
        return 'Not Ready';
      case 1:
        return 'Ready for UAT';
      case 2:
        return 'UAT Passed';
      case 3:
        return 'Production Passed';
      case 4:
        return 'Under Maintenance';
      default:
        return '';
    }
  }

  private isElementDisabled(status: number): boolean {
    const isStg = environment.site.toLowerCase() === 'stg';
    const isProd = environment.site.toLowerCase() === 'prod';

    //Not ready = 0 / Under maintenance = 4
    if ((isStg && status === 0) || (isStg && status === 4)) {
      return true;
    }

    if ((isProd && status === 0) || (isProd && status === 1) || (isProd && status === 4)) {
      return true;
    }

    //for testing:
    if (status === 0) {
      return true;
    }

    return false;
  }
}
