import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';

@Component({
  selector: 'app-study-dm-dashboard',
  templateUrl: './study-dm-dashboard.component.html',
  styleUrls: ['./study-dm-dashboard.component.css']
})
export class StudyDmDashboardComponent implements OnInit, OnDestroy {
  studyDashboard: any;
  subscription: Subscription | undefined;
  constructor(private studyEditService: StudyEditService) {}

  ngOnInit(): void {
    this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyDashboard = st;
    });
  }

  column: UIGridColumn = {
    header: 'Project Score',
    field: 'overallProjectScore',
    align: 'center',
    backgroundStyle: 'one-to-five-score',
    width: 10
  };
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
