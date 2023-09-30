import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyQualityReviewService } from '../study-quality-review.service';

@Component({
  selector: 'app-study-quality-review-required-view',
  templateUrl: './study-quality-review-required-view.component.html',
  styleUrls: ['./study-quality-review-required-view.component.css']
})
export class StudyQualityReviewRequiredViewComponent {
  title = 'Quality Review';
  studyId: any = 0;

  record: any = {};
  loading: boolean = false;

  constructor(
    private studyEditService: StudyEditService,
    private studyQualityReviewService: StudyQualityReviewService
  ) {}

  ngOnInit(): void {
    this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      if (this.studyId > 0) {
        this.loadRecord(this.studyId);
      }
    });
    // this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.studyQualityReviewService.GetTblStudyQrMaster(studyId).subscribe(
      (res: any) => {
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
}
