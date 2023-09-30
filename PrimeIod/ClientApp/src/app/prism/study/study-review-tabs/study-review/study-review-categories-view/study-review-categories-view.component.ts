import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-review-categories-view',
  templateUrl: './study-review-categories-view.component.html',
  styleUrls: ['./study-review-categories-view.component.css']
})
export class StudyReviewCategoriesViewComponent {
  studyId: number = 0;
  review: any = {};
  study: any;
  // currentdate:any;

  protocolPhaseParId = 300;
  protocolComplexityParId = 400;
  rescueStudyParId = 600;
  yesNoParId = 600;
  tmfParID = 3800;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  hasDMManagerRole: boolean = false;

  constructor(
    private studyEditService: StudyEditService,
    private studyService: StudyReviewService,
    // private tblParamService: TblParamService,
    // private credService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;
        this.loadStudyReview(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });
  }

  loadStudyReview(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyService.getStudyReview(studyId).subscribe(
      (res: any) => {
        // console.log(`res = ${JSON.stringify(res, null, 2)}`)
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.review = res;
          this.loading = false;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // console.log("here");
        this.loading = false;
      }
    );
  }

  getStyle(score: number) {
    let style = "";
    if(score == 1) {
      style = "background: #ff0000; color: #FFFFFF;";
      return style;
    }
    else if(score == 2) {
      style = "background: #ff0000; color: #FFFFFF;"
      return style;
    }
    else if(score == 3) {
      style = "background: #ffc000; color: #FFFFFF;"
      return style;
    }
    else if(score == 4) {
      style = "background: #ffc000; color: #FFFFFF;";
      return style;  
    }
    else if(score == 5) {
      style = "background: #92d050; color: #FFFFFF";
      return style;
    }
    else return style; 
  }

  getNotApplicableStatus(flag: boolean) {
    if(flag == true) {
      return "Yes";
    } else {
      return "No";
    }
  }
  
  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
  }
}
