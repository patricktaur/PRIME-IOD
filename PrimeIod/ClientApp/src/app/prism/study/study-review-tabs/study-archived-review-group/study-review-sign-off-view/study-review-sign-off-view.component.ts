import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { prmReviewStatus } from '@app/prism/common/study-enumerators';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
@Component({
  selector: 'app-study-review-sign-off-view',
  templateUrl: './study-review-sign-off-view.component.html',
  styleUrls: ['./study-review-sign-off-view.component.css']
})
export class StudyReviewSignOffViewComponent implements OnInit, OnDestroy {
  review: any;
  studyId: number = 0;

  reviewCyclePID: number = 2500;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  // saveSubscription: Subscription;
  // isDirtySub: Subscription;
  // dmpmConfirmSub: Subscription;
  // dmpmUndosub: Subscription;
  // dmpmManagerConfirmSub: Subscription;
  // dmpmManagerUndoSub: Subscription;

  constructor(
    public router: Router,
    private studyEditService: StudyEditService,
    private studyService: StudyReviewService
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        // this.studyId = st.studyId;

        this.loadStudyReview(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });
  }

  loadStudyReview(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyService.getStudyReview(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.review = res;

          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadSubscription?.unsubscribe();
    this.studyIdSubscription?.unsubscribe();
  }
}
