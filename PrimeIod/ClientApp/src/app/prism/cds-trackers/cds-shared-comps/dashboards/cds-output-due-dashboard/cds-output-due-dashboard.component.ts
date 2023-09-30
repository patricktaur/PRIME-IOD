import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CDSOutputService } from '@app/prism/cds-trackers/cds-output-task-req-group/cds-output.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-cds-output-due-dashboard',
  templateUrl: './cds-output-due-dashboard.component.html',
  styleUrls: ['./cds-output-due-dashboard.component.css']
})
export class CdsOutputDueDashboardComponent implements OnInit, OnDestroy {
  @Output() itemClicked = new EventEmitter<any>();
  allDueDashboard: any;
  myDueDashboard: any;
  meAsProgrammerDashboared: any;

  hasAdminRole: boolean = false;
  hasCdsManagerRole: boolean = false;
  currentUserRoleIsAdminOrCdsManager: boolean = false;

  loadSub: Subscription | undefined;
  constructor(private cdsOutputServices: CDSOutputService, private credentialsService: CredentialsService) {}

  ngOnInit(): void {
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
