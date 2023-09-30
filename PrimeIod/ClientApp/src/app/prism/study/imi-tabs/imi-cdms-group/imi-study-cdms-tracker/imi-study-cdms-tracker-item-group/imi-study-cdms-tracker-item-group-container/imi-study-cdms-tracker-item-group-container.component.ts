import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
// import { StudyCdsRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
import { CdmsTrackerService } from '@app/prism/study/study-tabs/study-cdms-group/study-cdms-tracker/cdms-tracker.service';
import { ImiCdmsTrackerService } from '@app/prism/study/imi-tabs/imi-cdms-group/imi-study-cdms-tracker/imi-cdms-tracker.service';

import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-imi-study-cdms-tracker-item-group-container',
  templateUrl: './imi-study-cdms-tracker-item-group-container.component.html',
  styleUrls: ['./imi-study-cdms-tracker-item-group-container.component.css']
})
export class ImiStudyCdmsTrackerItemGroupContainerComponent implements OnInit, OnDestroy {
  id: number = 0; //recId for Edit

  studyId: number = 0;
  studyType = "";
  menuAccessLink = "";

  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;
  subscription: Subscription | undefined;

  serverResponses: any = [];
  mode: string = "";
  showFooterActions: boolean = false;
  
  // isViewMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public location: Location,
    private dataService: ImiCdmsTrackerService,
    private studyEditService: StudyEditService,
    @Inject('imi-cdms-tracker') private serverResponseService: ServerResponseService
  ) {}

  ngOnInit(): void {
   let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }
    if (!this.id) {
      let stateObj: any = this.location.getState();
      this.id = stateObj.id;
    }
    this.serverResponses = this.serverResponseService.serverResponses;

    let routeParent: any = this.route.parent;
    this.mode = routeParent.snapshot.data['mode'];

    // this.showFooterActions = this.mode != 'view' ? true : false;
    // if (this.mode == 'view') {
    //   //remove edit - del button columns
    //   this.isViewMode = true;
    // }

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
