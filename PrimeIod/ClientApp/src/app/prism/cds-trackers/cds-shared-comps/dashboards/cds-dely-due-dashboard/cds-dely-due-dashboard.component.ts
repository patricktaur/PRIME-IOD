import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// import { CDSOutputService } from '@app/prism/cds-trackers/cds-output-task-req-group/cds-output.service';
import { CDSDelService } from '@app/prism/cds-trackers/cds-del-task-req-group/cds-del.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-cds-dely-due-dashboard',
  templateUrl: './cds-dely-due-dashboard.component.html',
  styleUrls: ['./cds-dely-due-dashboard.component.css']
})
export class CdsDelyDueDashboardComponent implements OnInit, OnDestroy {
  @Output() itemClicked = new EventEmitter<any>();
  allDueDashboard: any;
  myDueDashboard: any;
  meAsProgrammerDashboared: any;

  hasAdminRole: boolean = false;
  hasCdsManagerRole: boolean = false;
  currentUserRoleIsAdminOrCdsManager: boolean = false;

  loadSub: Subscription | undefined;
  constructor(private cdsOutputServices: CDSDelService, private credentialsService: CredentialsService) {}

  ngOnInit(): void {
    // this.loadAllDueDashboard();
    // this.loadMyDueDashboard();
    // this.loadMeAsProgrammerDashboard();

    this.hasAdminRole = this.credentialsService.userHasRolePermission(UserRoles.Admin);
    this.hasCdsManagerRole = this.credentialsService.userHasRolePermission(UserRoles.CDS_Manager);
    this.currentUserRoleIsAdminOrCdsManager = this.hasAdminRole || this.hasCdsManagerRole ? true : false;
    if (this.currentUserRoleIsAdminOrCdsManager) {
      this.loadAllDueDashboard();
    }
    if (!this.currentUserRoleIsAdminOrCdsManager) {
      this.loadMyDueDashboard();
      this.loadMeAsProgrammerDashboard();
    }
  }

  loadAllDueDashboard() {
    this.loadSub = this.cdsOutputServices.getAllDueDashboard().subscribe((res: any) => {
      this.allDueDashboard = res;
    });
  }

  loadMyDueDashboard() {
    this.loadSub = this.cdsOutputServices.getMyDueDashboard().subscribe((res: any) => {
      this.myDueDashboard = res;
    });
  }

  loadMeAsProgrammerDashboard() {
    this.loadSub = this.cdsOutputServices.getMeAsProgrammerAssignedDueDashboard().subscribe((res: any) => {
      this.meAsProgrammerDashboared = res;
    });
  }

  onItemClicked(value: any) {
    this.itemClicked.emit(value);
  }

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
