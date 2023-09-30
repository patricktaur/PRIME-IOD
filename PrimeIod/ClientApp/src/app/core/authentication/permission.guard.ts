// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  debugMode : boolean = false;
  constructor(
    private router: Router, 
    private actRoute: ActivatedRoute,
    private credentialsService: CredentialsService
  ) {
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.debugMode =  route.data['debugMode'];

    //if stg, then 1, prod then 2 else 0
    const expectedStatus = environment.site.toLowerCase() === 'stg' ? 1 : environment.site.toLowerCase() === 'prod' ? 2 : 0;

    // const expectedStatus = environment.site.toLowerCase() === 'stg';
    
    
    const fullPath = state.url;
    

    var configPath: any = route.routeConfig ? route.routeConfig.path : route.url[route.url.length - 2].path;
    let parentRoute = state.url.toString().substring(1, state.url.lastIndexOf('/' + configPath));
   
   
    let permissionPath = '';
    
    const queryParams = route.queryParams;

    if (parentRoute){
      permissionPath = parentRoute + '/' + configPath;
    }else{
      permissionPath = fullPath.substring(1);
    }

    // console.log(`permission path = ${permissionPath}`);

     const menuPermission = this.credentialsService.getMenuPermission(permissionPath);
    // const hasPermission = this.credentialsService.hasMenuPermission(permissionPath);
    
    //If menuPermission is not null and status is >= expectedStatus, then hasPermission is true
    var hasPermission = false;
    if (menuPermission && menuPermission.status >= expectedStatus){
      hasPermission = true;
    }
        
    
    if (this.debugMode){
      console.log(`debug Mode`);
      console.log(`parent route = ${ parentRoute }`);
      console.log(`fullPath : ${fullPath}`);
      console.log(`configPath : ${configPath}`);
      console.log(`permissionPath : ${permissionPath}`);
      console.log(`hasPermission : ${hasPermission}`);
    }
    
    const permission = this.credentialsService.getMenuPermission(permissionPath);
    // console.log(`permission : ${JSON.stringify(permission, null, 2)}`);
    
    if (hasPermission){
      return true;
    }



    const firstPermittedSiblingPath = this.getFirstPermittedSiblingPath(permissionPath, expectedStatus);
    // console.log(`firstPermittedSiblingPath : ${firstPermittedSiblingPath}`);
    if (this.debugMode){
      console.log(`firstPermittedSiblingPath : ${firstPermittedSiblingPath}`);
    }
    
    if (firstPermittedSiblingPath.length > 0){
      let fullPath = "/"  + firstPermittedSiblingPath;
      // fullPath += (queryParams && Object.keys(queryParams).length > 0) ? '?' : '';
      
      if (this.debugMode){
        console.log(`router.navigate([fullPath] : ${fullPath}`);
      }
      this.router.navigate([fullPath],  { relativeTo: this.actRoute.parent});
    
      if (queryParams !== null) {
        this.router.navigate([fullPath], {
          relativeTo: this.actRoute.parent,
          queryParams: queryParams,
        });
      } else {
        this.router.navigate([fullPath], { relativeTo: this.actRoute.parent });
      }
    
    }else{
      const msg = `No permission to path: ${fullPath} `;
      // this.router.navigateByUrl('/no-access');
      this.router.navigate(['/no-access'], {queryParams: { message: msg } });

    }

    return false;
    
  }

  getFirstPermittedSiblingPath(path : string, expectedStatus : number = 1){
    const menuPermissions = this.credentialsService.menuPermissions;
    const lastIndex = path.lastIndexOf('/');
    const parentPath = path.substring(0, lastIndex + 1);
    //find first item that starts with parentPath and item.status >= expectedStatus 
    const firstItem = menuPermissions.find(item => item.menuPath?.startsWith(parentPath) && item.status >= expectedStatus);

    // const firstItem = menuPermissions.find(item => item.menuPath?.startsWith(parentPath));
    if (firstItem){
      return firstItem.menuPath;
    }else{
      
      if (this.debugMode){
        
        console.log(`lastIndex : ${lastIndex}`);
        console.log(`parentPath : ${parentPath}`);
        console.log(`firstItem : ${firstItem}`);
      }

      return '';
    }
    
   
  }


  
}
