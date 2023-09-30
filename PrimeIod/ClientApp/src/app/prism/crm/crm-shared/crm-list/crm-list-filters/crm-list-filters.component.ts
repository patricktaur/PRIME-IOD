import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CredentialsService } from '@app/core/authentication/credentials.service';

import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
import { CrmListService } from '@app/prism/crm/crm-shared/crm-list/crm-list.service';
import { debounceTime } from 'rxjs/operators';

import { CrmListFilters } from '../crm-list-filters';

@Component({
  selector: 'app-crm-list-filters',
  templateUrl: './crm-list-filters.component.html',
  styleUrls: ['./crm-list-filters.component.css']
})
export class CrmListFiltersComponent implements OnInit {
  @Input() selectedFilters: CrmListFilters = {
    pageNumber: 1,
    pageSize: 10,
    IconNumberOrName: '',
    Sponsor: [],
    cdaCm:[],
    clinicalRiskManager:[],
    centeralMonitoringStatus:[]
  };

  @Output() filterChange = new EventEmitter<any>();

  filterForm = new FormControl('');

  filters: any;
  constructor(private crmListService: CrmListService) {}

  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe((data: any) => {
      this.selectedFilters.IconNumberOrName = data;
      this.onFiltersChange();
    });
    this.loadFilters();
  }

  loadFilters() {
    this.crmListService.getCrmListFilters().subscribe(
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
    this.filterChange.emit(this.selectedFilters);
  }
}
