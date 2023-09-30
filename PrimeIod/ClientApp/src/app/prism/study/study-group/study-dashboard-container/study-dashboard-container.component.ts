import { Component, OnInit } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { IStudyDashboard } from '@app/prism/study/study-dashboards/i-study-dashboard';
import { StudyDmDashboardComponent } from '@app/prism/study/study-dashboards/study-dm-dashboard/study-dm-dashboard.component';
import { StudyImiDashboardComponent } from '@app/prism/study/study-dashboards/study-imi-dashboard/study-imi-dashboard.component';
import { StudyCrmDashboardComponent } from '@app/prism/crm/crm-shared/study-dashboards/study-crm-dashboard/study-crm-dashboard.component';
@Component({
  selector: 'app-study-dashboard-container',
  templateUrl: './study-dashboard-container.component.html',
  styleUrls: ['./study-dashboard-container.component.css']
})
export class StudyDashboardContainerComponent implements OnInit {
  dashboardType: string = "";
  childComponent: IStudyDashboard = StudyDmDashboardComponent;
  constructor(private sharedService: StudyEditService) {}

  ngOnInit(): void {
    this.sharedService.dashboard.subscribe((type: string) => {
      if (this.dashboardType !== type) {
        this.dashboardType = type;
        switch (type) {
          case 'dm':
            this.childComponent = StudyDmDashboardComponent;
            break;
          case 'imi':
            this.childComponent = StudyImiDashboardComponent;
            break;

          case 'crm':
            this.childComponent = StudyCrmDashboardComponent;
            break;
          default:
            break;
        }
      }
    });
  }
}
