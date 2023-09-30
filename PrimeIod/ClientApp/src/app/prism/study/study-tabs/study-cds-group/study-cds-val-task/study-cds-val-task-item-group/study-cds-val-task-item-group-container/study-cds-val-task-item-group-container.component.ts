import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { StudyCdsRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
// import { StudyCDSDevReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-req.service';
import { StudyCDSValReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-val-task/study-cds-val-req.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-cds-val-task-item-group-container',
  templateUrl: './study-cds-val-task-item-group-container.component.html',
  styleUrls: ['./study-cds-val-task-item-group-container.component.css']
})
export class StudyCdsValTaskItemGroupContainerComponent implements OnInit, OnDestroy {
  id: number = 0; //recId for Edit
  studyId: number = 0;
  dashboardRecord: any;
  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;
  markAsCompletedSub: Subscription | undefined;
  studyPropSub: Subscription | undefined;

  serverResponses: any = [];

  studyType = "";
  menuAccessLink = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestIdService: StudyCdsRequestIdService,
    public location: Location,
    private dataService: StudyCDSValReqService,
    private studyEditService: StudyEditService,
    @Inject('cds-validation-server-response') private serverResponseService: ServerResponseService
  ) {}

  ngOnInit(): void {
   let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }
    this.loadDashboardRecord(this.id);
    this.serverResponses = this.serverResponseService.serverResponses;

    //this page content becomes invalid if the StudyIconNumber dropdown is changed and refers to another study.
    //hence returning back to list.
    this.studyPropSub = this.studyEditService.getStudyProperties().subscribe((stProp: any) => {
      if(this.router.url.startsWith("/study/")) {
        this.menuAccessLink = 'study/'+ this.studyType +'/cds-group/output-request/item-group/edit';
      } else {
        this.menuAccessLink = 'cds-trackers/output-request/item-group/edit';
      }
      if (this.studyId && this.studyId !== stProp.studyId) {
        this.location.back();
      } else {
        this.studyId = stProp.studyId;
      }
    });
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

  copyLink() {
    navigator.clipboard
      .writeText(window.location.href)
      .then()
      .catch(e => console.error(e));
  }

  // markAsCompleted(value: any) {
  //   console.log('In delete:' + value);
  //   if (value == 'confirm') {
  //     this.updateMarkAsDeleted(this.id);
  //   }
  // }
  markAsCompleted(recId: number) {
    this.deleteRecordSub = this.dataService.markAsCompleted(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          // this.loading = false;
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
  clone(recId: number) {
    this.deleteRecordSub = this.dataService.clone(recId).subscribe(
      (res: any) => {
        this.serverResponseService.addServerMessages(res);
        this.serverResponses = this.serverResponseService.serverResponses;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.loading = false;
      }
    );
  }
  // delete(value: any) {
  //   console.log('In delete:' + value);
  //   if (value == 'confirm') {
  //     this.deleteRecord(this.id);
  //   }
  // }

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
    this.deleteRecordSub?.unsubscribe();
    this.markAsCompletedSub?.unsubscribe();
    this.studyPropSub?.unsubscribe();
  }
}
