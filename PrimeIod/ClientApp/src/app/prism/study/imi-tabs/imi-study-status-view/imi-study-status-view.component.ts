import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyEditService } from '../../study-edit.service';
import { ImiStudyReviewService } from '../imi-study-review.service';

@Component({
  selector: 'app-imi-study-status-view',
  templateUrl: './imi-study-status-view.component.html',
  styleUrls: ['./imi-study-status-view.component.css']
})
export class ImiStudyStatusViewComponent {
  studyId: number = 0;
  studystatus: any = {};

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
        this.studyId = st.studyId;

        this.loadStudyStatus(st.studyId);
      }
    });
  }

  loadStudyStatus(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyStatusViewDTO(studyId).subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studystatus = res;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }
}
