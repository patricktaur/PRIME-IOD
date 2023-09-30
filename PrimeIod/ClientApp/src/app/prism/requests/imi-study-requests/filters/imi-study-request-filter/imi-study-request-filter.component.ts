import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CredentialsService } from '@app/core/authentication/credentials.service';

import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-imi-study-request-filter',
  templateUrl: './imi-study-request-filter.component.html',
  styleUrls: ['./imi-study-request-filter.component.css']
})
export class ImiStudyRequestFilterComponent implements OnInit {
  @Input() selectedFilters: any;

  @Output() filterChange = new EventEmitter<any>();

  public isCollapsed = false;

  filterForm = new FormControl('');

  filters: any;

  testValue: any;

  resourceDisabled: boolean = false;
  currentUserId: string = '';
  constructor(
    private credentialsService: CredentialsService,
    private sharedCompsService: SharedCompsService // private cdsTrackersService: CDSTrackersService
  ) {}

  ngOnInit(): void {
    if(this.credentialsService.currentUser.id) {
      this.currentUserId = this.credentialsService.currentUser.id;
    }

    // if (!this.credentialsService.userHasPermission(this.requiredPermissions.resource)) {
    //   this.resourceDisabled = true;
    // }

    this.loadFilters();

    this.onFiltersChange();
    this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      //this.filt.iconNumberOrName = data;

      // this.selectedFilters.iconNumberOrName = data;
      // this.onFiltersChange();
      this.selectedFilters.iconNumberOrName = data;
      this.onFiltersChange();
    });
  }

  loadFilters() {
    this.sharedCompsService.getDMFilters().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.filters = res;

          //the default user-id is removed if dmResource - does not contain the user in the list
          //
          let itemInList = this.hasResourceInList(this.filters.dmResources, this.currentUserId);
          if (!itemInList) {
            this.selectedFilters.resource = [];
          }

          this.onFiltersChange();
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
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
