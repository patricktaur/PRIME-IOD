import { Component, OnInit } from '@angular/core';
import { Menu } from '@app/shell/menu/menu';
import { MenuStatus } from '@app/shell/menu-status';

@Component({
  selector: 'app-crm-menu',
  templateUrl: './crm-menu.component.html',
  styleUrls: ['./crm-menu.component.css']
})
export class CrmMenuComponent extends Menu implements OnInit {
  public menuStat = MenuStatus;
  crmreport1Stat = this.menuStat.UatPassed;
 

  ngOnInit(): void {}
}
