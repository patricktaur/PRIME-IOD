import { Component, OnInit } from '@angular/core';
import { Menu } from '@app/shell/menu/menu';
import { MenuStatus } from '@app/shell/menu-status';
@Component({
  selector: 'app-imi-cds-menu',
  templateUrl: './imi-cds-menu.component.html',
  styleUrls: ['./imi-cds-menu.component.css']
})
export class ImiCdsMenuComponent extends Menu implements OnInit {
  // constructor() {}
  public menuStat = MenuStatus;

  menuStudyIMITileLines = this.menuStat.ReadyForUAT;
  menuStudyIMIReviewReport = this.menuStat.ReadyForUAT;
  menuStudyIMIReviewIssueTracker = this.menuStat.ReadyForUAT;
  menuStudyIMIReaderPerformanceReport = this.menuStat.ReadyForUAT;

  menuImiReviewComplianceStat = this.menuStat.ReadyForUAT;

  menuIMICDMSReportStat = this.menuStat.ReadyForUAT;
  menuIMIDMCDMSStat = this.menuStat.ReadyForUAT;
  menuIMICDMSTaskListStat = this.menuStat.ReadyForUAT;
  menuIMICDMSTaskGroupStat = this.menuStat.ReadyForUAT;

  menuStudyRnADevpRequestStat = this.menuStat.ReadyForUAT;
  menuStudyRnAOutputRequestStat = this.menuStat.ReadyForUAT;

  menuStudyXXXXXStat = this.menuStat.NotReady;

  ngOnInit(): void {}
}
