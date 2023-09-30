import { Injectable } from '@angular/core';
import { StudyFilters } from '@app/prism/shared-comps/filters/study-filters';
@Injectable({
  providedIn: 'root'
})
export class StudyFiltersService {
  constructor() {}

  getFilteredRecords(records: any, filter: StudyFilters) {
    let studyNameLower = '';
    studyNameLower = filter.iconNumberOrName.trim().toLowerCase();

    let filter1 = records;
    if (studyNameLower.length > 0) {
      filter1 = null;
      filter1 = records.filter(
        (x: any) =>
          x.studyIconNumber
            .toString()
            .toLowerCase()
            .indexOf(filter.iconNumberOrName) !== -1 ||
          x.studyName
            .toString()
            .toLowerCase()
            .indexOf(studyNameLower) !== -1
      );
    }

    let filter2 = filter1;
    if (filter.region && filter.region.length > 0) {
      filter2 = null;
      filter2 = filter1.filter((n: any) => filter.region.indexOf(n.region) !== -1);
    }

    let filter3 = filter2;
    if (filter.portfolio && filter.portfolio.length > 0) {
      filter3 = null;
      filter3 = filter2.filter((n: any) => filter.portfolio.indexOf(n.portfolio) !== -1);
    }

    let filter4 = filter3;
    if (filter.cdms && filter.cdms.length > 0) {
      filter4 = null;
      filter4 = filter3.filter((n: any) => filter.cdms.indexOf(n.cdms) !== -1);
    }

    // Role
    let filter5 = filter4;
    if (filter.dmpm && filter.dmpm.length > 0) {
      filter5 = null;
      filter5 = filter4.filter((n: any) => filter.dmpm.some((v: any) => n.currentDmpm?.includes(v)));
    }

    let filter6 = filter5;
    if (filter.dmpmManager && filter.dmpmManager.length > 0) {
      filter6 = null;
      filter6 = filter5.filter((n: any) => filter.dmpmManager.some((v: any) => n.currentDmpmManager?.includes(v)));
    }

    let filter7 = filter6;
    if (filter.sponsor && filter.sponsor.length > 0) {
      filter7 = null;
      filter7 = filter6.filter((n: any) => filter.sponsor.indexOf(n.sponsor) != -1);
    }

    let filter8 = filter7;
    if (filter.status && filter.status.length > 0) {
      filter8 = null;
      filter8 = filter7.filter((n: any) => filter.status.indexOf(n.studyStatus) != -1);
    }

    let filter9 = filter8;
    if (filter.studyType && filter.studyType.length > 0) {
      filter9 = null;
      filter9 = filter8.filter((n: any) => filter.studyType.indexOf(n.studyType) != -1);
    }

    let filter10 = filter9;
    if (filter.specialProject && filter.specialProject.length > 0) {
      filter10 = null;
      filter10 = filter9.filter((n: any) => filter.specialProject.indexOf(n.specialProject.toLowerCase()) != -1);
    }

    return filter10;
  }
}
