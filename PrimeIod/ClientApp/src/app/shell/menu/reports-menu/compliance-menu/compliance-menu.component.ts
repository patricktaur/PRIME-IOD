import { Component, OnInit } from '@angular/core';
import { Menu } from '@app/shell/menu/menu';
import { MenuStatus } from '@app/shell/menu-status';
@Component({
  selector: 'app-compliance-menu',
  templateUrl: './compliance-menu.component.html',
  styleUrls: ['./compliance-menu.component.css']
})
export class ComplianceMenuComponent extends Menu implements OnInit {
  // constructor() {}
  public menuStat = MenuStatus;
  menuProjectReviewComplianceStat = this.menuStat.UatPassed;
  menuMissingFormsAndPendingOfflineChecksStat = this.menuStat.UatPassed;
  menuMissingFormsStat = this.menuStat.UatPassed;
  menuOfflineChecksStat = this.menuStat.UatPassed;

  menuImiReviewComplianceStat = this.menuStat.ReadyForUAT;

  ngOnInit(): void {}
}
