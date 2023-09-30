export interface ImiRaOutputPaginationAndFilters {
  pageNumber: number;
  pageSize: number;
  searchOn: string;
  sortOn: string;
  sortBy: string; //asc / desc
  searchText: string;

  sponsor: string[];
  outputType: string[];
  outputStatus: string[];

  developerAssigned: string[];
  requestor: string[];
  requestedPriority: string[];

  requestedDueDateFrom: Date | null;
  requestedDueDateTo: Date | null;
}

function InitPaginationAndCdsDevpFilters(
  options?: Partial<ImiRaOutputPaginationAndFilters>
): ImiRaOutputPaginationAndFilters {
  const defaults = {
    pageNumber: 1,
    pageSize: 10,
    searchOn: '',
    searchText: '',
    sortOn: '',
    sortBy: 'asc',
    sponsor: [''],
    outputType: [''],
    outputStatus: [''],

    developerAssigned: [''],
    requestor: [''],
    requestedPriority: [''],

    specificationStatus: [''],
    developmentStatus: [''],
    validationNeeded: [''],
    requestedDueDateFrom: new Date(),
    requestedDueDateTo: new Date()
  };

  return {
    ...defaults,
    ...options
  };
}
