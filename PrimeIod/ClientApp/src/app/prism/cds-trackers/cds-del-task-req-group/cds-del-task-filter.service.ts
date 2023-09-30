import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CdsOutputPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-output-pagination-and-filters';

@Injectable({
  providedIn: 'root'
})
export class CdsDelTaskFilterService {
  filters: BehaviorSubject<CdsOutputPaginationAndFilters> = new BehaviorSubject(this.initialState);

  constructor() {}
  get initialState() {
    return <CdsOutputPaginationAndFilters>{
      pageNumber: 1,
      pageSize: 10,
      searchOn: 'task-id',
      sortOn: 'task-id',
      sortBy: 'asc',
      searchText: '',

      region: [],
      portfolio: [],
      sponsor: [],
      cdms: [],
      dmpm: [],
      requestor: [],
      programmerAssigned: [],
      programmingLead: [],
      taskCategory: [],
      dueDateFrom: null,
      dueDateTo: null,
      status: [],
      completed: 'no',
      dueType: ''
    };
  }

  setFilters(filters: CdsOutputPaginationAndFilters) {
    this.filters.next(filters);
  }

  resetFilters() {
    this.filters.next(this.initialState);
  }

  getDefaultFilters() {
    return this.initialState;
  }
}
