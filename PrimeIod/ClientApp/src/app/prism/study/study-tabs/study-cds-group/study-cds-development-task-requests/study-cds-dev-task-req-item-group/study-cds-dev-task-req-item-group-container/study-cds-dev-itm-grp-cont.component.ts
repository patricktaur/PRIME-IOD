import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter} from 'rxjs/operators';

import { StudyCdsRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
import { StudyCDSDevReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-req.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-study-cds-dev-task-req-item-group-container',
  templateUrl: './study-cds-dev-itm-grp-cont.component.html',
  styleUrls: ['./study-cds-dev-itm-grp-cont.component.css']
})
export class StudyCdsDevTaskReqItemGroupContainerComponent implements OnInit, OnDestroy {
  id: number = 0; //recId for Edit
  studyId: number = 0;
  studyType = "";
  menuAccessLink = "";
  dashboardRecord: any;

  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;
  markAsCompletedSub: Subscription | undefined;
  studyPropSub: Subscription | undefined;
  serverResponses: any = [];
  // hasDMManagerRole: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestIdService: StudyCdsRequestIdService,
    public location: Location,
    private dataService: StudyCDSDevReqService,
    @Inject('cds-development-server-response') private serverResponseService: ServerResponseService,
    private studyEditService: StudyEditService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    // this.id = +this.route.snapshot.queryParamMap.get('id');
    this.route.queryParamMap.subscribe((params: any) => {
      this.id = +params.get('id');
      this.loadDashboardRecord(this.id);
    });

    this.router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
        // console.log('Navigation change detected:', event.url);
        // Trigger a reload or update of dashboard values here
        if (this.id){
          this.loadDashboardRecord(this.id);
        }
    });
    

    this.serverResponses = this.serverResponseService.serverResponses;

    //this page content becomes invalid if the StudyIconNumber dropdown is changed and refers to another study.
    //hence returning back to list.
    this.studyPropSub = this.studyEditService.getStudyProperties().subscribe((stProp: any) => {
      this.studyType = stProp.studyType?.toLowerCase().replace("+", "-").trim();
      
      if(this.router.url.startsWith("/study/")) {
        this.menuAccessLink = 'study/'+ this.studyType +'/cds-group/development-request/item-group/edit';
      } else {
        this.menuAccessLink = 'cds-trackers/development-request/item-group/edit';
      }
      if (this.studyId && this.studyId !== stProp.studyId) {
        this.location.back();
      } else {
        this.studyId = stProp.studyId;
      }
    });
    // this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
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

  markAsCompleted(recId: number) {
    this.deleteRecordSub = this.dataService.markAsCompleted(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          // this.loading = false;
          return;
        } else {
          // this.records = res;
          // this.loading = false;
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
        if (res.status === 400) {
          // this.loading = false;
          return;
        } else {
          // this.records = res;
          // this.loading = false;
          this.serverResponseService.addServerMessages(res);
          this.serverResponses = this.serverResponseService.serverResponses;
          let lastItem = res.length > 0 ? res[res.length - 1] : 0;
          this.router.navigate([], {
            relativeTo: this.route.parent,
            queryParams: { id: lastItem.id },
            state: { id: lastItem.id }
            // skipLocationChange: true
            // queryParamsHandling: 'merge'
          });
          // .then(() => {
          //   window.location.reload();
          // });
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
    this.deleteRecordSub?.unsubscribe();
    this.markAsCompletedSub?.unsubscribe();
    this.studyPropSub?.unsubscribe();
  }
}
