export interface CdmsTrackerGroupPaginationAndFilters {
  pageNumber: number;
  pageSize: number;
  iconNumberOrName: string;
  dmpm: string[];
  region: string[];
  cdms: string[];
  primaryCdmsLead: [];
  secondaryCdmsLead: [];
  taskGroupTitle: [];
  task: [];
  taskStatus: [];
  startDateFrom?: Date | null;
  startDateTo?: Date | null;
  completedDateFrom?: Date | null;
  completedDateTo?: Date | null;
}
