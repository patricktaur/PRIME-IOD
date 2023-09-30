import { Component, OnInit } from '@angular/core';
import { Menu } from '@app/shell/menu/menu';
import { MenuStatus } from '@app/shell/menu-status';
@Component({
  selector: 'app-resources-menu',
  templateUrl: './resources-menu.component.html',
  styleUrls: ['./resources-menu.component.css']
})
export class ResourcesMenuComponent extends Menu implements OnInit {
  // constructor() {}
  public menuStat = MenuStatus;
  menuStudyXXXXXStat = this.menuStat.NotReady;
  menuResourcesSummaryReportStat = this.menuStat.NotReady;
  menuResourcesAssignmentsStat = this.menuStat.NotReady;
  menuResourcesFTEDashboardStat = this.menuStat.NotReady;

  ngOnInit(): void {}
}
