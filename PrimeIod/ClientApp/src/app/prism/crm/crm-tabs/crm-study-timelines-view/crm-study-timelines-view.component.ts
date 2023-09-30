import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';
import { CrmStudyTimelinesEditService } from '../crm-study-timelines-edit.service';

@Component({
  selector: 'app-crm-study-timelines-view',
  templateUrl: './crm-study-timelines-view.component.html',
  styleUrls: ['./crm-study-timelines-view.component.css']
})
export class CrmStudyTimelinesViewComponent {
  studyId: number = 0;
  record: any = {};
  study: any = {};
  
  dmDerived:boolean=false;
  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  
  constructor(
    private studyEditService: StudyEditService,
    private crmStudyTimelinesEditService: CrmStudyTimelinesEditService,
  ) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('crm');
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      const studyType = st?.studyType;
      this.studyId = st?.studyId;
      this.loadRecord(this.studyId);

      if ( studyType.trim() == 'DM+CRM') {
        this.dmDerived=true;
        console.log('dmDerived:' + this.dmDerived);
      }
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.crmStudyTimelinesEditService.getRecordForEdit(studyId).subscribe(
      (res: any) => {
        this.record = res;
        this.loading = false;
        // }
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
