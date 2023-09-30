import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { Subscription } from 'rxjs';
import { prmReviewStatus } from '@app/prism/common/study-enumerators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-study-review-actions-view',
  templateUrl: './study-review-actions-view.component.html',
  styleUrls: ['./study-review-actions-view.component.css']
})
export class StudyReviewActionsViewComponent {
  studyId: number = 0;

  reviewCyclePID: number = 2500;

  loading: boolean = false;

  studyReview: any = {};

  studyIdSubscription: Subscription | undefined;
  loadSubscription: Subscription | undefined;
  hasDMManagerRole: boolean = false;

  constructor(
    public router: Router,
    private studyEditService: StudyEditService,
    private studyService: StudyReviewService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadStudyReview(st.studyId);
      }

      if (st?.studyType?.startsWith('IMI')) {
        // this.router.navigate(['/study/imi-review-group']);
      }
    });
  }

  loadStudyReview(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyService.getStudyReviewView(studyId).subscribe(
      (res: any) => { 
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studyReview = res;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  get dmpmReviewStatus() {
    let retValue = '';
    if (this.studyReview?.reviewStatusPid == prmReviewStatus.Edit_Review) {
      retValue = 'Awaiting Review';
    } else {
      retValue = `Confirmed by ${this.studyReview?.dmpmDisplayName} on ${this.datePipe.transform(
        this.studyReview?.dmpmReviewedOn,
        'dd-MMM-yyyy'
      )}`;
    }
    return retValue;
  }

  get dmpmManagerReviewStatus() {
    let retValue = '';

    if (this.studyReview?.reviewStatusPid == prmReviewStatus.DMPMManager_Confirmed) {
      retValue = `Confirmed by ${this.studyReview?.dmpmManagerDisplayName} on ${this.datePipe.transform(
        this.studyReview?.dmpmManagerReviewedOn,
        'dd-MMM-yyyy'
      )}`;
    } else if (this.studyReview?.reviewStatusPid == prmReviewStatus.DMPM_Confirmed) {
      retValue = 'Awaiting Review';
    } else {
      retValue = 'Awaiting Confirmation by DMPM';
    }

    return retValue;
  }

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
  }
}
