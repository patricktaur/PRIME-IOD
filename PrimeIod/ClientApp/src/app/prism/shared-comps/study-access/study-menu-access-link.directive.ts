import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { MenuAccessLinkCommonService } from '@app/shared/services/menuAcccessLinkCommon.service';

@Directive({
  selector: '[appStudyMenuAccessLink]'
})
export class StudyMenuAccessLinkDirective implements OnInit, OnDestroy {
 

  @Input('routerLink') routerLinkValue!: string;
  @Input() debugMode : boolean = false;
  @Input() rootPath : string = '';
  isActive = false;

  initialRouterLink : any = undefined;
  initialText : string = '';

  studyIdSubscription: Subscription | undefined;
  studyId: number | undefined;

  constructor(
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService,
    private elementRef: ElementRef,
    private routerLink: RouterLink,
    private router: Router,
    private actRoute: ActivatedRoute,
    private renderer: Renderer2,
    private menuAccessLinkCommonService: MenuAccessLinkCommonService
  ) {}

  ngOnInit(): void {
    // const compPermission = this.credentialsService.getCompPermission(this.compCode);
    const currentRoute = this.router.url;
    let routerLink = this.routerLink.routerLink;
    this.initialRouterLink = this.routerLinkValue || this.routerLink.routerLink;
    this.initialText = this.elementRef.nativeElement.innerHTML;

    var parentRoute = "";
    this.actRoute.parent?.url.subscribe((urlPath) => {
      parentRoute = urlPath[urlPath.length - 1]?.path;
    });

    
    let permissionObj: any = this.menuAccessLinkCommonService.hideCompIfPermissionNotFound(currentRoute, parentRoute, this.rootPath, this.routerLinkValue, this.routerLink.routerLink, this.elementRef, this.debugMode);

    if(!permissionObj) {
      return;
    }

    let menuPermission = permissionObj.menuPermission;

    this.menuAccessLinkCommonService.disableElementBasedOnUatStatus(permissionObj.menuPermission, this.elementRef, this.renderer);

    //permission has component code:
    const componentCode = menuPermission.componentCode;

    const componentPermission = this.credentialsService.getCompPermission(componentCode);


    this.studyIdSubscription = this.studyEditService._studyId.subscribe((studyId: number) => {      
      this.studyId = studyId;

      //not working, always false.
      // this.isActive = this.router.isActive(this.initialRouterLink, true);

      this.isActive = this.router.url.includes(permissionObj.permissionRoute) ? true : false;
      
      // console.log("this.router.url :" + this.router.url);
      // console.log("permissionRoute : " + permissionRoute);
      // console.log("isActive: " + this.isActive);
      
      if (this.debugMode) {
        console.log(`componentPermission = ${JSON.stringify(componentPermission, null, 2)}`);
        console.log(`isActive = ${this.isActive}`);
        console.log(`menuPermission = ${menuPermission.alternatePath}`);
      }

      if ( componentPermission?.studiesPermitted?.length > 0) {
        const studyPermitted = componentPermission.studiesPermitted.find((s : any) => s.studyId === this.studyId);
        // console.log(`componentPermission = ${JSON.stringify(componentPermission)}`);

        // console.log(`menu permission = ${JSON.stringify(menuPermission)}`);
        if (!studyPermitted) {
          //2. The currrent study Id is not in the studiesPermitted list
          //Set routerLinkValue to altRoute
          //Navigate to routerLink value (altRoute).

          if (this.debugMode) {
            console.log(`studyPermitted = ${JSON.stringify(studyPermitted, null, 2)}`);
          }
          this.routerLink.routerLink = menuPermission.alternatePath;
          this.renderer.setAttribute(this.elementRef.nativeElement, 'routerLink', menuPermission.alternatePath);
          this.elementRef.nativeElement.innerHTML = menuPermission.alternateText;
            if (this.isActive){
              this.router.navigate([menuPermission.alternatePath], { relativeTo: this.actRoute.parent});
            }
        } else {
          //3. The current study Id is in the studiesPermittedList.
          //Set routerLinkValue to initial (declared) value.
          //Navigate to routerLinkValue (initial)
          
          if(menuPermission.alternatePath && this.router.url.includes(menuPermission.alternatePath)) {
            this.router.navigate([menuPermission.menuPath]);
          }

          this.routerLink.routerLink = this.initialRouterLink;
          this.elementRef.nativeElement.innerHTML = this.initialText;
          if (this.isActive){
            this.router.navigate([this.initialRouterLink],  { relativeTo: this.actRoute.parent});
          }
        
        }
      }
      //4. No action required if compPermission.studiesPermitted == 0
      //all studies are permitted.
      
    });

    
  }

  ngOnDestroy(): void {
    
    this.studyIdSubscription?.unsubscribe();
  }

}