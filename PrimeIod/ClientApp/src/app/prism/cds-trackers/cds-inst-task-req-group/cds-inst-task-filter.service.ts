import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CdsInstrPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-instr-pagination-and-filters';

@Injectable({
  providedIn: 'root'
})
export class CdsInstTaskFilterService {
  filters: BehaviorSubject<CdsInstrPaginationAndFilters> = new BehaviorSubject(this.initialState);

  constructor() {}
  get initialState() {
    return <CdsInstrPaginationAndFilters>{
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
      cdp: [],
      cdpl: [],

      taskCategory: []
    };
  }

  setFilters(filters: CdsInstrPaginationAndFilters) {
    this.filters.next(filters);
  }

  resetFilters() {
    this.filters.next(this.initialState);
  }
}
