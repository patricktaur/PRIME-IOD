import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';
import { Subscription } from 'rxjs';
import { StudyTabsService } from '../../study-tabs.service';

@Component({
  selector: 'app-study-kpi-view',
  templateUrl: './study-kpi-view.component.html',
  styleUrls: ['./study-kpi-view.component.css']
})
export class StudyKpiViewComponent {
  loading: boolean = false;
  studyId: number = 0;
  record: any = undefined;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;

  constructor(
    private studyEditService: StudyEditService, 
    private studyTabService: StudyTabsService
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;
        this.loadRecord(st.studyId);
      }
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getStudyKpiDTO(studyId).subscribe(
      (res: any) => {
        console.log(`kpi res = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
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
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
  }
}
