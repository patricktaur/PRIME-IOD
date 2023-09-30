import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CredentialsService } from '@app/core/authentication/credentials.service';

import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
import { debounceTime } from 'rxjs/operators';
import { mailFilters } from './mail-filter';
@Component({
  selector: 'app-mail-log-filter',
  templateUrl: './mail-log-filter.component.html',
  styleUrls: ['./mail-log-filter.component.css']
})
export class MailLogFilterComponent implements OnInit {
  @Input() selectedFilters: mailFilters = {
    pageNumber: 1,
    pageSize: 10,
    fromDate: null,
    toDate: null,
    isSuccessfull: null,
    emailAddress: ''
  };
  @Output() filterChange = new EventEmitter<any>();

  filterForm = new FormControl('');
  filters: any;

  testValue: any;

  resourceDisabled: boolean = false;
  currentUserId: string | undefined = "";
  constructor(
    private credentialsService: CredentialsService,
    private sharedCompsService: SharedCompsService // private cdsTrackersService: CDSTrackersService
  ) {}

  ngOnInit(): void {
    this.onFiltersChange();
    this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe((data: any) => {
      this.selectedFilters.emailAddress = data;
      this.onFiltersChange();
    });
  }

  onFiltersChange() {
    this.filterChange.emit(this.selectedFilters);
  }
}
