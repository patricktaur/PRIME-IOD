import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyTabsService } from '@app/prism/study/study-tabs/study-tabs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-offline-view',
  templateUrl: './study-offline-ignore-view.component.html',
  styleUrls: ['./study-offline-ignore-view.component.css']
})
export class StudyOfflineViewComponent implements OnInit {
  loading: boolean = false;
  studyId: number = 0;
  records: any = [];

  studyIdSubscription: Subscription | undefined;
  loadSubscription: Subscription | undefined;

  constructor(
    private studyEditService: StudyEditService,
    private studyTabService: StudyTabsService
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyId = st.studyId;
      this.loadRecord(st.studyId);
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getOffLineIgnoreItems(studyId).subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.records = res;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  getOfflineIgnoreStatus(flag: boolean) {
    if(flag == true) {
      return "Yes";
    } else {
      return "No";
    }
  }

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
  }
}
