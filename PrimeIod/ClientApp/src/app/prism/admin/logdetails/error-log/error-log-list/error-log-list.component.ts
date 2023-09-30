import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { LogService } from '@app/prism/admin/logdetails/log.service';
import { logFilters } from '@app/prism/admin/logdetails/error-log/error-log-filter/log-filter';
import { themeToken } from '@generic-ui/fabric/themes/theme.token';

@Component({
  selector: 'app-error-log-list',
  templateUrl: './error-log-list.component.html',
  styleUrls: ['./error-log-list.component.css']
})

export class ErrorLogListComponent implements OnInit {
  isLoading = false;
  records: any = [];
  filteredRecords: any = []; 
  downloadInProgress: boolean = false;
  
  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.logService.getErrorLogs()
    .subscribe(res => {
      this.records = res;
      this.totalItems = this.records.length;

      this.onPageChange({page: this.pageNumber, pageSize: this.pageSize});
      this.isLoading = false;
    })
  }

  downloadLogFile(fileName: any) {
    this.downloadInProgress = true;
    this.logService.getLogFile(fileName)
    .subscribe((res: any) => {
      this.saveFile(res, fileName);
      this.downloadInProgress = false;
    })
  }

  saveFile(response: any, fileName: any) {
    const url = window.URL.createObjectURL(new Blob([response]));

    let anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `ex_${fileName}.log`;
    anchor.click();
  }

  onPageChange(event: any) {
    this.pageNumber = event.page;
    this.pageSize = event.pageSize;

    // let fromIndex = (this.pageNumber - 1) * this.pageSize;
    // let toIndex = (this.pageNumber - 1) * this.pageSize + this.pageSize;

    this.filteredRecords = this.records.slice(
			(this.pageNumber - 1) * this.pageSize,
			(this.pageNumber - 1) * this.pageSize + this.pageSize
		);
  }

  onFilterChange() {
    
  }

  columns: Array<any> = [
    {
      header: 'ErrorId',
      field: 'recId',
      actionType: 'raise-event',
      linkText: 'Open',
      actionCommand: 'edit',
      actionField: 'recId',
      actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    },
    {
      header: 'Error Date',
      field: 'orderNumber'
    },
    {
      header: 'File Path',
      field: 'description'
    },
    {
      header: 'User',
      field: 'description'
    },
    {
      header: 'User Name',
      field: 'description'
    },
    {
      header: 'Last Exception Msg',
      field: 'description'
    },
    {
      header: 'Comment',
      field: 'description'
    }
  ];
}
