import { Directive, Input, ElementRef, OnInit, HostBinding } from '@angular/core';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { environment } from '@env/environment';
import { AppCompMenuPermissionsService } from '@app/core/authentication/app-comp-menu-permissions.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Directive({
  selector: '[sharedMenuAccessLink]'
})
export class SharedMenuAccessLinkDirective {
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
  initialText : string = '';

  constructor(
    private elementRef: ElementRef,
    private credentialsService: CredentialsService,
    private appCompMenuPermissionsService: AppCompMenuPermissionsService,
    private el: ElementRef,
    private routerLink: RouterLink, 
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const currentRoute = this.router.url;
    var parentRoute = "";
    this.activatedRoute.parent?.url.subscribe((urlPath) => {
      parentRoute = urlPath[urlPath.length - 1]?.path;
    })

    this.initialRouterLink = this.routerLinkValue || this.routerLink.routerLink;
    // this.initialRouterLink = this.routerLinkValue ;
    
    this.initialText = this.el.nativeElement.innerHTML;

    let stringWithoutFirstChar = currentRoute.substring(1);
    
    let parentRouteIndex = -1;
    if(parentRoute) {
      parentRouteIndex = stringWithoutFirstChar.indexOf(parentRoute);
      if((parentRouteIndex + parentRoute.length) < stringWithoutFirstChar.length) {
        // have some extra default route
        stringWithoutFirstChar = stringWithoutFirstChar.substring(0, (parentRouteIndex+parentRoute.length)) + '/' + this.initialRouterLink;
      }
    }
    
    let stringWithoutLastSlash = stringWithoutFirstChar.replace(/\/([^\/]*)$/, '');
    // const stringWithoutLastSlash = stringWithoutFirstChar.replace(/\/([^\/]*)$/, '');
    let permissionRoute = '';
    //rootPath is a workaround to format permittionRoute 
    //Surekha can review  and check if this can be avoided
    //--Patrick 08Apr2023
    if (this.rootPath){
      permissionRoute = this.rootPath + '/' + this.initialRouterLink;
    }else{
      permissionRoute = stringWithoutLastSlash + '/' + this.initialRouterLink;
    }

    if(parentRoute == "") {
      permissionRoute = this.initialRouterLink.replace(/\//, '');
    }
    
    
    //  console.log(`permissionRoute = ${permissionRoute}`)

    const menuPermission = this.credentialsService.getMenuPermission(permissionRoute);
    // const menuPermission = this.credentialsService.getMenuPermission(this.menuCode);
    
    if (this.debugMode){
      console.log(`router link = ${this.routerLink.routerLink}`);
      console.log(`stringWithoutFirstChar = ${stringWithoutFirstChar}`);
      console.log(`url = ${this.router.url}`);
      console.log(`permissionRoute = ${permissionRoute}`);
      console.log(`appMenuAccessLink in debugMode`);
      console.log(`currentRoute = ${currentRoute}`);
      console.log(`parentRoute = ${parentRoute}`);
      console.log(`this.initialRouterLink = ${this.initialRouterLink}`);
      console.log(`permissionRoute = ${permissionRoute}`);
      if (menuPermission){
        console.log("menu permission: " + JSON.stringify(menuPermission));
      }else{
        console.log("menu permission not found");
      }
    }

    //1. Hide if compPermission is not found.
    if (!menuPermission ) {
      this.elementRef.nativeElement.style.display = 'none';
      return;
    }

    this.elementRef.nativeElement.title = this.getStatusTitle(menuPermission.status);
    if (this.isElementDisabled(menuPermission.status)) {
      this.elementRef.nativeElement.removeAttribute('href');
      this.elementRef.nativeElement.classList.add('disabled');
      this.elementRef.nativeElement.title = this.getStatusTitle(menuPermission.status);
    } else {
      this.elementRef.nativeElement.title = '';
    }
    //  console.log("compPermission:" + JSON.stringify(compPermission));
  }

  private updateLinkTitle(status: number): void {
    const statusTitle = this.getStatusTitle(status);
    const statusSpan = this.elementRef.nativeElement.querySelector('.status');
    if (statusSpan) {
      statusSpan.textContent = statusTitle;
    } else {
      const span = document.createElement('span');
      span.classList.add('status');
      span.textContent = statusTitle;
      this.elementRef.nativeElement.appendChild(span);
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

    return false;
  }

  private disableLink(): void {
    const link = this.elementRef.nativeElement;
    link.classList.add('disabled');
    link.removeEventListener('click', this.onClick);
  }

  private onClick(event: Event): void {
    event.preventDefault();
  }
}
