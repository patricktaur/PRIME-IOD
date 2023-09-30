import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { CredentialsService } from '@app/core/authentication/credentials.service';

import { StudyService } from '@app/prism/study/study.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-group-container',
  templateUrl: './study-group-container.component.html',
  styleUrls: ['./study-group-container.component.css']
})
export class StudyGroupContainerComponent implements OnInit, OnDestroy {
  // @Input() studyId: number;
  studyId: number = 0;
  studyIconNumbers: any;
  selectedStudy: any;
  studyEditMode = false;
  lockedMessage = '';

  studyType: string = '';

  loadStudyIconNumbersSub: Subscription | undefined;
  studyPropertiesSub: Subscription | undefined;
  studyEditModeSub: Subscription | undefined;

  studyIdSet = false;

  currentUserId: string = "";

  constructor(
    public router: Router,
    private actRoute: ActivatedRoute,
    private credentialsService: CredentialsService,
    private studyService: StudyService,
    private studyEditService: StudyEditService
  ) {}

  ngOnInit(): void {
    
    this.studyIconNumbers = this.actRoute.snapshot.data['studyIconNumbers'];
    
    console.log(`study icon numbers count:= ${this.studyIconNumbers.length}}`);
    var currentUserId: any = this.credentialsService.currentUser.id;
    this.currentUserId = currentUserId;

    this.studyPropertiesSub = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyId = st.studyId;
      console.log(`study id = ${this.studyId}`)
      if (this.studyId > 0) {
        this.studyId = st.studyId;
        this.selectedStudy = this.studyId;
        this.loadMenuAndDashboard(st.studyType);
        
      }
      else{
        //check for null or undefined (==) here
        if (this.selectedStudy == null && this.studyIconNumbers.length > 0){
          this.selectedStudy = this.studyIconNumbers[0].studyId;
          console.log(`selected study = ${this.selectedStudy}`);
          //  this.onStudySelected();
        }
        
      }
    });

    this.studyEditModeSub = this.studyEditService.getStudyEditMode().subscribe((st: any) => {
      this.studyEditMode = st;
      if (st == true) {
        this.lockedMessage =
          'Study Icon Numbers are locked. To unlock, please save any unsaved changes or click the Undo button to revert to the previous state.';
      } else {
        this.lockedMessage = '';
      }
    });
  }


  // ngOnInit(): void {
  //   const currentUserId: any = this.credentialsService.currentUser.id;
  //   this.currentUserId = currentUserId;
  
  //   // Wrap the asynchronous operations in Promise.all
  //   Promise.all([
  //     this.studyEditService.getStudyProperties().toPromise(),
  //     this.studyEditService.getStudyEditMode().toPromise(),
  //   ])
  //     .then(([st, studyEditMode]) => {
  //       this.studyId = st.studyId;
  //       if (this.studyId > 0) {
  //         this.studyId = st.studyId;
  //         this.selectedStudy = this.studyId;
  //         this.loadMenuAndDashboard(st.studyType);
  //       } else {
  //         if (this.selectedStudy == null && this.studyIconNumbers.length > 0) {
  //           this.selectedStudy = this.studyIconNumbers[0].studyId;
  //           this.onStudySelected();
  //         }
  //       }
  
  //       this.studyEditMode = studyEditMode;
  //       if (studyEditMode == true) {
  //         this.lockedMessage =
  //           'Study Icon Numbers are locked. To unlock, please save any unsaved changes or click the Undo button to revert to the previous state.';
  //       } else {
  //         this.lockedMessage = '';
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle any errors here
  //     });
  // }
  
  

  // async onStudySelected() {
  //   if (this.selectedStudy) {

  //     await this.studyEditService.setStudyIdAndLoadProperties(this.selectedStudy);
  //   }
  // }

    onStudySelected() {
    if (this.selectedStudy) {

       this.studyEditService.setStudyIdAndLoadProperties(this.selectedStudy);
    }
  }

  loadMenuAndDashboard(studyType: string) {
    // console.log(`study type = ${studyType}`);
    // console.log(`this study type = ${this.studyType}`);
    if (studyType !== this.studyType) {
      this.studyType = studyType;
      switch (studyType) {
        case 'DM':
          this.router.navigate(['dm'], { relativeTo: this.actRoute.parent });
          break;
        case 'DM+IMI':
          this.router.navigate(['dm-imi'], { relativeTo: this.actRoute.parent });
          break;
        case 'IMI':
          this.router.navigate(['imi'], { relativeTo: this.actRoute.parent });
          break;

        case 'CRM':
          this.router.navigate(['crm'], { relativeTo: this.actRoute.parent });
          break;
        case 'DM+CRM':

          this.router.navigate(['dm-crm'], { relativeTo: this.actRoute.parent });
          break;
        default:
          // this.router.navigate(['dm'], { relativeTo: this.actRoute.parent });
          break;
      }
    }
  }

  ngOnDestroy(): void {
    this.loadStudyIconNumbersSub?.unsubscribe();
    this.studyPropertiesSub?.unsubscribe();
  }
}
