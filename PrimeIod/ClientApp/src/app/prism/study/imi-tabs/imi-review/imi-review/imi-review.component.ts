import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { ImiStudyReviewService } from '@app/prism/study/imi-tabs/imi-study-review.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';

@Component({
  selector: 'app-imi-review',
  templateUrl: './imi-review.component.html',
  styleUrls: ['./imi-review.component.css']
})
export class ImiReviewComponent implements OnInit, OnDestroy {
  active = 'Project Status Dashboard Review ';
  studyId: number = 0;
  record: any;
  filteredRecords: any = [];
  headerRecords:  any = [];
  recordProjectStatus: any;
  recordMilestones: any;
  recordRisk: any;
  recordStudyStatus: any;
  recordImageData: any;
  recordEDCDoc: any;
  recordReader: any;
  recordManagement: any;
  recordImageRead: any;
  recordCross: any;
  recordFinance: any;
  recordQuality: any;
  recordVendor: any;
  recordResourcing: any;
  recordClient: any;
  recordCommunication: any;
  recordGroup = { record1: {}, record2: {} };
  //  record1 : any;
  // record2 : any;
  returndata: any;

  study: any;
  // currentdate:any;

  protocolPhaseParId = 300;
  protocolComplexityParId = 400;
  rescueStudyParId = 600;
  yesNoParId = 600;
  tmfParID = 3800;
  medianValue: number = 0;
  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;

  //tab-related variables are declared below in  //Tab Related Variables:

  constructor(
    public router: Router,
    private studyEditService: StudyEditService,
    private studyService: ImiStudyReviewService,
    private tblParamService: TblParamService,
    private credService: CredentialsService
  ) {}

  ngOnInit(): void {
    // this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.studyId = st;
    //   if (this.studyId > 0) {
    //     this.loadStudyReview(this.studyId);
    //   }
    // });

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      // if (st?.studyType?.startsWith('IMI')) {
      //   this.studyId = st.studyId;

      //   this.loadStudyReview(st.studyId);
      // }
      // if (st?.studyType?.startsWith('DM')) {
      //   this.router.navigate(['/study/review']);
      // }

      if (st?.studyType == 'IMI' || st?.studyType == 'DM+IMI') {
        this.studyId = st.studyId;
        this.loadStudyReview(st.studyId);
      }

      // if (st?.studyType == 'DM') {
      //   this.router.navigate(['/study/review']);
      // }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  loadStudyReview(studyId: number) {
    this.loading = true;

    this.loadSubscription = this.studyService.getIMIReviewCategoryHeader(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          console.log('header data');
          console.log(res);
          this.headerRecords = res;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // console.log("here");
        this.loading = false;
      }
    );

    this.loadSubscription = this.studyService.getall(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          console.log('pull data');
          console.log(res);
          this.filteredRecords = res;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // console.log("here");
        this.loading = false;
      }
    );

    this.loading = false;
  }

  submit() {
    if (this.form.valid) {
      this.saveStudyReview();
    }
  }
  saveStudyReview() {
    this.loading = true;

    this.saveSubscription = this.studyService.saveImiStudyReview(this.filteredRecords).subscribe(
      (res: any) => {
        this.ResetDirty();
        this.loadStudyReview(this.studyId);
        this.active = 'Project Status Dashboard Review ';
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }

  setUserRoles(model: any): any {
    model.userIsDMPM = this.credService.userHasPermission('role.admin');
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in Study Review.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions | any = {};

  // //Tab Related Variables:
  // active = 'tab01';

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
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
