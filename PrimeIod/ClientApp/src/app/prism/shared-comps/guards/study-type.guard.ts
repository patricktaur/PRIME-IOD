import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Injectable({
  providedIn: 'root'
})
export class StudyTypeGuard implements CanActivate {
  subscription: Subscription | undefined;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private studyEditService: StudyEditService,

  ) { }
 
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean | any {
  //     return this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
  //       const studyType = st?.studyType;
  //       console.log("studyType:" + studyType);
  //       if (studyType){
  //         if (studyType == 'DM'){
  //           return true;
  //         }else{
  //           const studyPath = this.getStudyPath(studyType)
  //           if (studyPath){
  //             const fullPath = '/study/' + studyPath;
  //             console.log("fullPath : " + fullPath);
  //             this.router.navigate([fullPath], { relativeTo: this.actRoute.parent });
  //           }
  //           false;
  //         }
          
  //       }
  //       return false;
  //     });
      
   

  // }




canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | any {
  return this.studyEditService.getStudyType()
  .pipe(
    take(1) //to prevent subsequent calls to trigger router.navigate
  )
  .subscribe((studyType: any) => {
    // console.log(`st = ${JSON.stringify(st, null, 2)}`);
    // console.log(`study type = ${studyType}`);
    // const studyType = st?.studyType;
    // console.log("studyType:" + studyType);
    if (studyType){
      if (studyType == 'DM'){
        return true;
      } else {
        const studyPath = this.getStudyPath(studyType);
        // console.log(`study path = ${studyPath}`);
        if (studyPath){
          const fullPath = '/study/' + studyPath;
          // console.log("fullPath : " + fullPath);
          this.router.navigate([fullPath], { relativeTo: this.actRoute.parent });
        }
        return false;
      }
    }else {
      return false;
    }
  });
}


  getStudyPath(studyType: string) {
    let studyPath = '';
    switch (studyType) {
      case 'DM':
        studyPath = 'dm';
        break;
      case 'IMI':
        studyPath = 'imi';
        break;
      case 'CRM':
        studyPath = 'crm';
        break;
      case 'DM+IMI':
        studyPath = 'dm-imi';
        break;
      case 'DM+CRM':
        studyPath = 'dm-crm';
        break;
      default:
        break;
    }
    return studyPath;
  }

}
