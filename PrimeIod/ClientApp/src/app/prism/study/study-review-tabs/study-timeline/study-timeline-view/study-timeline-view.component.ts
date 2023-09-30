import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-timeline-view',
  templateUrl: './study-timeline-view.component.html',
  styleUrls: ['./study-timeline-view.component.css']
})
export class StudyTimelineViewComponent {
  yesNoParId = 600;
  study: any;
  studyTimelines: any = {};

  yesNoItems: any = null;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;

  constructor(
    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService
  ) {}

  ngOnInit(): void {
    // this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.study = st;
    //   if (this.study > 0) {
    //     this.loadStudyTimelines(this.study);
    //   }
    // });

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.study = st.studyId;

        this.loadStudyTimelines(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });
  }

  loadStudyTimelines(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyTimelinesDTO(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studyTimelines = res;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
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
