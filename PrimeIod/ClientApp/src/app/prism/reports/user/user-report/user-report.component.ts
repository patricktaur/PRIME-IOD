import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserReportService } from '../user-report.service';
import { AppAdminService } from '@app/app-admin/app-admin.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent {
  isLoading: boolean = false;
  title = 'User Report';

  pageNumber = 1;
  pageSize = 50;

  roles = [];
  roleFilters: string[] = [];

  records: any = [];
  filteredRecords: any = [];

  constructor(private router: Router, 
    private userReportService: UserReportService,
    private appAdminService: AppAdminService) {}

  ngOnInit(): void {
    this.getRoles();
    this.loadReport();
  }

  getRoles() {
    this.appAdminService.getAllRoles()
    .subscribe((roles: any) => {
      this.roles = roles;
    })
  }

  loadReport() {
    this.isLoading = true;
    this.userReportService.getUserReport().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
          this.filteredRecords = res;
        }
        this.isLoading = false;
      },
      (err: any) => {
        // let title = "EDC Experience By Study Phase";
        // this.router.navigate(['no-access', { title: title, error: err }]);
        // console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  onPageChange(pageOptions: any) {
    this.pageNumber = pageOptions.page;
    this.pageSize = pageOptions.pageSize;
  }

  onFiltersChange() {
    if(this.roleFilters.length > 0) {
      this.filteredRecords = JSON.parse(JSON.stringify(this.records));
      this.filteredRecords = this.records.filter((x: any) => this.isCommonElementExists(x.roles, this.roleFilters) == true);
    } else {
      this.filteredRecords = JSON.parse(JSON.stringify(this.records));
    }
  }

  isCommonElementExists(array: any, filterArray: any) {
 
    // Loop for array1
    for (let i = 0; i < array.length; i++) {
 
        // Loop for array2
        for (let j = 0; j < filterArray.length; j++) {
 
            // Compare the element of each and
            // every element from both of the
            // arrays
            if (array[i].recId == parseInt(filterArray[j])) {
 
                // Return if common element found
                return true;
            }
        }
    }
 
    // Return if no common element exist
    return false;
}

  onClickBack() {
    var reportsDropdown = document.getElementById("reports-dropdown");
    reportsDropdown?.click();
  }

  get csvfileName() {
    return 'user-report.csv'
  }

  columns: Array<any> = [
    {
      header: 'User Name',
      field: 'displayName'
    },
    {
      header: 'Email Id',
      field: 'emailId'
    },
    {
      header: 'Roles',
      field: 'rolesString'
    }
  ];
}
