import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
import { PaginationAndStudyFilters } from '@app/prism/shared-comps/filters/pagination-and-study-filters';
import { StudyFiltersService } from '../study-filters.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { isJSDocThisTag } from 'typescript';
@Component({
  selector: 'app-dm-common-filter-type-a',
  templateUrl: './dm-common-filters-type-a.component.html',
  styleUrls: ['./dm-common-filters-type-a.component.css']
})
export class DMCommonFilterTypeAComponent implements OnInit, OnDestroy {
  @Output() filterChange = new EventEmitter<any>();
  public isCollapsed = false;

  // @Input() records: any;

  // @Output() searchTextChange = new EventEmitter<any>();

  filterForm = new FormControl('');
  obs: Subscription | undefined;

  filters: any;

  testValue: any;

  constructor(private sharedCompsService: SharedCompsService) {}

  ngOnInit(): void {
    this.loadFilters();

    this.obs = this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe((data: any) => {
      this.filt.iconNumberOrName = data;
      this.onFiltersChange();
    });
  }

  filt: PaginationAndStudyFilters = {
    pageNumber: 1,
    pageSize: 10,
    iconNumberOrName: '',
    region: [],
    sort: '',
    portfolio: [],
    cdms: [],
    dmpm: [],
    dmpmManager: [],
    status: [],
    sponsor: [],
    specialProject: [],
    studyType: [],
    resource: []
  };

  loadFilters() {
    this.sharedCompsService.getDMFilters().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.filters = res;
          this.onFiltersChange();
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  onFiltersChange() {
    this.filterChange.emit(this.filt);
  }
  onIconNumberChange() {}

  ngOnDestroy() {
    this.obs?.unsubscribe();
  }
}
