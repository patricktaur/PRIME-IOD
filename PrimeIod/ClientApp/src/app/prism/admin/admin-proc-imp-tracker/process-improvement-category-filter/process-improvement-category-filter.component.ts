import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CredentialsService } from '@app/core/authentication/credentials.service';

import { processimprovementcategoryService } from '@app/prism/admin/admin-proc-imp-tracker/process-improvement-category.service';
import { ConsoleEventLogger } from '@generic-ui/hermes/core/infrastructure/logger/event/console.event.logger';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-process-improvement-category-filter',
  templateUrl: './process-improvement-category-filter.component.html',
  styleUrls: ['./process-improvement-category-filter.component.css']
})
export class ProcessImprovementCategoryFilterComponent implements OnInit {
  @Input() selectedFilters: any;

  @Output() filterChange = new EventEmitter<any>();

  public isCollapsed = false;

  filterForm = new FormControl('');

  filters: any;

  testValue: any;

  resourceDisabled: boolean = false;
  currentUserId: string | undefined = "";
  constructor(
    private credentialsService: CredentialsService,
    private processimprovementcategoryService: processimprovementcategoryService // private cdsTrackersService: CDSTrackersService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.credentialsService.currentUser.id;

    this.loadFilters();

    this.onSubFilterChange();
    this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(data => {
      this.selectedFilters.iconNumberOrName = data;
      this.onSubFilterChange();
    });
  }

  loadFilters() {
    this.processimprovementcategoryService.GetList().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.filters = res;
          console.log('filter');
          console.log(res);

          //the default user-id is removed if dmResource - does not contain the user in the list
          //
          // let itemInList = this.hasResourceInList(this.filters.dmResources, this.currentUserId);
          // if (!itemInList) {
          //   this.selectedFilters.resource = [];
          // }

          this.onSubFilterChange();
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  // hasResourceInList(resources: any, resourceId: string) {
  //   var result = resources.filter((obj: any) => {
  //     return obj.id === resourceId;
  //   });
  //   if (result.length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  //   // return result ? true : false;
  // }

  onSubFilterChange() {
    this.filterChange.emit(this.selectedFilters);
  }
}
