export interface crmStudyFilters {
    pageNumber: number;
    pageSize: number;
    // sort: string; //asc / desc
    iconNumberOrName: string;
    region: string[];
    portfolio: string[];
    // cdms: string[];
    // dmpm: string[];
    // dmpmManager: string[];
    status: number[];
    // sponsor: string[];
    specialProject: number[];
    // studyType: string[];
    requestedBy: number[];
    requestDateFrom: string;
    requestDateTo: string;
    isActioned: number[];
  }