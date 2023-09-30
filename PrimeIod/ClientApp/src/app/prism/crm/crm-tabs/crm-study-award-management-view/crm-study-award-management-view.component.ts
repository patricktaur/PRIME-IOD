import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';
import { CrmStudyAwardManagementEditService } from '../crm-study-award-management-edit.service';

@Component({
  selector: 'app-crm-study-award-management-view',
  templateUrl: './crm-study-award-management-view.component.html',
  styleUrls: ['./crm-study-award-management-view.component.css']
})
export class CrmStudyAwardManagementViewComponent {
  studyId: number = 0;
  record: any;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  
  constructor(
    private studyEditService: StudyEditService,
    private crmStudyAwardManagementEditService: CrmStudyAwardManagementEditService,
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      const studyType = st?.studyType;
      this.studyId = st?.studyId;
      this.studyEditService.setDashboard('crm');

      if (studyType === 'CRM' || studyType === 'DM+CRM') {
        this.loadRecord(this.studyId);
      }
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.crmStudyAwardManagementEditService.getRecordForView(studyId).subscribe(
      (res: any) => {
        this.record = res;
        this.loading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }
}
