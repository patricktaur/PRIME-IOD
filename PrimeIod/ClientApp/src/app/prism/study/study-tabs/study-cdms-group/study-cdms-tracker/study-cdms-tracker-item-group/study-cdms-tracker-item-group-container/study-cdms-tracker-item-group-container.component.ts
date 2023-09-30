import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
// import { StudyCdsRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
import { CdmsTrackerService } from '@app/prism/study/study-tabs/study-cdms-group/study-cdms-tracker/cdms-tracker.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { CredentialsService } from '@app/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-cdms-tracker-item-group-container',
  templateUrl: './study-cdms-tracker-item-group-container.component.html',
  styleUrls: ['./study-cdms-tracker-item-group-container.component.css']
})
export class StudyCdmsTrackerItemGroupContainerComponent implements OnInit, OnDestroy {
  id: number = 0; //recId for Edit
  studyId: number = 0;
  studyType = "";
  menuAccessLink = "";

  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;
  subscription: Subscription | undefined;

  serverResponses: any = [];

  mode: string = "";
  isViewMode: boolean = false;
  showFooterActions: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public location: Location,
    private dataService: CdmsTrackerService,
    @Inject('cdms-tracker') private serverResponseService: ServerResponseService,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService
  ) {}

  ngOnInit(): void {
    let id : string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }
    
    if (!this.id) {
      let stateObj: any = this.location.getState();
      this.id = stateObj.id;
    }
        
    this.subscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      // console.log(`study = ${JSON.stringify(st, null, 2)}`);
      this.studyId = st.studyId;
      this.studyType = st.studyType.toLowerCase().replace("+", "-").trim();
      this.menuAccessLink = 'study/'+ this.studyType +'/cdms-group/cdms-tracker/item-group/edit';
    });
  }

  copyLink() {
    navigator.clipboard
      .writeText(window.location.href)
      .then()
      .catch(e => console.error(e));
  }

  delete(recId: number) {
    // this.loading = true;
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.deleteRecordSub = this.dataService.deleteRecord(recId).subscribe(
      (res: any) => {
        this.serverResponseService.addServerMessages(res);
        this.serverResponses = this.serverResponseService.serverResponses;
        this.back();
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.loading = false;
      }
    );
  }

  back() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.deleteRecordSub?.unsubscribe;
  }
}
