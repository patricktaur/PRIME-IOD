import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CredentialsService } from '@app/core';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user-login-details-filter',
  templateUrl: './user-login-details-filter.component.html',
  styleUrls: ['./user-login-details-filter.component.css']
})
export class UserLoginDetailsFilterComponent {
  @Input() selectedFilters: any = {};

  @Output() filterChange = new EventEmitter<any>();

  public isCollapsed = false;

  filters: any;

  testValue: any;

  resourceDisabled: boolean = false;
  currentUserId: string | undefined = "";
  constructor(
    private credentialsService: CredentialsService,
    private sharedCompsService: SharedCompsService // private cdsTrackersService: CDSTrackersService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.credentialsService.currentUser.id;
    this.onFiltersChange();
  }

  onFiltersChange() {
    this.filterChange.emit(this.selectedFilters);
  }
}
