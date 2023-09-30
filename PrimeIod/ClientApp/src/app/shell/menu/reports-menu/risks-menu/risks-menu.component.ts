import { Component, OnInit } from '@angular/core';
import { Menu } from '@app/shell/menu/menu';
import { MenuStatus } from '@app/shell/menu-status';
@Component({
  selector: 'app-risks-menu',
  templateUrl: './risks-menu.component.html',
  styleUrls: ['./risks-menu.component.css']
})
export class RisksMenuComponent extends Menu implements OnInit {
  // constructor() {}
  public menuStat = MenuStatus;
  menuStudyXXXXXStat = this.menuStat.NotReady;
  menuStudyTaskAtRiskListStat = this.menuStat.NotReady;
  menuStudyTasksFlaggedAsAlertsStat = this.menuStat.NotReady;

  menuStudyRiskScoreGraphicalScatterPlotStat = this.menuStat.NotReady;
  menuStudyTasksAtRiskFrequencyStat = this.menuStat.NotReady;
  menuStudyRiskScoreHistoryListStat = this.menuStat.NotReady;
  menuStudyRiskScoreHistoryBarChartStat = this.menuStat.NotReady;

  ngOnInit(): void {}
}
