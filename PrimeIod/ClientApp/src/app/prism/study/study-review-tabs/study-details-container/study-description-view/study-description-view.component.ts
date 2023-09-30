import { Component } from '@angular/core';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-description-view',
  templateUrl: './study-description-view.component.html',
  styleUrls: ['./study-description-view.component.css']
})
export class StudyDescriptionViewComponent {
  loading: boolean = false;
  studyId: number = 0;
  studyDetails: any = {}

  hasDMManagerRole: boolean = false;

  subscription1: Subscription | undefined;
  subscription2: Subscription | undefined;

  constructor(
    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit() {
    this.subscription2 = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyId = st.studyId;
      this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
      if (st?.studyType?.startsWith('DM')) {
        
        this.loadStudyDetails(st.studyId);
      }
    });
  }

  loadStudyDetails(studyId: number) {
    this.loading = true;
    this.subscription1 = this.studyReviewService.getStudyDetailsViewDTO(studyId).subscribe(
      (res: any) => {
        // console.log(`study details view = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studyDetails = res;
          // console.log(`study details = ${this.studyDetails, null, 2}`);
          // this.form.reset();
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
    this.subscription2?.unsubscribe();
  }
}
