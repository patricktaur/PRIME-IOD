export interface CdsPaginationAndFilters {
  pageNumber: number;
  pageSize: number;
  sortOn: string;
  sortBy: string; //asc / desc
  textSearchField: string;
  textSearch: string;
  region: string[];
  portfolio: string[];
  cdms: string[];
  dmpm: string[];
  requestor: string[];
  programmerAssigned: string[];
  programmerLead: string[];
  taskCategory: string[];
  dueDateFrom: Date;
  dueDateTo: Date;
  status: string[];
  completed: string;
  dueType: string;
}

function InitPaginationAndCdsDevpFilters(options?: Partial<CdsPaginationAndFilters>): CdsPaginationAndFilters {
  const defaults = {
    pageNumber: 1,
    pageSize: 10,
    sortOn: '',
    sortBy: 'asc',
    textSearchField: '',
    textSearch: '',
    region: [''],
    portfolio: [''],
    cdms: [''],
    dmpm: [''],
    requestor: [''],
    programmerAssigned: [''],
    programmerLead: [''],
    taskCategory: [''],
    dueDateFrom: new Date(),
    dueDateTo: new Date(),
    status: [''],
    completed: 'no',
    dueType: ''
  };

  return {
    ...defaults,
    ...options
  };
}
