import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';
import { CrmListService } from '@app/prism/crm/crm-shared/crm-list/crm-list.service';

@Component({
  selector: 'app-study-crm-dashboard',
  templateUrl: './study-crm-dashboard.component.html',
  styleUrls: ['./study-crm-dashboard.component.css']
})
export class StudyCrmDashboardComponent implements OnInit, OnDestroy {
  studyDashboard: any;
  subscription: Subscription | undefined;
  loadSubscription: Subscription | undefined;
  constructor(private studyEditService: StudyEditService, private crmListService: CrmListService) {}

  ngOnInit(): void {
    // this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      
    //   this.loadRecord(st.studyId);
    // });
    this.subscription = this.studyEditService._studyId.subscribe((studyId: any) => {
      if (studyId){
        this.loadRecord(studyId);
      }
      
    });
  }

  loadRecord(studyId: number) {
    this.loadSubscription = this.crmListService.getRecord(studyId).subscribe((res: any) => {
      this.studyDashboard = res;
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
