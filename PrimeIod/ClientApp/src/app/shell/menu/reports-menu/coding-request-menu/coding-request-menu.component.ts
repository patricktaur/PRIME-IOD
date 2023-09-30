import { Component, OnInit } from '@angular/core';
import { Menu } from '@app/shell/menu/menu';
import { MenuStatus } from '@app/shell/menu-status';
@Component({
  selector: 'app-coding-request-menu',
  templateUrl: './coding-request-menu.component.html',
  styleUrls: ['./coding-request-menu.component.css']
})
export class CodingRequestMenuComponent extends Menu implements OnInit {
  // constructor() {}
  public menuStat = MenuStatus;
  menuStudyXXXXXStat = this.menuStat.NotReady;
  menuCDSCodingRequestStat = this.menuStat.ReadyForUAT;

  ngOnInit(): void {}
}
