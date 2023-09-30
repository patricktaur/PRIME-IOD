import { Component, OnInit } from '@angular/core';
import { Menu } from '@app/shell/menu/menu';
import { MenuStatus } from '@app/shell/menu-status';
@Component({
  selector: 'app-cds-menu',
  templateUrl: './cds-menu.component.html',
  styleUrls: ['./cds-menu.component.css']
})
export class CdsMenuComponent extends Menu implements OnInit {
  // constructor() {}
  public menuStat = MenuStatus;
  menuStudyXXXXXStat = this.menuStat.NotReady;
  menuCDSDevelopmentTasksStat = this.menuStat.ReadyForUAT;
  menuCDSOutputTasksStat = this.menuStat.ReadyForUAT;
  menuCDSDeliveryTasksStat = this.menuStat.ReadyForUAT;
  menuCDSStat = this.menuStat.ReadyForUAT;
  menuCDSInstructionTaskStat = this.menuStat.ReadyForUAT;
  menuCDSValidationRequestStat = this.menuStat.ReadyForUAT;
  menuDMProcessImprovementTrackerStat = this.menuStat.ReadyForUAT;

  ngOnInit(): void {}
}
