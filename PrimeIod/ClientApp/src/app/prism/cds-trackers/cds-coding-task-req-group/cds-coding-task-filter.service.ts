import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CdsCodingPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-coding-pagination-and-filters';
@Injectable({
  providedIn: 'root'
})
export class CdsCodingTaskFilterService {
  filters: BehaviorSubject<CdsCodingPaginationAndFilters> = new BehaviorSubject(this.initialState);

  constructor() {}
  get initialState() {
    return <CdsCodingPaginationAndFilters> {
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
      codingSpecialist: [],
      taskCategory: [],
      dueDateFrom: null,
      dueDateTo: null,
      status: [],
      completed: 'no',
      dueType: ''
    };
  }

  setFilters(filters: CdsCodingPaginationAndFilters) {
    this.filters.next(filters);
  }

  resetFilters() {
    this.filters.next(this.initialState);
  }
}
