import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyEditService } from '../../study-edit.service';
import { StudyTabsService } from '../study-tabs.service';

@Component({
  selector: 'app-study-local-labs-view',
  templateUrl: './study-local-labs-view.component.html',
  styleUrls: ['./study-local-labs-view.component.css']
})
export class StudyLocalLabsViewComponent {
  studyId: number | any;
  record: any = {};
  study: any;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;

  constructor(
    private studyEditService: StudyEditService,
    private studyTabService: StudyTabsService
  ) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
    this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      if (this.studyId > 0) {
        this.loadRecord(this.studyId);
      }
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getStudyLocalLabViewDTO(studyId).subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`);
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
}
