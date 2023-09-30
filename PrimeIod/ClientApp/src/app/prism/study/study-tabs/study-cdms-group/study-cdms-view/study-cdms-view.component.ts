import { Component } from '@angular/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { Subscription } from 'rxjs';
import { StudyTabsService } from '../../study-tabs.service';

@Component({
  selector: 'app-study-cdms-view',
  templateUrl: './study-cdms-view.component.html',
  styleUrls: ['./study-cdms-view.component.css']
})
export class StudyCdmsViewComponent {
  loading: boolean = false;
  studyId: number = 0;
  record: any = {};
  study: any;

  yesNoParId = 600;
  cdmsRoleId = 203;
  cdmsVersionParId = 2100;
  rolesPermissionsParId = 650;

  timelineValidation: any = {};
  updateTimelines: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;

  // hasDMManagerRole: boolean = false;

  constructor(
    private studyEditService: StudyEditService,
    private studyTabService: StudyTabsService,
  ) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;

        this.loadRecord(st.studyId);
      }
      if (st?.studyType?.startsWith('IMI')) {
        //this.router.navigate(['/study/imi-review-group']);
      }
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getStudyCdmsViewDTO(studyId).subscribe(
      (res: any) => {
        console.log(`study cdms view = ${JSON.stringify(res, null, 2)}`);
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

  getYesOrNOStatus(flag: boolean) {
    if(flag == true) {
      return "Yes";
    }else {
      return "No";
    }
  }
}
