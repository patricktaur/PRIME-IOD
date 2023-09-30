import { Component, OnInit } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { CredentialsService } from '@app/core/authentication/credentials.service';

@Component({
  selector: 'app-reports-menu',
  templateUrl: './reports-menu.component.html',
  styleUrls: ['./reports-menu.component.css']
})
export class ReportsMenuComponent implements OnInit {
  studyTabVisible = false;
  risksTabVisible = false;
  resourcesTabVisible = false;
  complianceTabVisible = false;
  cdsTabVisible = false;
  cdmsTabVisible = false;
  codingRequestTabVisible = false;
  imiTabVisible = false;
  userTabVisible = false;
  exportTabVisible = false;
  crmTabVisible=false;

  active: any;

  constructor(private cred: CredentialsService) {
    let activeTab = localStorage.getItem('reports-menu');
    if(location.href.includes(`/reports/`)) {
      if(activeTab) {
        this.active = activeTab;
      }
    }
  }

  ngOnInit(): void {
    this.studyTabVisible = this.cred.hasMenuPermission('reports/study');
    //DM & CDS PRISM V2 LIST OF FORMS AND REPORTS.xlsx : on hold until after PRIMV2 / PRIME goes live
    // this.risksTabVisible = this.cred.hasMenuPermission('reports/risks');
    this.resourcesTabVisible = this.cred.hasMenuPermission('reports/resources');
    this.complianceTabVisible = this.cred.hasMenuPermission('reports/compliance');
    this.cdsTabVisible = this.cred.hasMenuPermission('reports/cds');
    this.cdmsTabVisible = this.cred.hasMenuPermission('reports/cdms');
    this.codingRequestTabVisible = this.cred.hasMenuPermission('reports/conding-request');
    this.imiTabVisible = this.cred.hasMenuPermission('reports/imi');
    this.userTabVisible = this.cred.hasMenuPermission('reports/user');
    this.exportTabVisible = this.cred.hasMenuPermission('reports/export');
    this.crmTabVisible = this.cred.hasMenuPermission('reports/crm');
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
		if (changeEvent.nextId) {
      console.log(changeEvent.nextId);
      localStorage.setItem('reports-menu', changeEvent.nextId);
      // changeEvent.preventDefault();
		}
	}
}
