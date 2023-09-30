import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppAccessService } from '@app/prism/admin/app-access/app-access.service';
// import { SharedCompsService } from '../shared-comps.service';
import { FormControl } from '@angular/forms';

import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';
// import { LogService } from '../../log.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { UserLoginDetailsService } from './user-login-details.service';
import { CredentialsService } from '@app/core';

@Component({
  selector: 'app-user-login-details',
  templateUrl: './user-login-details.component.html',
  styleUrls: ['./user-login-details.component.css']
})
export class UserLoginDetailsComponent {
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize : number = 10;

  totalItems = 0;

  userId: any;
  records: any = [];

  selectedFilters: any = {
    fromDate: null,
    toDate: null,
    pageNumber: 1,
    pageSize: 10
  }

  constructor(
    private userLoginDetailsService: UserLoginDetailsService,
    private credentialsService: CredentialsService
    ) { }

  ngOnInit() {
    this.userId = this.credentialsService.currentUser.id;
    this.setFromDate();
    this.getLoginDetails();
  }

  getLoginDetails() {
    this.isLoading = true;
    this.userLoginDetailsService.getLoginDetails(this.userId, this.selectedFilters)
    .subscribe((res: any) => {
      if (res.status === 400) {
        return;
      } else {
        this.totalItems = res.recordCount;
        this.records = res.records;
      }
      this.isLoading = false;
    })
  }

  onPageChange(pageOptions: any) {
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.selectedFilters.pageNumber = pageOptions.page;
    this.getLoginDetails();
  }

  onFilterChange(filterValues: any) {
    this.selectedFilters = filterValues;
    this.getLoginDetails();
  }

  setFromDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 5);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    const day = currentDate.getDate();
    this.selectedFilters.fromDate = `${year}-${month}-${day}`
  }
}

