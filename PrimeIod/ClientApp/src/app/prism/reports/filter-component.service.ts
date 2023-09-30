import { Injectable } from '@angular/core';
import { FilterShellNotAvailableComponent } from '@app/prism/reports/filter-shell-not-available/filter-shell-not-available.component';
import { FilterOneComponent } from '@app/prism/reports/filter-shell/filter-one/filter-one.component';
// import {} from '@app/prism/reports/filter-shell'
import { FilterTwoComponent } from '@app/prism/reports/filter-shell/filter-two/filter-two.component';
import { FilterThreeComponent } from '@app/prism/reports/filter-shell/filter-three/filter-three.component';
import { DmStudyOwnerListFilterShellComponent } from '@app/prism/reports/filter-shell/dm-study-owner-list-filter/dm-study-owner-list-filter.component';
// import { ProjectReviewFilterShellComponent }
// from '@app/prism/reports/filter-shell/project-review-filter-shell/project-review-filter-shell.component';
import { RegPortDirCdmsDmpmFilterShellComponent } from '@app/prism/reports/filter-shell/reg-port-dir-cdms-dmpm-filter-shell/reg-port-dir-cdms-dmpm-filter-shell.component';
import { ExternalDataReportFilterShellComponent } from '@app/prism/reports/filter-shell/external-data-report-filter-shell/external-data-report-filter-shell.component';
import { StudyDblSummaryFilterShellComponent } from '@app/prism/reports/filter-shell/study-dbl-summary-filter-shell/study-dbl-summary-filter-shell.component';
import { CelgeneDeliverablesFilterShellComponent } from '@app/prism/reports/filter-shell/celgene-deliverables-filter-shell/celgene-deliverables-filter-shell.component';
//  import { DmCommonFiltersTypeAShellComponent} from '@app/prism/reports/filter-shell/dm-common-filters-type-a-shell/dm-common-filters-type-a-shell.component'
import { CdmsTrackerFilterShellComponent } from '@app/prism/reports/filter-shell/cdms-tracker-filter-shell/cdms-tracker-filter-shell.component';
import { CdmsTrGrpFilterShellComponent } from '@app/prism/reports/filter-shell/cdms-tr-grp-filter-shell/cdms-tr-grp-filter-shell.component';
import { ImiCdmsFilterShellComponent } from '@app/prism/reports/filter-shell/imi-common-filter-shell/imi-common-filter-shell.component';
import { ImiDmCdmsFilterShellComponent } from '@app/prism/reports/filter-shell/imi-dm-cdms-filter-shell/imi-dm-cdms-filter-shell.component';
import { ImiTimelineFilterShellComponent } from '@app/prism/reports/filter-shell/imi-timeline-filter-shell/imi-timeline-filter-shell.component';
import { ImiRevIssueTrackerFilterShellComponent } from '@app/prism/reports/filter-shell/imi-rev-issue-tracker-filter-shell/imi-rev-issue-tracker-filter-shell.component';
import { DmIconNumberFilterShellComponent } from '@app/prism/reports/filter-shell/dm-icon-number-filter-shell/dm-icon-number-filter-shell.component';
import { DmIconNumberSponsorFilterShellComponent } from '@app/prism/reports/filter-shell/dm-icon-number-sponsor-filter-shell/dm-icon-number-sponsor-filter-shell.component';
@Injectable({
  providedIn: 'root'
})
export class FilterComponentService {
  components = [
    FilterOneComponent, // 1= General
    FilterTwoComponent,
    FilterThreeComponent,
    DmStudyOwnerListFilterShellComponent, // 4
    DmStudyOwnerListFilterShellComponent, // 5 -- dummy for retaining array index
    // ProjectReviewFilterShellComponent, // 5
    RegPortDirCdmsDmpmFilterShellComponent, // 6
    ExternalDataReportFilterShellComponent, // 7
    StudyDblSummaryFilterShellComponent, //8
    CelgeneDeliverablesFilterShellComponent, //9
    CdmsTrackerFilterShellComponent, //10
    CdmsTrGrpFilterShellComponent, //11
    ImiCdmsFilterShellComponent, //12
    ImiDmCdmsFilterShellComponent,
    ImiTimelineFilterShellComponent,
    ImiRevIssueTrackerFilterShellComponent, //15
    DmIconNumberFilterShellComponent,
    DmIconNumberSponsorFilterShellComponent
  ];
  constructor() {}

  getFilter(filerGroup: number) {
    // -1 zero based array
    // return this.components[filerGroup - 1];

    if (filerGroup < 1 || filerGroup > this.components.length) {
      return FilterShellNotAvailableComponent;
    } else {
      return this.components[filerGroup - 1];
    }
  }
}
