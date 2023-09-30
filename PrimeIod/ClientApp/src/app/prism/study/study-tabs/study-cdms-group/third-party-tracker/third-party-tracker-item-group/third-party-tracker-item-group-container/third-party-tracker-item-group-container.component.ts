import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThirdPartyTrackerService } from '@app/prism/study/study-tabs/study-cdms-group/third-party-tracker/third-party-tracker.service';
import { ServerResponseService } from '@app/shared/server-response/server-response.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-third-party-tracker-item-group-container',
  templateUrl: './third-party-tracker-item-group-container.component.html',
  styleUrls: ['./third-party-tracker-item-group-container.component.css']
})
export class ThirdPartyTrackerItemGroupContainerComponent implements OnInit, OnDestroy {
  id: number = 0; //recId for Edit
  studyId: number = 0;
  studyType = "";
  menuAccessLink = "";

  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  subscription: Subscription | undefined;

  serverResponses: any = [];

  // hasDMManagerRole: boolean = true;
  isViewMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public location: Location,
    private dataService: ThirdPartyTrackerService,
    @Inject('cdms-third-party-tracker') private serverResponseService: ServerResponseService,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService
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
    
    this.subscription = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      this.studyType = st.studyType.toLowerCase().replace("+", "-").trim();
      this.menuAccessLink = 'study/'+ this.studyType +'/cdms-group/third-party-cdms-tracker/item-group/edit';
    });

    // this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM_Manager);
    // //alert(this.credentialsService.userRoles);
    // if(this.hasDMManagerRole!=true){
    //   this.hasDMManagerRole = this.credentialsService.userRoles.includes(UserRoles.Admin);
    // }
    // if(this.hasDMManagerRole!=true){
    //   this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.DMPM);
    // }
    // if(this.hasDMManagerRole!=true){
    //   this.hasDMManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.CDL);
    // }
 

    this.serverResponses = this.serverResponseService.serverResponses;
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
