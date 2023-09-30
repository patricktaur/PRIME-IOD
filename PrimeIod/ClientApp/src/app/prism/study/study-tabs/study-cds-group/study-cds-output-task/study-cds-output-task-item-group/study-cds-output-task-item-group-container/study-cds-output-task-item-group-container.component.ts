import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter} from 'rxjs/operators';
import { StudyCdsRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
import { StudyCDSOutputReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-output-task/study-cds-output-req.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
@Component({
  selector: 'app-study-cds-output-task-item-group-container',
  templateUrl: './study-cds-output-task-item-group-container.component.html',
  styleUrls: ['./study-cds-output-task-item-group-container.component.css']
})
export class StudyCdsOutputTaskItemGroupContainerComponent implements OnInit, OnDestroy {
  id: number | undefined; //recId for Edit
  studyId: number = 0;
  studyType = "";
  menuAccessLink = "";
  dashboardRecord: any;
  loading: boolean = false;
  isCompleted: boolean = false;

  loadRecordSub: Subscription | undefined;
  studyPropSub: Subscription | undefined;

  deleteRecordSub: Subscription | undefined;
  markAsCompletedSub: Subscription | undefined;
  subscription: Subscription | undefined;

  serverResponses: any = [];

  // hasDMManagerRole: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestIdService: StudyCdsRequestIdService,
    public location: Location,
    private dataService: StudyCDSOutputReqService,
    @Inject('cds-output-server-response') private serverResponseService: ServerResponseService,
    private studyEditService: StudyEditService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    // this.id = +this.route.snapshot.queryParamMap.get('id');
    // this.loadDashboardRecord(this.id);

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
    
    // this.subscription = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.studyId = st;
    // });

    this.serverResponses = this.serverResponseService.serverResponses;

    //this page content becomes invalid if the StudyIconNumber dropdown is changed and refers to another study.
    //hence returning back to list.
    this.studyPropSub = this.studyEditService.getStudyProperties().subscribe((stProp: any) => {
      this.studyType = stProp.studyType?.toLowerCase().replace("+", "-").trim();
      // this.menuAccessLink = 'study/'+ this.studyType +'/cds-group/output-request/item-group/edit';
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
    // this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
  }

  loadDashboardRecord(recId: number | any) {
    this.loadRecordSub = this.dataService.getDashboardView(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.dashboardRecord = res;
          this.isCompleted = res.completedDate ? true : false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  // addServerMessages(serverResponse : any){
  //   this.serverResponses.push(... serverResponse);
  // }

  copyLink() {
    navigator.clipboard
      .writeText(window.location.href)
      .then()
      .catch(e => console.error(e));
  }

  markAsCompleted(recId: number) {
    this.loading = true;
    this.deleteRecordSub = this.dataService.markAsCompleted(recId).subscribe(
      (res: any) => {
        // this.serverResponseService.addServerMessages(res);
        // this.serverResponses = this.serverResponseService.serverResponses;
        // this.back();
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.loading = false;
          this.serverResponseService.addServerMessages(res);
          this.serverResponses = this.serverResponseService.serverResponses;

          this.back();
        }
      },
      (err: any) => {
        this.loading = false;
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }
  clone(recId: number) {
    this.deleteRecordSub = this.dataService.clone(recId).subscribe(
      (res: any) => {
        // console.log("xxx:" + JSON.stringify(res));
        // this.serverResponseService.addServerMessages(res);
        // this.serverResponses = this.serverResponseService.serverResponses;
        // let lastItem = res.length > 0 ? res[res.length - 1] : 0;
        // this.router.navigate(['item-group'], {
        //   relativeTo: this.route.parent,
        //   queryParams: { id: lastItem.id },
        //   state: { id: lastItem.id }
        // });
        this.serverResponseService.addServerMessages(res);
          this.serverResponses = this.serverResponseService.serverResponses;
          let lastItem = res.length > 0 ? res[res.length - 1] : 0;
          this.router.navigate([], {
            relativeTo: this.route.parent,
            queryParams: { id: lastItem.id },
            state: { id: lastItem.id }

          });

      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  delete(recId: number) {
    this.deleteRecordSub = this.dataService.deleteRecord(recId).subscribe(
      (res: any) => {
        this.serverResponseService.addServerMessages(res);
        this.serverResponses = this.serverResponseService.serverResponses;
        this.back();
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
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
