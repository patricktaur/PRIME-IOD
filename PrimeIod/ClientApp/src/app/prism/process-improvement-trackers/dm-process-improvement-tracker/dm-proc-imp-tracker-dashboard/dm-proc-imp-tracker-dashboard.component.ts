import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DmProcImpTrackerDashboard } from '../dm-proc-imp-tracker-dashboard';
import { ProcessImprovementTrackerService } from '../process-improvement-tracker-service';
import { DmProcImpTrackerFiltersFilters } from '../dm-proc-imp-tracker-filters';

@Component({
  selector: 'app-dm-proc-imp-tracker-dashboard',
  templateUrl: './dm-proc-imp-tracker-dashboard.component.html',
  styleUrls: ['./dm-proc-imp-tracker-dashboard.component.css']
})
export class DmProcImpTrackerDashboardComponent implements OnInit, OnDestroy {
  @Output() itemClicked = new EventEmitter<any>();

  loadSub: Subscription | undefined;
  // dashboard: DmProcImpTrackerDashboard = {
  //   pendingApproval: 0,
  //   notStarted: 0,
  //   inDevelopment: 0,
  //   inValidation: 0,
  //   inProgressAwaitingToBePutInProduction: 0,
  //   completed: 0
  // };

  selectedFilters: DmProcImpTrackerFiltersFilters = {
    pageNumber: 1,
    pageSize: 10,
    id: '',
    requestor: [],
    processImprovementStatus: [],
    billable: [],
    processImprovementCategory: [],
    processLead: [],
    sopWpGuidelineImpacted: [],
    trainingDevelopedRolledOut: []
  };

  dashboardItems: any;

  constructor(private service: ProcessImprovementTrackerService) {}

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters() {
    this.loadSub = this.service.getDashboard().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          // this.dashboard = res;
          this.dashboardItems = res;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  onItemClicked(value: any) {
    // var x = "32";
    // var y: number = +x;

    let selectedValue: number = +value.selectedItem.keyValue;
    this.selectedFilters.processImprovementStatus = [];
    this.selectedFilters.processImprovementStatus.push(selectedValue);
    this.itemClicked.emit(this.selectedFilters);
  }

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
