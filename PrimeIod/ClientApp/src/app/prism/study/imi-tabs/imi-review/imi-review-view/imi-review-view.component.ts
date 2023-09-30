import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { FormlyFormOptions } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { ImiStudyReviewService } from '../../imi-study-review.service';

@Component({
  selector: 'app-imi-review-view',
  templateUrl: './imi-review-view.component.html',
  styleUrls: ['./imi-review-view.component.css']
})
export class ImiReviewViewComponent {
  studyId: number = 0;
  record: any;
  recordGroup = { record1: {}, record2: {} };
  //  record1 : any;
  // record2 : any;

  study: any;
  // currentdate:any;
  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;

  constructor(
    private studyEditService: StudyEditService,
    private studyService: ImiStudyReviewService,
    private tblParamService: TblParamService
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {

      if (st?.studyType == 'IMI' || st?.studyType == 'DM+IMI') {
        this.studyId = st.studyId;

        this.loadStudyReview(st.studyId);
      }
    });
  }

  loadStudyReview(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyService.getStudyReviewPart1(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.loadStudyReviewPart2(studyId);
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // console.log("here");
        this.loading = false;
      }
    );
  }

  loadStudyReviewPart2(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyService.getStudyReviewPart2(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = Object.assign(this.record, res);

          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // console.log("here");
        this.loading = false;
      }
    );
  }

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions | any = {};

  //Tab Related Variables:
  active = 'tab01';

  ResetDirty() {
    this.tab01isDirty = false;
    this.tab02isDirty = false;
    this.tab03isDirty = false;
    this.tab04isDirty = false;
    this.tab05isDirty = false;
    this.tab06isDirty = false;
    this.tab07isDirty = false;
    this.tab08isDirty = false;
    this.tab09isDirty = false;
    this.tab10isDirty = false;
    this.tab11isDirty = false;
    this.tab12isDirty = false;
    this.tab13isDirty = false;
    this.tab14isDirty = false;
    this.tab15isDirty = false;
    this.tab16isDirty = false;
  }
  tab01isDirty = false;
  tab01isDirtyChanged(isDirty: boolean) {
    this.tab01isDirty = isDirty;
  }
  tab02isDirty = false;
  tab02isDirtyChanged(isDirty: boolean) {
    this.tab02isDirty = isDirty;
  }
  tab03isDirty = false;
  tab03isDirtyChanged(isDirty: boolean) {
    this.tab03isDirty = isDirty;
  }
  tab04isDirty = false;
  tab04isDirtyChanged(isDirty: boolean) {
    this.tab04isDirty = isDirty;
  }
  tab05isDirty = false;
  tab05isDirtyChanged(isDirty: boolean) {
    this.tab05isDirty = isDirty;
  }
  tab06isDirty = false;
  tab06isDirtyChanged(isDirty: boolean) {
    this.tab06isDirty = isDirty;
  }
  tab07isDirty = false;
  tab07isDirtyChanged(isDirty: boolean) {
    this.tab07isDirty = isDirty;
  }
  tab08isDirty = false;
  tab08isDirtyChanged(isDirty: boolean) {
    this.tab08isDirty = isDirty;
  }
  tab09isDirty = false;
  tab09isDirtyChanged(isDirty: boolean) {
    this.tab09isDirty = isDirty;
  }
  tab10isDirty = false;
  tab10isDirtyChanged(isDirty: boolean) {
    this.tab10isDirty = isDirty;
  }
  tab11isDirty = false;
  tab11isDirtyChanged(isDirty: boolean) {
    this.tab11isDirty = isDirty;
  }
  tab12isDirty = false;
  tab12isDirtyChanged(isDirty: boolean) {
    this.tab12isDirty = isDirty;
  }
  tab13isDirty = false;
  tab13isDirtyChanged(isDirty: boolean) {
    this.tab13isDirty = isDirty;
  }
  tab14isDirty = false;
  tab14isDirtyChanged(isDirty: boolean) {
    this.tab14isDirty = isDirty;
  }
  tab15isDirty = false;
  tab15isDirtyChanged(isDirty: boolean) {
    this.tab15isDirty = isDirty;
  }
  tab16isDirty = false;
  tab16isDirtyChanged(isDirty: boolean) {
    this.tab16isDirty = isDirty;
  }
  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
  }
}
