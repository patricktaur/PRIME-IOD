import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';
import { ImiStudyReviewService } from '../../imi-study-review.service';

@Component({
  selector: 'app-imi-study-assumptions-view',
  templateUrl: './imi-study-assumptions-view.component.html',
  styleUrls: ['./imi-study-assumptions-view.component.css']
})
export class ImiStudyAssumptionsViewComponent {
  studyId: number = 0;
  studyAssumptions: any = {};

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  
  constructor(
    private studyEditService: StudyEditService,
    private studyReviewService: ImiStudyReviewService,
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('IMI')) {
        this.studyId = st.studyId;
        this.loadStudyAssumptions(st.studyId);
      }
    });
  }

  loadStudyAssumptions(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyAssumptionsViewDTO(studyId).subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`);
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
