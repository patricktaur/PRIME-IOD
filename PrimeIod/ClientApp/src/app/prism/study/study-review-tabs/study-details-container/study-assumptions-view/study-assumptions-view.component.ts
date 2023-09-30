import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { StudyViewService } from '@app/prism/study/study-view.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-assumptions-view',
  templateUrl: './study-assumptions-view.component.html',
  styleUrls: ['./study-assumptions-view.component.css']
})
export class StudyAssumptionsViewComponent {
  loading: boolean = false;
  studyId: number = 0;
  studyAssumptions: any = {}

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;

  constructor(
    public router: Router,
    private studyViewService: StudyViewService,
    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService) {

  }

  ngOnInit() {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      // if (st?.studyType?.startsWith('DM')) {
        console.log(`study = ${JSON.stringify(st, null, 2)}`);
        this.studyId = st.studyId;

        this.loadStudyAssumptions(st.studyId);
      // }
      if (st?.studyType?.startsWith('IMI')) {
        this.router.navigate(['/study/imi-review-group']);
      }
    });
  }

  loadStudyAssumptions(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyAssumptionsViewDTO(studyId).subscribe(
      (res: any) => {
        console.log(`getStudyAssumptionsDTO = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studyAssumptions = res;
          
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
  }
}
