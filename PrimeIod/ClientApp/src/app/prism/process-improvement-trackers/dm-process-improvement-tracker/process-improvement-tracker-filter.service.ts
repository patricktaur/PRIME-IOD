import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DmProcImpTrackerFiltersFilters } from './dm-proc-imp-tracker-filters';

@Injectable({
  providedIn: 'root'
})
export class DMProcImpTrackerFilterService {
  filters: BehaviorSubject<DmProcImpTrackerFiltersFilters> = new BehaviorSubject(this.initialState);

  constructor() {}
  get initialState() {
    return <DmProcImpTrackerFiltersFilters><unknown>{
      id: '',
      requestor: [],
      processImprovementStatus: [],
      billable: [],
      processImprovementCategory: [],
      processLead: [],
      sopWpGuidelineImpacted: [],
      trainingDevelopedRolledOut: []
    };
  }

  setFilters(filters: DmProcImpTrackerFiltersFilters) {
    this.filters.next(filters);
  }

  resetFilters() {
    this.filters.next(this.initialState);
  }

  getDefaultFilters() {
    return this.initialState;
  }
}
