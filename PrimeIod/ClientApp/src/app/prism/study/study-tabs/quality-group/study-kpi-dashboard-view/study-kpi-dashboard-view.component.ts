import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';
import { Subscription } from 'rxjs';
import { StudyTabsService } from '../../study-tabs.service';

@Component({
  selector: 'app-study-kpi-dashboard-view',
  templateUrl: './study-kpi-dashboard-view.component.html',
  styleUrls: ['./study-kpi-dashboard-view.component.css']
})
export class StudyKpiDashboardViewComponent {
  loading: boolean = false;
  studyId: number = 0;
  records: any = [];

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
        this.loadRecords(st.studyId);
      }
    });
  }

  loadRecords(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getStudyKpiDashboard(studyId).subscribe(
      (res: any) => {
        // console.log(`res = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.records = res;
          // this.form.reset();
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  columnKpiDescription: UIGridColumn = {
    field: 'kpiDescription',
    width: 30
  };

  columncriteriaForPass: UIGridColumn = {
    field: 'criteriaForPass',
    width: 30
  };

  getKpiOutcomeStyle(kpiOutcome: string) {
    if (kpiOutcome === 'Pass') {
      return { 'background-color': 'green' };
    } else if (kpiOutcome === 'Fail') {
      return { 'background-color': 'red' };
    } else if (kpiOutcome === 'NA') {
      return { 'background-color': 'grey' };
    }
    return {};
  }
}
