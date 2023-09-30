import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CdsDevpPaginationAndFilters } from '@app/prism/cds-trackers/cds-shared-comps/cds-filters/cds-devp-pagination-and-filters';

@Injectable({
  providedIn: 'root'
})
export class StudyCdsDevFilterService {
  filters: BehaviorSubject<CdsDevpPaginationAndFilters> = new BehaviorSubject(this.initialState);
  constructor() {}

  get initialState() {
    return <CdsDevpPaginationAndFilters>{
      pageNumber: 1,
      pageSize: 10,
      searchOn: '',
      sortOn: 'task-id',
      sortBy: 'asc',
      searchText: '',
      region: [],
      portfolio: [],
      sponsor: [],
      cdms: [],
      dmpm: [],
      requestor: [],
      cDSAssignedTo: [],
      clinicalDataDeliveryLead: [],
      taskCategory: [],
      dueDateFrom: null,
      dueDateTo: null,
      status: [],
      priority: '',
      completed: 'no',
      type: ''
    };
  }

  setFilters(filters: CdsDevpPaginationAndFilters) {
    this.filters.next(filters);
  }

  resetFilters() {
    this.filters.next(this.initialState);
  }
}
