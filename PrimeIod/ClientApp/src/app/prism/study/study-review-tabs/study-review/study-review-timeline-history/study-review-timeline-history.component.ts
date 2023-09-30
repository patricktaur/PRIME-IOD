import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';
@Component({
  selector: 'app-study-review-timeline-history',
  templateUrl: './study-review-timeline-history.component.html',
  styleUrls: ['./study-review-timeline-history.component.css']
})
export class StudyReviewTimelineHistoryComponent implements OnInit {
  studyId: number | undefined;
  studyReviewTimelineHistory: any;
  columns: any = [];

  loading: boolean = false;

  studyIdSubscription: Subscription | undefined;

  rowGroupCount: number = 0;
  constructor(
    public router: Router,
    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService
  ) {}

  ngOnInit(): void {
    // this.studyEditService._studyId.subscribe((st: any) => {
    //   this.studyId = st;
    //   if (this.studyId > 0) {
    //     this.loadStudyTimelineHistory(this.studyId);
    //   }
    // });

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadStudyTimelineHistory(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });
  }

  loadStudyTimelineHistory(studyId: number) {
    this.loading = true;
    this.studyReviewService.getStudyReviewTimelineHistory(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          //this.loading = false;
          return;
        } else {
          this.studyReviewTimelineHistory = res;
          this.columns = Object.keys(this.studyReviewTimelineHistory[0]).reverse();
          this.loading = false;
        }
        //this.loading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  get visbleColumns(): any {
    return this.columns.filter((n: any) => n != 'group');
  }

  backColor: string[] = ['#e6ffff', '#ffffff'];

  getStyle(record: any) {
    let group = record['-1'] | 0;
    group = group > 1 ? 0 : group;
    return {
      'background-color': this.backColor[group]
    };
  }

  styles = [
    { 'background-color': '#e6ffff', 'font-weight': 'bold' },
    { 'background-color': '#e6ffff' },
    { 'background-color': '#ffffff', 'font-weight': 'bold' },
    { 'background-color': '#ffffff' }
  ];

  getColumns(rowGroup: number, columns: any) {
    return rowGroup == 0 || rowGroup == 2 ? columns.slice(0, 1) : columns;
  }

  getColspan(rowGroup: number, colSpan: number): number {
    return rowGroup == 0 || rowGroup == 2 ? colSpan : 1;
  }
}
