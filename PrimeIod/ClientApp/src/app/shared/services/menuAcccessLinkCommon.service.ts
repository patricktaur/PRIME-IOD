import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CredentialsService } from '@app/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root' // or specify a module where you want to provide this service
})
export class MenuAccessLinkCommonService {
	constructor(private credentialsService: CredentialsService) {}

  hideCompIfPermissionNotFound(currentRoute: string, parentRoute: string, rootPath: string, routerLinkValue: any, routerLinkString: any, elementRef: ElementRef, debugMode: boolean): any {
    let stringWithoutFirstChar = currentRoute.substring(1);
    
		let initialRouterLink: string = routerLinkValue || routerLinkString
    let parentRouteIndex = -1;
    if(parentRoute) {
      parentRouteIndex = stringWithoutFirstChar.indexOf(parentRoute);
      if((parentRouteIndex + parentRoute.length) < stringWithoutFirstChar.length) {
        // have some extra default route
        stringWithoutFirstChar = stringWithoutFirstChar.substring(0, (parentRouteIndex+parentRoute.length)) + '/' + initialRouterLink;
      }
    }
    
    let stringWithoutLastSlash = stringWithoutFirstChar.replace(/\/([^\/]*)$/, '');
    // const stringWithoutLastSlash = stringWithoutFirstChar.replace(/\/([^\/]*)$/, '');
    let permissionRoute = '';
    //rootPath is a workaround to format permittionRoute 
    //Surekha can review  and check if this can be avoided
    //--Patrick 08Apr2023
    if (rootPath){
      permissionRoute = rootPath + '/' + initialRouterLink;
    }else{
      permissionRoute = stringWithoutLastSlash + '/' + initialRouterLink;
    }

    if(parentRoute == "") {
      permissionRoute = initialRouterLink.replace(/\//, '');
    }
    
    
    //  console.log(`permissionRoute = ${permissionRoute}`)

    const menuPermission = this.credentialsService.getMenuPermission(permissionRoute);
    // const menuPermission = this.credentialsService.getMenuPermission(this.menuCode);
    
    if (debugMode){
      console.log(`router link = ${routerLinkString}`);
      console.log(`stringWithoutFirstChar = ${stringWithoutFirstChar}`);
      console.log(`url = ${currentRoute}`);
      console.log(`permissionRoute = ${permissionRoute}`);
      console.log(`appMenuAccessLink in debugMode`);
      console.log(`currentRoute = ${currentRoute}`);
      console.log(`parentRoute = ${parentRoute}`);
      console.log(`this.initialRouterLink = ${initialRouterLink}`);
      console.log(`permissionRoute = ${permissionRoute}`);
      if (menuPermission){
        console.log("menu permission: " + JSON.stringify(menuPermission));
      }else{
        console.log("menu permission not found");
      }
    }

    // elementRef.nativeElement.style.display = 'none';
    //1. Hide if compPermission is not found.
    if (!menuPermission) {
      elementRef.nativeElement.style.display = 'none';
      return;
    }

		return { menuPermission, permissionRoute };
  }

	disableElementBasedOnUatStatus(menuPermission: any, elementRef: ElementRef, renderer: Renderer2) {
		// elementRef.nativeElement.title = this.getStatusTitle(menuPermission.status);
    if (this.isElementDisabled(menuPermission.status)) {
      elementRef.nativeElement.removeAttribute('href');
      elementRef.nativeElement.classList.add('disabled');
      elementRef.nativeElement.setAttribute('title', this.getStatusTitle(menuPermission.status));
      // renderer.setAttribute(elementRef.nativeElement, 'title', this.getStatusTitle(menuPermission.status));
      // elementRef.nativeElement.title = this.getStatusTitle(menuPermission.status);
    } else {
      elementRef.nativeElement.title = '';
      elementRef.nativeElement.setAttribute('title', this.getStatusTitle(menuPermission.status));
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

  private disableLink(elementRef: ElementRef<any>): void {
    const link = elementRef.nativeElement;
    link.classList.add('disabled');
    link.removeEventListener('click', this.onClick);
  }

	private onClick(event: Event): void {
    event.preventDefault();
  }
}