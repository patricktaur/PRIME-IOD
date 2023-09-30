import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';
import { CrmStudyDetailsEditService } from '../crm-study-details-edit.service';

@Component({
  selector: 'app-crm-study-details-view',
  templateUrl: './crm-study-details-view.component.html',
  styleUrls: ['./crm-study-details-view.component.css']
})
export class CrmStudyDetailsViewComponent {
  studyId: number = 0;
  record: any = {};
  study: any = {};
  dmDerived:boolean=false;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  
  constructor(
    private studyEditService: StudyEditService,
    private crmStudyDetailsEditService: CrmStudyDetailsEditService
  ) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('crm');

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      const studyType = st?.studyType;
      this.studyId = st?.studyId;
      
      if ( studyType.trim() == 'DM+CRM') {
        this.dmDerived=true;
        console.log('dmDerived:' + this.dmDerived);
      }

      this.loadRecord(this.studyId);
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.crmStudyDetailsEditService.getRecordForView(studyId).subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`);
        this.record = res;
        this.loading = false;
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
