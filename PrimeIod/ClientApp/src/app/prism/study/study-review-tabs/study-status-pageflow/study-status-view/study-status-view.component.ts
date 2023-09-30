import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-status-view',
  templateUrl: './study-status-view.component.html',
  styleUrls: ['./study-status-view.component.css']
})
export class StudyStatusViewComponent {
  studyId: number = 0;
  loading: boolean = false;
  studystatus: any = {};
  studyIdSubscription: Subscription | undefined;
  loadSubscription: Subscription | undefined;

  constructor(
    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService
  ) {}

  ngOnInit(): void {
    // this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.studyId = st;
    //   if (this.studyId > 0) {
    //     this.loadStudyStatus(this.studyId);
    //     // this.testLoading(this.studyId);
    //   }
    // });

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadStudyStatus(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });
  }
  
  loadStudyStatus(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyStatusViewDTO(studyId).subscribe(
      (res: any) => {
        console.log(`study status view = ${JSON.stringify(res, null, 2)}`);
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

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
  }
}
