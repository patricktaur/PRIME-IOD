import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyEditService } from '../../study-edit.service';
import { ImiStudyReviewService } from '../imi-study-review.service';

@Component({
  selector: 'app-imi-study-timelines-view',
  templateUrl: './imi-study-timelines-view.component.html',
  styleUrls: ['./imi-study-timelines-view.component.css']
})
export class ImiStudyTimelinesViewComponent {

  study: any = {};
  studyTimelines: any;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;

  constructor(
    private studyEditService: StudyEditService,
    private studyReviewService: ImiStudyReviewService
  ) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('imi');
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType == 'IMI' || st?.studyType == 'DM+IMI') {
        this.study = st.studyId;

        this.loadStudyTimelines(st.studyId);
      }
    });
  }

  loadStudyTimelines(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyTimelinesDTO(studyId).subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`);
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
