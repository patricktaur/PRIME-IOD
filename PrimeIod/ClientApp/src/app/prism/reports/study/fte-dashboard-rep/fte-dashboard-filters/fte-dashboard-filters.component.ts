import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FteDashboardFilters } from '../fte-dashboard-filters';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
import { FteDashboardService } from '../fte-dashboard.service';
// import { SelectionModeSetEventHandler } from '@generic-ui/ngx-grid/structure/source/core/api/formation/mode/selection-mode-set.event-handler';

@Component({
  selector: 'app-fte-dashboard-filters',
  templateUrl: './fte-dashboard-filters.component.html',
  styleUrls: ['./fte-dashboard-filters.component.css']
})
export class FteDashboardFiltersComponent implements OnInit, OnDestroy {
  @Output() filterChange = new EventEmitter<any>();
  obs: Subscription | undefined;

  filters: any;
  //jan312009.setMonth(jan312009.getMonth()+8);
  filt: FteDashboardFilters = {
    fromYear: new Date().getFullYear(),
    fromMonth: new Date().getMonth() + 1,
    toYear: new Date(new Date().setMonth(new Date().getMonth() + 6)).getFullYear(),
    toMonth: new Date(new Date().setMonth(new Date().getMonth() + 6)).getMonth(),
    fteRoles: [],
    region: [],
    portfolio: [],
    cdms: []
  };
  constructor(private fteDashboardService: FteDashboardService) {}

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters() {
    this.fteDashboardService.getStudyFteDashboardFilters().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.filters = res;
          // this.onFiltersChange();
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  months = [
    { value: 1, label: 'Jan' },
    { value: 2, label: 'Feb' },
    { value: 3, label: 'Mar' },
    { value: 4, label: 'Apr' },
    { value: 5, label: 'May' },
    { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' },
    { value: 8, label: 'Aug' },
    { value: 9, label: 'Sep' },
    { value: 10, label: 'Oct' },
    { value: 11, label: 'Nov' },
    { value: 12, label: 'Dec' }
  ];

  onFiltersChange() {
    this.filterChange.emit(this.filt);
  }

  ngOnDestroy() {
    this.obs?.unsubscribe();
  }
}
