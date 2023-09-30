import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { StudyService } from '@app/prism/study/study.service';



@Injectable()
export class StudyIconNumbersResolver implements Resolve<any[]>, OnDestroy {
  currentUserId: string = "";
  loadStudyIconNumbersSub: Subscription | undefined;
  
  constructor(
    private credentialsService: CredentialsService,
    private studyService: StudyService,

    ) {

      var currentUserId: any = this.credentialsService.currentUser.id;
      this.currentUserId = currentUserId;
    }

    resolve(route: ActivatedRouteSnapshot): Promise<any[]> {
      return new Promise<any[]>((resolve, reject) => {
        this.loadStudyIconNumbersSub = this.studyService.getStudyIconNumbersByUser(this.currentUserId).subscribe(
          (res: any) => {
            if (res.status === 400) {
              resolve([]); // Resolve with an empty array if there's an error
            } else {
              resolve(res); // Resolve with the data from the response
            }
          },
          (err: any) => {
            console.log(`err = ${JSON.stringify(err, null, 2)}`);
            reject(err); // Reject the promise if there's an error
          }
        );
      });
    }
    
  
  ngOnDestroy(): void {
    this.loadStudyIconNumbersSub?.unsubscribe();
  }

}
