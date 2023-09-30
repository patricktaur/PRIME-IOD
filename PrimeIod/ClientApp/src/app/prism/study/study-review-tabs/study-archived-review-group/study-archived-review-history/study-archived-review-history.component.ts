import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyReviewService } from '@app/prism/study/study-review.service';

@Component({
  selector: 'app-study-archived-review-history',
  templateUrl: './study-archived-review-history.component.html',
  styleUrls: ['./study-archived-review-history.component.css']
})
export class StudyArchivedReviewHistoryComponent implements OnInit, OnDestroy {
  studyId: number = 0;
  studyReviewHistory: any;
  columns: any;

  loading: boolean = false;

  studyIdSubscription: Subscription | undefined;
  loadSub: Subscription | undefined;

  constructor(
    public router: Router,

    private studyEditService: StudyEditService,
    private studyReviewService: StudyReviewService
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadStudyReviewHistory(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });
  }

  loadStudyReviewHistory(studyId: number) {
    this.loading = true;
    this.loadSub = this.studyReviewService.getStudyArchivedReviewHistory(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studyReviewHistory = res;
          this.columns = Object.keys(this.studyReviewHistory[0]).reverse();
          this.loading = false;
        }
        //console.log(this.studyReviewHistory)
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  get viisbleColumns(): any {
    return this.columns?.filter((n: any) => n != '-1');
  }
  // filter7 = filter6.filter((n: any) => filter.sponsor.indexOf(n.sponsor) != -1);
  colorValue: string[] = ['#F44336', '#F44336', '#F44336', '#FFC107', '#FFC107', '#66BB6A'];

  backColor: string[] = ['#D6EAF8', '#EAFAF1', '#ffffff', '#A2D9CE'];

  getStyle(record: any, column: any) {
    let value = record[column];
    if (value && value >= 0 && value <= 5) {
      return {
        'background-color': this.colorValue[value],
        'text-align': 'center',
        'vertical-align': 'middle',
        'font-weight': 'bold',
        color: 'white',
        padding: '5px',
        'border-radius': '5px'
      };
    } else {
      let group = record['-1'] | 0;
      group = group > 3 ? 0 : group;
      return {
        'background-color': this.backColor[group]
      };
    }
  }

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
    this.studyIdSubscription?.unsubscribe();
  }
}
