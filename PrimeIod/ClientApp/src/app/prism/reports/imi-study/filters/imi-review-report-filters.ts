export interface ImiReviewReportFilters {
  pageNumber: number;
  pageSize: number;
  sort: string; //asc / desc
  iconNumberOrName: string;
  region: string[];
  portfolio: string[];
  cdms: string[];
  dmpm: string[];
  dmpmManager: string[];
  status: string[];
  sponsor: string[];
  specialProject: number[];
  studyType: string[];
  resource: number[];
}
