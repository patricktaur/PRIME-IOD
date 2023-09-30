import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { prmReviewStatus } from '@app/prism/common/study-enumerators';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';
import { ImiStudyReviewService } from '../../imi-study-review.service';

@Component({
  selector: 'app-imi-review-sign-off-view',
  templateUrl: './imi-review-sign-off-view.component.html',
  styleUrls: ['./imi-review-sign-off-view.component.css']
})
export class ImiReviewSignOffViewComponent {
  loading: boolean = false;

  review: any = {};
  studyId: number = 0;
  
  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;

  constructor(
    private studyEditService: StudyEditService,
    private studyService: ImiStudyReviewService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType == 'IMI' || st?.studyType == 'DM+IMI') {
        this.studyId = st.studyId;

        this.loadStudyReview(st.studyId);
      }
    });
  }

  loadStudyReview(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyService.getStudySignOffView(studyId).subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.review = res;
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

    // if (this.review?.reviewStatusPid == prmReviewStatus.Edit_Review) {
    //   retValue = 'Awaiting Review';
    // } else {
    //   retValue = `Confirmed by ${this.review?.imiPmDisplayName} on ${this.datePipe.transform(
    //     this.review?.imipmReviewedOn,
    //     'dd-MMM-yyyy'
    //   )}`;
    // }

    if (this.review?.imipmReviewedOn) {
      retValue = `Confirmed by ${this.review?.imiPmDisplayName} on ${this.datePipe.transform(
        this.review?.imipmReviewedOn,
        'dd-MMM-yyyy'
      )}`;
    } else {
      retValue = 'Awaiting Review';
    }
    return retValue;
  }

  get dmpmManagerReviewStatus() {
    let retValue = '';

    if (this.review?.reviewStatusPid == prmReviewStatus.DMPMManager_Confirmed) {
      retValue = `Confirmed by ${this.review?.imiPdDisplayName} on ${this.datePipe.transform(
        this.review?.imipmPdReviewedOn,
        'dd-MMM-yyyy'
      )}`;
    } else if (this.review?.reviewStatusPid == prmReviewStatus.DMPM_Confirmed) {
      retValue = 'Awaiting Review';
    } else {
      retValue = 'Awaiting Confirmation by IMIPM';
    }

    return retValue;
  }

}
