import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrmProjectGovernanceCodelistService } from '../crm-project-governance-codelist.service';
import { CrmProjectGovernanceCodelistFilterService } from '../crm-project-governance-codelist-filter.service';

@Component({
  selector: 'app-crm-project-governance-codelist-list',
  templateUrl: './crm-project-governance-codelist-list.component.html',
  styleUrls: ['./crm-project-governance-codelist-list.component.css']
})
export class CrmProjectGovernanceCodelistListComponent {
  isLoading: boolean = false;

  records: any = [];
  selectedFilters: any = {
    pageNumber: 1,
    pageSize: 10,
    parId: null
  };

  addbtn: boolean = false;

  initialized: boolean = false;

  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    private crmProjectGovernanceCodelistService: CrmProjectGovernanceCodelistService,
    private crmProjectGovernanceCodelistFilterService: CrmProjectGovernanceCodelistFilterService
  ) {
    console.log(`list constructor`);
  }

  ngOnInit(): void {
    this.crmProjectGovernanceCodelistFilterService.filters.subscribe((filters: any) => {
      if (filters) {
        this.selectedFilters = filters; //{... filters};
        this.loadReport();
      }
    });
  }

  loadReport() {
    this.isLoading = true;
    //alert(this.selectedFilters.parId);
    if (this.selectedFilters.parId != null) {
      this.crmProjectGovernanceCodelistService.getdataforParid(this.selectedFilters.parId)
      .subscribe(
        (res: any) => {
          if (res.status === 400) {
            this.addbtn = false;
            return;
          } else {
            this.records = res;
            if (this.records.length > 0) {
              this.addbtn = true;
            } else {
              this.addbtn = false;
            }

            // console.log(JSON.stringify(res, null, 2));
          }
          this.isLoading = false;
        },
        (err: any) => {
          console.log(`err = ${JSON.stringify(err, null, 2)}`);
          this.isLoading = false;
          this.addbtn = false;
        }
      );
    } else {
      this.isLoading = false;
      this.records = [];
      this.addbtn = false;
    }
  }

  onRaiseEvent(value: any) {
    let actionCommand = value?.actionCommand;
    let id = value?.actionValue;
    switch (actionCommand) {
      case 'edit':
        this.edit(id);
        break;
      // case 'delete':
      //   const msg = 'Are you sure? you want to delete Request ID: ' + id;
      //   this.confirmDelete(msg, id);
      //   break;

      default:
        break;
    }
  }

  edit(id: number) {
    this.router.navigate(['edit'], {
      relativeTo: this.actRoute.parent,
      queryParams: { editMode: 'edit', parId: id }
    });
  }

  add() {
    if (this.selectedFilters.parId != null) {
      this.router.navigate(['edit'], {
        relativeTo: this.actRoute.parent,
        // queryParams: { editMode: 'add', studyId: this.studyId }
        queryParams: { editMode: 'add', parId: this.selectedFilters.parId }
      });
    }
  }

  // onFilterChange(filters: any) {
  //   this.selectedFilters = filters;
  //   this.loadReport();
  // }

  // onFilterChange(filters: any) {
  //   // this.crmProjectGovernanceCodelistFilterService.setFilters(filters);
  //   this.loadReport();
  //   // this.selectedFilters = filters;
  //   // this.selectedFilters = { ...this.selectedFilters };
  // }

  onFilterChange(filters: any) {
    this.crmProjectGovernanceCodelistFilterService.setFilters(filters);
    this.selectedFilters = filters;
    //alert(this.selectedFilters.parId);
    this.loadReport();
  }
  
  onResetFilters() {
    this.crmProjectGovernanceCodelistFilterService.resetFilters();
  }

  get filteredRecords() {
    // console.log(this.selectedFilters.parId);
    let filter2 = this.records;
    return filter2;
  }

  columns: Array<any> = [
    {
      header: 'Actions',
      field: 'recId',
      actionType: 'raise-event',
      linkText: 'Open',
      actionCommand: 'edit',
      actionField: 'recId',
      actionTextField: 'Description' // this?.messageFieldForDelete
    },
    {
      header: 'Order Number',
      field: 'orderNumber'
    },
    {
      header: 'Description',
      field: 'description'
    }
  ];

  onPageChange(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport();
  }
}
