import { Injectable } from '@angular/core';
import { FilterShellSNotAvailableComponent } from '@app/prism/reports/filter-shell-s-not-available/filter-shell-s-not-available.component';
import { DmCommonFiltersTypeAShellComponent } from '@app/prism/reports/filter-shell-s/dm-common-filters-type-a-shell/dm-common-filters-type-a-shell.component';
import { CdsDevFilterShellComponent } from '@app/prism/reports/filter-shell-s/cds/cds-dev-filter-shell/cds-dev-filter-shell.component';
import { CdsOutFilterShellComponent } from '@app/prism/reports/filter-shell-s/cds/cds-out-filter-shell/cds-out-filter-shell.component';
import { CdsDelyFilterShellComponent } from '@app/prism/reports/filter-shell-s/cds/cds-dely-filter-shell/cds-dely-filter-shell.component';
import { CdsValFilterShellComponent } from '@app/prism/reports/filter-shell-s/cds/cds-val-filter-shell/cds-val-filter-shell.component';
import { CdsCodFilterShellComponent } from '@app/prism/reports/filter-shell-s/cds/cds-cod-filter-shell/cds-cod-filter-shell.component';
import { CdsInstFilterShellComponent } from '@app/prism/reports/filter-shell-s/cds/cds-inst-filter-shell/cds-inst-filter-shell.component';
import { CdmsTaskListFilterShellComponent } from '@app/prism/reports/filter-shell-s/cdms/cdms-task-list-filter-shell/cdms-task-list-filter-shell.component';
import { CdmsTaskGroupFilterShellComponent } from '@app/prism/reports/filter-shell-s/cdms/cdms-task-group-filter-shell/cdms-task-group-filter-shell.component';
import { ImiCdmsTaskListFilterShellComponent } from '@app/prism/reports/filter-shell-s/imi/imi-cdms-task-list-filter-shell/imi-cdms-task-list-filter-shell.component';
import { ImiRevReadPerfFilterShellComponent } from '@app/prism/reports/filter-shell-s/imi/imi-rev-read-perf-filter-shell/imi-rev-read-perf-filter-shell.component';
import { ImiCdmsTaskGrpFilterShellComponent } from '@app/prism/reports/filter-shell-s/imi/imi-cdms-task-grp-filter-shell/imi-cdms-task-grp-filter-shell.component';
import { ImiRaDevReqFiltersShellComponent } from '@app/prism/reports/filter-shell-s/imi/imi-ra-dev-req-filters-shell/imi-ra-dev-req-filters-shell.component';
import { ImiRaOutReqFiltersShellComponent } from '@app/prism/reports/filter-shell-s/imi/imi-ra-out-req-filters-shell/imi-ra-out-req-filters-shell.component';
import { ThirdPartyCdmsTaskGroupFilterShellComponent } from '@app/prism/reports/filter-shell-s/cdms/third-party-cdms-task-group-filter-shell/third-party-cdms-task-group-filter-shell.component';
import { ThirdPartyCdmsTaskListFilterShellComponent } from '@app/prism/reports/filter-shell-s/cdms/third-party-cdms-task-list-filter-shell/third-party-cdms-task-list-filter-shell.component';

@Injectable({
  providedIn: 'root'
})
export class FilterComponentTypeAService {
  components = [
    DmCommonFiltersTypeAShellComponent, //1
    CdsDevFilterShellComponent,
    CdsValFilterShellComponent,
    CdsOutFilterShellComponent,
    CdsDelyFilterShellComponent, //5
    CdsCodFilterShellComponent,
    CdsInstFilterShellComponent, //7
    CdmsTaskListFilterShellComponent,
    CdmsTaskGroupFilterShellComponent,
    ImiCdmsTaskListFilterShellComponent,
    ImiRevReadPerfFilterShellComponent, //11
    ImiCdmsTaskGrpFilterShellComponent,
    ImiRaDevReqFiltersShellComponent,
    ImiRaOutReqFiltersShellComponent,
    ThirdPartyCdmsTaskGroupFilterShellComponent,
    ThirdPartyCdmsTaskListFilterShellComponent //16
  ];
  constructor() {}

  getFilter(filerGroup: number) {
    // -1 zero based array

    if (filerGroup < 1 || filerGroup > this.components.length) {
      return FilterShellSNotAvailableComponent;
    } else {
      return this.components[filerGroup - 1];
    }
  }
}
