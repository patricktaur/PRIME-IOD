import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-other-icon-departments-view',
  templateUrl: './study-other-icon-departments-view.component.html',
  styleUrls: ['./study-other-icon-departments-view.component.css']
})
export class StudyOtherIconDepartmentsViewComponent {
  loading: boolean = false;
  studyId: number = 0;

  record: any = {};


  subscription1: Subscription | undefined;
  loadSubscription: Subscription | undefined;
  constructor(
    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService
  ) {}

  ngOnInit(): void {

    this.subscription1 = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadOtherIconDepartments(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });
  }

  loadOtherIconDepartments(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyOtherIconDeptsViewDTO(studyId).subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  ngOnDestroy() {
    this.subscription1?.unsubscribe();
    this.loadSubscription?.unsubscribe();
  }
}
