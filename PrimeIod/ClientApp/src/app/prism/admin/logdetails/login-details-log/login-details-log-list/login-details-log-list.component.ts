import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppAccessService } from '@app/prism/admin/app-access/app-access.service';
// import { SharedCompsService } from '../shared-comps.service';
import { FormControl } from '@angular/forms';

import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { LogService } from '../../log.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details-log-list.component.html',
  styleUrls: ['./login-details-log-list.component.css']
})
export class LoginDetailsLogListComponent {
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize : number = 10;


  totalItems = 0;

  records: any = [];

  selectedFilters: any = {
    userNameOrEnterpriseId: '',
    fromDate: null,
    toDate: null,
    pageNumber: 1,
    pageSize: 10,
    blnSuccessfull: null
  }

  constructor(
    private logService: LogService,
  ) { }

  ngOnInit() {
    this.setFromDate();
    this.getLoginDetails();
  }

  getLoginDetails() {
    this.isLoading = true;
    this.logService.getLoginDetails(this.selectedFilters)
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

  getIsSuccessfulStatus(blnSuccessfull: boolean) {
    if(blnSuccessfull == true) {
      return "Yes";
    } else {
      return "No";
    }
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

  columns: Array<any> = [
    {
      header: 'Enterprise Id',
      field: 'enterpriseId'
    },
    {
      header: 'User Name',
      field: 'userName'
    },
    {
      header: 'Login Attempted On',
      field: 'createdOn',
      pipe: 'date',
      format: 'dd-MMM-yyyy'
      // width : 30
    },
    {
      header: 'Is Login Successful',
      field: 'blnSuccessfull'
    }
  ];
}
