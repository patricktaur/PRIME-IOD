import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import {SharedCompsService} from '@app/prism/shared-comps/shared-comps.service'
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit, OnChanges, OnDestroy  {
  isLoading = false;
  @Input('userId') userId!: number | null;

  records: any;

  pageNumber = 1;
  pageSize = 10;
 
  loadRecordSub: Subscription | undefined;

  constructor(
    private httpService: SharedCompsService,
  ) {}

  ngOnInit(): void {
    if (this.userId){
      this.loadRecord(this.userId);
    }

    // this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe((data: any) => {
    //   this.onFiltersChange();
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId']) {
      this.loadRecord(this.userId);
    }
  }
  
  loadRecord(userId : number | null) {
    console.log(`user id = ${userId}`);
    if (!userId){
      this.records = [];
      return;
    }
    this.isLoading = true;
    this.loadRecordSub = this.httpService.getUserRoles(userId).subscribe(
      
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
          this.isLoading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  onPageChange(pageOptions: any) {
    this.pageNumber = pageOptions.page;
    this.pageSize = pageOptions.pageSize;

  }

  columns: Array<any> = [
    
    {
      header: 'Role',
      field: 'roleName'
    }
    
  ];

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
  }

}
