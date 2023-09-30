import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyEditService } from '../../study-edit.service';
import { StudyTabsService } from '../study-tabs.service';

@Component({
  selector: 'app-database-lock-dashboard-main-dbl-view',
  templateUrl: './database-lock-dashboard-main-dbl-view.component.html',
  styleUrls: ['./database-lock-dashboard-main-dbl-view.component.css']
})
export class DatabaseLockDashboardMainDblViewComponent {
  loading: boolean = false;

  study: any;
  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;

  studyMainDbl: any = {};

  constructor(
    private studyEditService: StudyEditService,
    private studyTabService: StudyTabsService // private studyReviewService: StudyReviewService
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.loadStudyMainDbl(st.studyId);
      // console.log("studyId:" + st.studyId);

      // if (st?.studyType?.startsWith('DM')) {
      //   this.study = st.studyId;

      // }
      // if (st?.studyType?.startsWith('IMI')) {
      //   //this.router.navigate(['/study/imi-review-group']);
      // }
    });
  }

  loadStudyMainDbl(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getPaperDashboardDTO(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studyMainDbl = res;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
  }
}
