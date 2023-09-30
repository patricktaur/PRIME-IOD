export interface ImiRaDevPaginationAndFilters {
  pageNumber: number;
  pageSize: number;
  searchOn: string;
  sortOn: string;
  sortBy: string; //asc / desc
  searchText: string;

  sponsor: string[];
  protocolPhase: string[];
  developmentType: string[];

  requestType: string[];
  requestedPriority: string[];
  specificationStatus: string[];
  developmentStatus: string[];

  validationNeeded: string[];

  requestor: string[];
  requestedDueDateFrom: Date | null;
  requestedDueDateTo: Date | null;
  developerAssigned: string[];
  qcCodeReviewAssignedTo: string[];
  uatAssignedTo: string[];

  developmentCompleted: string;
  uatCompleted: string;
  validaatinCompleted: string;
}

function InitPaginationAndCdsDevpFilters(
  options?: Partial<ImiRaDevPaginationAndFilters>
): ImiRaDevPaginationAndFilters {
  const defaults = {
    pageNumber: 1,
    pageSize: 10,
    searchOn: '',
    searchText: '',
    sortOn: '',
    sortBy: 'asc',
    sponsor: [''],
    protocolPhase: [''],
    developmentType: [''],
    requestType: [''],
    requestedPriority: [''],
    specificationStatus: [''],
    developmentStatus: [''],
    validationNeeded: [''],
    requestor: [''],
    requestedDueDateFrom: new Date(),
    requestedDueDateTo: new Date(),
    developerAssigned: [''],
    qcCodeReviewAssignedTo: [''],
    uatAssignedTo: [''],
    developmentCompleted: '',
    uatCompleted: '',
    validaatinCompleted: ''
  };

  return {
    ...defaults,
    ...options
  };
}
