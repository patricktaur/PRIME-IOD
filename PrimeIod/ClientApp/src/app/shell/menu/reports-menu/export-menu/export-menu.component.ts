import { Component, OnInit } from '@angular/core';
import { Menu } from '@app/shell/menu/menu';
import { MenuStatus } from '@app/shell/menu-status';
@Component({
  selector: 'app-export-menu',
  templateUrl: './export-menu.component.html',
  styleUrls: ['./export-menu.component.css']
})
export class ExportMenuComponent extends Menu implements OnInit {
  // constructor() {}
  public menuStat = MenuStatus;
  menuStudyDmStat = this.menuStat.ReadyForUAT;
  menuStudyCdsStat = this.menuStat.ReadyForUAT;
  menuStudyCdmsStat = this.menuStat.ReadyForUAT;
  menuStudyImiStat = this.menuStat.ReadyForUAT;

  ngOnInit(): void {}
}
