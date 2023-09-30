import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';
import { ImiStudyReviewService } from '../../imi-study-review.service';

@Component({
  selector: 'app-imi-study-description-view',
  templateUrl: './imi-study-description-view.component.html',
  styleUrls: ['./imi-study-description-view.component.css']
})
export class ImiStudyDescriptionViewComponent {
  loading: boolean = false;

  studyId: number = 0;
  studyDetails: any = {};

  studyIdSubscription: Subscription | undefined;
  loadSubscription: Subscription | undefined;

  constructor(
    private studyEditService: StudyEditService,
    private studyReviewService: ImiStudyReviewService
  ) {}

  ngOnInit(): void {

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('IMI')) {
        this.studyId = st.studyId;
        this.loadStudyDetails(st.studyId);
      }
      // if (st?.studyType?.startsWith('DM')) {
      //   this.router.navigate(['/study/review']);
      // }
    });
  }

  loadStudyDetails(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyDetailsViewDTO(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studyDetails = res;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

}
