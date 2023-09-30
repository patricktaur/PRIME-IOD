import { Directive, Input, ElementRef, OnInit, HostBinding, Renderer2 } from '@angular/core';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { environment } from '@env/environment';
import { AppCompMenuPermissionsService } from '@app/core/authentication/app-comp-menu-permissions.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuAccessLinkCommonService } from '../services/menuAcccessLinkCommon.service';

@Directive({
  selector: '[appMenuAccessLink]'
})
export class MenuAccessLinkDirective {
  // Note: 
  // If a Tag has the 'appMenuAccessLink' property, it should have the 'routerLink' property.

  // @HostBinding('class.my-class') myClass = true;
  // @HostBinding('style.color') color = 'red';

  // @Input('appMenuAccessLink') menuCode: string = "";
  @Input('routerLink') routerLinkValue!: string;
  @Input() debugMode : boolean = false;
  @Input() rootPath : string = '';
  //pass rootPath without the prefix / - menu container.
  //example 
  // appMenuAccessLink
  // [rootPath]="rootPath"
  isActive = false;

  initialRouterLink : any = undefined;
  // initialText : string = '';

  constructor(
    private elementRef: ElementRef,
    private credentialsService: CredentialsService,
    private appCompMenuPermissionsService: AppCompMenuPermissionsService,
    private routerLink: RouterLink, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private menuAccessLinkCommonService: MenuAccessLinkCommonService
  ) {}

  ngOnInit(): void {

    const currentRoute = this.router.url;
    var parentRoute = "";
    this.activatedRoute.parent?.url.subscribe((urlPath) => {
      parentRoute = urlPath[urlPath.length - 1]?.path;
    })


    let permissionObj: any = this.menuAccessLinkCommonService.hideCompIfPermissionNotFound(currentRoute, parentRoute, this.rootPath, this.routerLinkValue, this.routerLink.routerLink, this.elementRef, this.debugMode);
    if(!permissionObj) {
      return;
    }

    this.menuAccessLinkCommonService.disableElementBasedOnUatStatus(permissionObj.menuPermission, this.elementRef, this.renderer);

  }

}
