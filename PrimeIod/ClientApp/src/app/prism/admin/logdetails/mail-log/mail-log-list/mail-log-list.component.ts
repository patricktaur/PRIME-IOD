import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { LogService } from '@app/prism/admin/logdetails/log.service';
import { mailFilters } from '@app/prism/admin/logdetails/mail-log/mail-log-filter/mail-filter';
import { themeToken } from '@generic-ui/fabric/themes/theme.token';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-mail-log-list',
  templateUrl: './mail-log-list.component.html',
  styleUrls: ['./mail-log-list.component.css']
})
export class MailLogListComponent implements OnInit {
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
    private route: ActivatedRoute,
    private logService: LogService
    ) { }

  ngOnInit() {
    // const today = this.calendar.getToday();
    // this.selectedFilters.fromDate = this.calendar.getPrev(today, 'd', 5);
    // console.log(`selected filters = ${JSON.stringify(this.selectedFilters, null, 2)}`);
    this.setFromDate();
    this.getMailLogs();
  }

  getMailLogs() {
    this.isLoading = true;
    this.logService.getMailLogs(this.selectedFilters)
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
    this.getMailLogs();
    // console.log(`pageOptions = ${JSON.stringify(pageOptions)}`);
  }

  onFilterChange(filterValues: any) {
    this.selectedFilters = filterValues;
    console.log(`selected filters = ${JSON.stringify(this.selectedFilters, null, 2)}`);
    this.getMailLogs();
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
