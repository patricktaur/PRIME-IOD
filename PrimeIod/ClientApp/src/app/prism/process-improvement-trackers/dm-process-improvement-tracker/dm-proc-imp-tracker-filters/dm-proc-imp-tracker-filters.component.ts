import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { DmProcImpTrackerFiltersFilters } from '../dm-proc-imp-tracker-filters';
import { ProcessImprovementTrackerService } from '../process-improvement-tracker-service';
@Component({
  selector: 'app-dm-proc-imp-tracker-filters',
  templateUrl: './dm-proc-imp-tracker-filters.component.html',
  styleUrls: ['./dm-proc-imp-tracker-filters.component.css']
})
export class DmProcImpTrackerFiltersComponent implements OnInit, OnDestroy {
  @Input() selectedFilters: DmProcImpTrackerFiltersFilters = {
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

  @Output() filterChange = new EventEmitter<any>();

  @Output() resetFilters = new EventEmitter<any>();

  filterForm = new FormControl('');

  loadSub: Subscription | undefined;
  filterSub: Subscription | undefined;

  dropDownFilters: any;
  constructor(private service: ProcessImprovementTrackerService) {}

  ngOnInit(): void {
    this.loadFilters();
    this.filterSub = this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe((data: any) => {
      this.selectedFilters.id = data;
      this.onFiltersChange();
    });
  }

  loadFilters() {
    this.loadSub = this.service.getFilters().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.dropDownFilters = res;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  onFiltersChange() {
    this.filterChange.emit(this.selectedFilters);
  }

  resetFiltersClicked() {
    this.resetFilters.emit(true);
  }

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
    this.filterSub?.unsubscribe();
  }
}
