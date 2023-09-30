export interface ImiReviewReaderPerforPaginationAndFilters {
  pageNumber: number;
  pageSize: number;
  iconNumberOrName: string;
  sponsor: string[];
  status: string[];
  reviewedByProjectManagers: string[];
  reviewedByProjectDirectors: [];
  watchList: null;
  escalated: null;
}
