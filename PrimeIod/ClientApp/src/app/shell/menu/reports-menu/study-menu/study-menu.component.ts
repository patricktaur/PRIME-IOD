import { Component, OnInit } from '@angular/core';
import { Menu } from '@app/shell/menu/menu';
import { MenuStatus } from '@app/shell/menu-status';
@Component({
  selector: 'app-study-menu',
  templateUrl: './study-menu.component.html',
  styleUrls: ['./study-menu.component.css']
})
export class StudyMenuComponent extends Menu implements OnInit {
  public menuStat = MenuStatus;

  menuStudyXXXXXStat = this.menuStat.NotReady;
  menuStudySummaryStat = this.menuStat.UatPassed;
  menuStudyDetailsStat = this.menuStat.UatPassed;
  menuStudyTimelinesStat = this.menuStat.UatPassed;
  menuStudyDeliverablesStat = this.menuStat.UatPassed;
  menuStudyExternalDatareport = this.menuStat.UatPassed;

  menuStudyEDCExperienceByStudyPhase = this.menuStat.UatPassed;
  menuStudyEDCStudyStatusBySystem = this.menuStat.UatPassed;
  menuStudyDBLSummary = this.menuStat.UatPassed;
  menuStudyDMOwnerList = this.menuStat.UatPassed;
  // menuStudyDMOwnerListVariant = this.menuStat.Ready ForUAT;
  menuStudyProjectReviewReport = this.menuStat.UatPassed;
  menuStudyProjectIssueTracker = this.menuStat.UatPassed;
  menuStudyOMRReport = this.menuStat.UatPassed;
  menuStudyCelegneDeliverables = this.menuStat.UatPassed;
  menuStudyGskKpi = this.menuStat.UatPassed;
  menuStudyFTEResource = this.menuStat.UatPassed;

  menuMissingQrReport = this.menuStat.NotReady;
  menuTimelineInterimLockReport = this.menuStat.NotReady;

  // menuStudyIMITileLines = this.menuStat.NotReady;
  // menuStudyIMIReviewReport = this.menuStat.NotReady;
  // menuStudyIMIReviewIssueTracker = this.menuStat.NotReady;
  // menuStudyIMIReaderPerformanceReport = this.menuStat.NotReady;

  // constructor() {}

  ngOnInit(): void {}
}
