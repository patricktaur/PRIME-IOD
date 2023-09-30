import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { StudyCdsRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
// import { StudyCDSDevReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-req.service';
import { ImiRaOutReqService } from '@app/prism/study/imi-tabs/imi-trackers-group/imi-ra-output-req/imi-ra-out-req.service';

import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { CredentialsService } from '@app/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-imi-ra-output-item-group-container',
  templateUrl: './imi-ra-output-item-group-container.component.html',
  styleUrls: ['./imi-ra-output-item-group-container.component.css']
})
export class ImiRaOutputReqItemGroupContainerComponent implements OnInit {
  id: number = 0; //recId for Edit
  studyId: number = 0;

  dashboardRecord: any;

  studyIdSubscription: Subscription | undefined;
  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;
  markAsCompletedSub: Subscription | undefined;

  serverResponses: any = [];
  // hasImiManagerRole: boolean = false;

  mode: string = "";
  isViewMode: boolean = false;

  studyType = "";
  menuAccessLink = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studyEditService: StudyEditService,
    private credentialsService: CredentialsService,
    private requestIdService: StudyCdsRequestIdService,
    public location: Location,
    private dataService: ImiRaOutReqService,
    @Inject('imi-ra-output-server-response') private serverResponseService: ServerResponseService
  ) {}

  ngOnInit(): void {
   let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.studyType = st.studyType?.toLowerCase().replace("+", "-").trim();
      // this.menuAccessLink = 'study/'+ this.studyType +'/cds-group/development-request/item-group/edit';
      if(this.router.url.startsWith("/study/")) {
        this.menuAccessLink = 'study/'+ this.studyType +'/imi-trackers-group/imi-ra-output-request/item-group/edit';
      } else {
        this.menuAccessLink = 'imi-ra-trackers/imi-ra-output-req-group/item-group/edit';
      }
      if (st?.studyType == 'IMI' || st?.studyType == 'DM+IMI') {
        this.studyId = st.studyId;
        // this.loadStudyStatus(st.studyId);
      }
      // this.hasImiManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.IMI_PM);

    });

    let routeParent: any = this.route.parent;
    this.mode = routeParent.snapshot.data['mode'];

    if (this.mode == 'view') {
      //remove edit - del button columns
      this.isViewMode = true;
      // this.columns.splice(0, 2);
    }
    this.loadDashboardRecord(this.id);

    this.serverResponses = this.serverResponseService.serverResponses;
  }

  loadDashboardRecord(recId: number) {
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.dataService.getDashboardView(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.dashboardRecord = res;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  clone(recId: number) {
    this.deleteRecordSub = this.dataService.clone(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          // this.loading = false;
          return;
        } else {
          this.serverResponseService.addServerMessages(res);
          this.serverResponses = this.serverResponseService.serverResponses;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.loading = false;
      }
    );
  }

  delete(recId: number) {
    this.deleteRecordSub = this.dataService.deleteRecord(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.serverResponseService.addServerMessages(res);
          this.serverResponses = this.serverResponseService.serverResponses;
          this.back();
        }
        // this.isLoading = false;
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
    this.markAsCompletedSub?.unsubscribe;
  }
}
