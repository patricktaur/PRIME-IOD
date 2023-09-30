import { Component } from '@angular/core';
import { MenuStatus } from '@app/shell/menu-status';

@Component({
  selector: 'app-users-menu',
  templateUrl: './users-menu.component.html',
  styleUrls: ['./users-menu.component.css']
})
export class UsersMenuComponent {
  public menuStat = MenuStatus;

  menuUserReportStat = this.menuStat.UatPassed;
}
