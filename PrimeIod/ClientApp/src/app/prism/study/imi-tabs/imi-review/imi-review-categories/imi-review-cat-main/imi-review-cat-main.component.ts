import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, of, Subscription } from 'rxjs';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { ImiStudyReviewService } from '@app/prism/study/imi-tabs/imi-study-review.service';

@Component({
  selector: 'app-imi-review-cat-main',
  templateUrl: './imi-review-cat-main.component.html',
  styleUrls: ['./imi-review-cat-main.component.css']
})
export class ImiReviewCatMainComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  form = new FormGroup({});
  studyId: number = 0;

  headerRecords: any = [];
  categoryData: any = [];

  selectedParId: number = 1;
  selectedTitle: string = '';
  menuWidth = 3;

  studyIdSub: Subscription | undefined;
  categoryHeaderSub: Subscription | undefined;
  categoryDataSub: Subscription | undefined;
  saveSub: Subscription | undefined;
  constructor(private studyEditService: StudyEditService, private studyService: ImiStudyReviewService) {}

  ngOnInit(): void {
    this.studyIdSub = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType == 'IMI' || st?.studyType == 'DM+IMI') {
        this.studyId = st.studyId;

        this.loadCategoryHeaders(st.studyId);
        this.loadCategoryData(st.studyId);
      }
    });
  }

  loadCategoryHeaders(studyId: number) {
    this.categoryHeaderSub = this.studyService.getIMIReviewCategoryHeader(0).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.headerRecords = res;
          this.selectedTitle = res[0]?.description;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // console.log("here");
        this.loading = false;
      }
    );
  }

  loadCategoryData(studyId: number) {
    this.categoryDataSub = this.studyService.getall(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.categoryData = res;
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

  itemSelected(itemSelected: number, title: string) {
    this.selectedParId = itemSelected;
    this.selectedTitle = title;
  }

  menuClass() {
    if (this.menuWidth == 3) {
      return `col-3 px-0 position-relative`;
    } else {
      return `col-1 px-0 overflow-hidden text-truncate text-nowrap position-relative`;
    }
  }
  toggleMenuWidth() {
    if (this.menuWidth == 3) {
      this.menuWidth = 1;
    } else {
      this.menuWidth = 3;
    }
  }

  collapse() {
    if (this.menuWidth == 3) {
      return 'bi bi-arrow-bar-left';
    } else {
      return 'bi bi-arrow-bar-right';
    }
  }

  submit() {
    if (this.form.valid) {
      this.saveStudyReview();
    }
  }
  saveStudyReview() {
    this.loading = true;

    this.saveSub = this.studyService.saveImiStudyReview(this.categoryData).subscribe(
      (res: any) => {
        //  this.ResetDirty();
        this.form.reset();
        this.loadCategoryData(this.studyId);
        //  this.active = "Project Status Dashboard Review ";
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }

  resetForm() {
    this.form.reset();

    this.loadCategoryData(this.studyId);
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

  ngOnDestroy(): void {
    this.studyIdSub?.unsubscribe();
    this.categoryHeaderSub?.unsubscribe();
    this.categoryHeaderSub?.unsubscribe();
    this.saveSub?.unsubscribe();
  }
}
