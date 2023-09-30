import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CredentialsService } from '@app/core/authentication/credentials.service';

import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.css']
})
export class UsersFilterComponent implements OnInit {
  @Input() selectedFilters: any;

  @Output() filterChange = new EventEmitter<any>();

  public isCollapsed = false;

  filterForm = new FormControl('');

  filters: any;

  testValue: any;

  resourceDisabled: boolean = false;
  currentUserId: string | undefined;
  constructor(
    private credentialsService: CredentialsService,
    private sharedCompsService: SharedCompsService // private cdsTrackersService: CDSTrackersService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.credentialsService.currentUser.id;

    this.onFiltersChange();
    this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      this.selectedFilters.iconNumberOrName = data;
      this.onFiltersChange();
    });
  }

  hasResourceInList(resources: any, resourceId: string) {
    var result = resources.filter((obj: any) => {
      return obj.id === resourceId;
    });
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
    // return result ? true : false;
  }

  onFiltersChange() {
    this.filterChange.emit(this.selectedFilters);
  }
}
