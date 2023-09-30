import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserRoles } from '../authentication/credentials.enums';
import { CredentialsService } from '../authentication/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class StudyEditGuard implements CanActivate {
  debugMode : boolean = false;

  studyId: number = 0;
  studyIdSubscription: Subscription | undefined;

  isActive = false;
  initialRouterLink : any = undefined;
  initialText : string = '';

  constructor(
    private router: Router,
    private credentialsService: CredentialsService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private studyEditService: StudyEditService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | any>  {
    let componentCode = route.data['compCode'] as string;
    // let altRoute = route.data['redirectUrl'] as string;

    // let parentRote = state.url.toString().substring(0, state.url.lastIndexOf("/"));
    this.debugMode =  route.data['debugMode'];
    const parentPath = route.data['parentPath'];
    const fullPath = state.url;
    // const permissionPath = fullPath.substring(1);

    var configPath: any = route.routeConfig ? route.routeConfig.path : route.url[route.url.length - 2].path;
    let parentRoute = state.url.toString().substring(1, state.url.lastIndexOf('/' + configPath));

    console.log(`configPath = ${configPath}`);
    console.log(`parentRoute = ${parentRoute}`);
    let permissionPath = '';

    if (parentRoute){
      permissionPath = parentRoute + '/' + configPath;
    }else{
      permissionPath = fullPath.substring(1);
    }

    console.log(`permission path = ${permissionPath}`);

    var study = this.getStudyProperties()
    .then(res => {
      return res;
    });

    const menuPermission = this.credentialsService.getMenuPermission(permissionPath);
    if (!menuPermission ) {
      // this.el.nativeElement.style.display = 'none';
      const msg = `No permission to path: ${fullPath}`;
    }

    console.log(`menuPermission = ${JSON.stringify(menuPermission, null, 2)}`);

    if(!menuPermission.componentCode) {
      return true;
    }
    
    const componentPermission = this.credentialsService.getCompPermission(menuPermission.componentCode);
    if ( componentPermission?.studiesPermitted?.length > 0) {
      var hasPermission = this.getComponentAccessPermissionStatus(menuPermission.componentPermission, study)
      .then(res => {
        if(res) {
          return true;
        } else {
          return false;
        }
        // return true;
      })
      .catch(err => {
        // if (!this.isActive){
          // this.router.navigate([parentRoute + '/no-permission']);
        // }
      })

      if(await hasPermission) {
        return true;
      } else {
        const msg = `No permission to path: ${fullPath} for this Study`;
        // this.router.navigateByUrl('/no-access');
        // this.router.navigate(['/no-access'], {queryParams: { message: msg } });
        // this.router.navigate(['no-permissions'], {queryParams: { message: msg } }) ;
        return true;
      }
    } else {
      return true;
    }
  }

  getStudyProperties() {
    return new Promise((resolve, reject) => {
      this.studyEditService.getStudyProperties().subscribe((st: any) => {
        resolve(st);
      })
    });
  }

  getComponentAccessPermissionStatus(compPermission: any, study: any) {
    return new Promise((resolve, reject) => {
      // this.studyEditService.getStudyProperties().subscribe((st: any) => {
        this.studyId = study.studyId;
        console.log(`study = ${JSON.stringify(study, null, 2)}`)
        
      
        const studyPermitted = compPermission.studiesPermitted.find((s : any) => s.studyId === this.studyId);
        // console.log(`studypermited = ${studyPermitted}`);
        // if (!studyPermitted) {
            resolve(studyPermitted);
        // }else{
        //     resolve(studyPermitted);
        // }
      // });
    });
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | any  {
  //   if (this.credentialsService.isAuthenticated()) {
  //     let id = route.queryParamMap.get("id");
  //     console.log(`queryParams = ${id}`);
  //     // let studyId = route.data['studyId'] as number;
  //     let permissionValue = route.data['userRole'] as UserRoles;
  //     let routeName = route.data['redirectUrl'] as string;
  //     let subscription = this.studyEditService._studyId.subscribe((st: any) => {
  //       let studyId = st;

  //       // console.log(`Study Id = ${ studyId }`);
  //       // console.log(`permissionValue = ${ permissionValue }`);
  //       // console.log(`routeName = ${ routeName }`);
  //       // console.log(`state url = ${state.url} ${ state.root.pathFromRoot}`);

  //       if (permissionValue && studyId) {
  //         let hasRolePermission = this.credentialsService.userHasResourcePermission(studyId, permissionValue);
  //         if (hasRolePermission) {
  //           return true;
  //         } else {
  //           // console.log(`last slash = ${state.url.toString().substr(0, state.url.lastIndexOf("/"))}`);
  //           let parentRote = state.url.toString().substring(0, state.url.lastIndexOf("/"));
  //           // let queryParams = state.url.toString().substring(state.url.lastIndexOf("?"), (state.url.length-1));
  //           if(id) {
  //             this.router.navigate([parentRote + '/' + routeName], {queryParams: { id: id }});
  //           } else {
  //             this.router.navigate([parentRote + '/' + routeName]);
  //           }
            
  //           // return true;
  //         }
  //       }
  //       return true;
  //     })
      
  //   } else {
  //     return false;
  //   }
  // }
}