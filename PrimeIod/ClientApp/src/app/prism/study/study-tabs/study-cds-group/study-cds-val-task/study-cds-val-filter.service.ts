import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CdsValPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-val-pagination-and-filters';

@Injectable({
  providedIn: 'root'
})
export class StudyCdsValFilterService {
  filters: BehaviorSubject<CdsValPaginationAndFilters> = new BehaviorSubject(this.initialState);

  constructor() {}
  get initialState() {
    return <CdsValPaginationAndFilters>{
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
      validationPoc: [],
      validationMembers: [],
      validationStatus: [],
      developmentTaskCategory: [],
      developmentStatus: [],
      dueDateFrom: null,
      dueDateTo: null,
      status: [],
      completed: 'no',
      dueType: ''
    };
  }

  setFilters(filters: CdsValPaginationAndFilters) {
    this.filters.next(filters);
  }

  resetFilters() {
    this.filters.next(this.initialState);
  }
}
