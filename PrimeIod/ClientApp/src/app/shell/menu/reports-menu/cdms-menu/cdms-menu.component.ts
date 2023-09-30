import { Component, OnInit } from '@angular/core';
import { Menu } from '@app/shell/menu/menu';
import { MenuStatus } from '@app/shell/menu-status';
@Component({
  selector: 'app-cdms-menu',
  templateUrl: './cdms-menu.component.html',
  styleUrls: ['./cdms-menu.component.css']
})
export class CdmsMenuComponent extends Menu implements OnInit {
  // constructor() {}
  public menuStat = MenuStatus;
  /*
  CDMSTasksList                                 
CDMSTasksByGroup                        
CDMS                                              
IMICDMSReport                                   
IMIDMCDMS                                       
IMICDMSTaskList                                
IMICDMSTaskGroup 
*/

  menuCDMSXXXXXStat = this.menuStat.NotReady;
  menuCDMSTasksListStat = this.menuStat.ReadyForUAT;
  menuCDMSTasksByGroupStat = this.menuStat.ReadyForUAT;
  menuCDMSStat = this.menuStat.ReadyForUAT;

  menuCDMSThirdPartyTasksListStat = this.menuStat.ReadyForUAT;
  menuCDMSThirdPartyTasksByGroupStat = this.menuStat.ReadyForUAT;

  // menuIMICDMSReportStat = this.menuStat.NotReady;
  // menuIMIDMCDMSStat = this.menuStat.NotReady;
  // menuIMICDMSTaskListStat = this.menuStat.NotReady;
  // menuIMICDMSTaskGroupStat = this.menuStat.NotReady;

  ngOnInit(): void {}
}
