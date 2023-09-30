import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-page-flow-view',
  templateUrl: './study-page-flow-view.component.html',
  styleUrls: ['./study-page-flow-view.component.css']
})
export class StudyPageFlowViewComponent implements OnInit {
  studyId: number = 0;
  loading: boolean = false;
  pageflow: any = {};
  currentYear: number | undefined;
  selectedYear: any;
  filterPageFlow: any;
  studyIdSubscription: Subscription | undefined;
  loadSubscription: Subscription | undefined;
  
  tableForm = new FormGroup({
    selectedYear: new FormControl()
  });

  constructor(
    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService
  ) {}
  
  ngOnInit(): void {
    var now = new Date();
    this.currentYear = now.getFullYear();

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadStudyPageFlow(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });
  }

  loadStudyPageFlow(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyReviewService.getStudyPageflowDTO(studyId).subscribe(
      (res: any) => {
        console.log(`page flow view res = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          return;
        } else {
          this.pageflow = res;
          this.setDefaultYear();
          this.filterRecords();
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  updateYear(e: any) {
    this.selectedYear = e.target.value;
    this.filterRecords();
  }

  setDefaultYear() {
    this.YearValue.forEach((x: any) => {
      let maxYear = Math.max.apply(null, this.YearValue);
      if (x == this.currentYear) {
        this.selectedYear = this.currentYear;
      } else {
        this.selectedYear = maxYear;
      }
    });
  }

  filterRecords() {
    this.filterPageFlow = this.pageflow.pageFlowItems
      .filter((x: any) => new Date(x.yyyymm).getFullYear() == this.selectedYear)
      .sort((a: any, b: any) => (a.yyyymm > b.yyyymm ? 1 : -1));
    return this.filterPageFlow;
  }

  get totalActualPages(): number {
    if (this.pageflow == null) {
      return 0;
    }
    return this.pageflow.pageFlowItems?.reduce(function(prev: number, cur: any) {
      return prev + +cur.actualPages;
    }, 0);
  }

  get totalFuturePages(): number {
    if (this.pageflow == null) {
      return 0;
    }

    return (
      this.pageflow.pageFlowItems?.filter((x: any) => x.isFuture)
        .reduce(function(prev: number, cur: any) {
          return prev + +cur.plannedPages;
        }, 0)
    );
  }

  get YearValue(): any {
    if (this.pageflow == null) {
      return;
    }
    return [...new Set(this.pageflow.pageFlowItems?.map((rec: any) => new Date(rec.yyyymm).getFullYear()))].sort();
  }

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
  }
}
