import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { UserRoles } from '@app/core/authentication/credentials.enums';
@Component({
  selector: 'app-home-cds-dashboards',
  templateUrl: './home-cds-dashboards.component.html',
  styleUrls: ['./home-cds-dashboards.component.css']
})
export class HomeCdsDashboardsComponent implements OnInit {
  // currentUserId: string;
  totalCount: number = 0;

  hasAdminRole: boolean = false;
  hasCdsManagerRole: boolean = false;
  currentUserRoleIsAdminOrCdsManager: boolean = false;

  constructor(
    public router: Router,
    private actRoute: ActivatedRoute,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    // this.currentUserId = this.credentialsService.currentUser.id;
    //return this.credService.userHasResourcePermission(this.review?.studyId, UserRoles.IMI_PM);
    this.hasAdminRole = this.credentialsService.userHasRolePermission(UserRoles.Admin);
    this.hasCdsManagerRole = this.credentialsService.userHasRolePermission(UserRoles.CDS_Manager);
    this.currentUserRoleIsAdminOrCdsManager = this.hasAdminRole || this.hasCdsManagerRole ? true : false;
  }
  //http://localhost:4200/cds-trackers/development-request/dashboard-list?status=Submitted

  onItemClicked(item: any) {
    //cds-trackers/development-request/dashboard-list
    //cds-trackers/development-request/list
    // console.log("home dashboard item:" + JSON.stringify(item));
    const path = 'cds-trackers/development-request/list';
    this.router.navigate([path], {
      // relativeTo: this.actRoute.parent,
      queryParams: { tag: item.tag, status: item.selectedItem }
    });
  }

  /*
item:{"tag":"my-due","selectedItem":{"keyValue":"overdue","value":3,"displayText":"Overdue"}}
http://localhost:4200/cds-trackers/output-request/dashboard-list?dueType=my-due-overdue  

*/

  onOutputDashboardClicked(item: any) {
    const path = 'cds-trackers/output-request/list';
    //cds-trackers/output-request/dashboard-list
    const dueType = item.tag + '-' + item.selectedItem.keyValue;
    this.router.navigate([path], {
      // relativeTo: this.actRoute.parent,
      queryParams: { dueType: dueType }
    });
  }

  onDelyDashboardClicked(item: any) {
    const path = 'cds-trackers/delivery-request/list';
    //'cds-trackers/delivery-request/dashboard-list'
    const dueType = item.tag + '-' + item.selectedItem.keyValue;
    //
    this.router.navigate([path], {
      // relativeTo: this.actRoute.parent,
      queryParams: { dueType: dueType }
    });
  }
}
