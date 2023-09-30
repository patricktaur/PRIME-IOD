import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { UIGridColumn } from '@app/shared/common/ui-grid-column';
import { SharedCompsService } from '@app/prism/shared-comps/shared-comps.service';

import { StudyResourcesService } from '@app/prism/study/study-tabs/study-resources-group/study-resources/study-resources.service';

@Component({
  selector: 'app-study-members',
  templateUrl: './study-members.component.html',
  styleUrls: ['./study-members.component.css']
})
export class StudyMembersComponent implements OnInit, OnDestroy {
  isLoading = false;
  pageNumber = 1;
  pageSize = 10;

  studyId: number | undefined;
  records: any = [];

  filters: any;

  loadSub: Subscription | undefined;
  constructor(private sharedCompsService: SharedCompsService, private studyResourcesService: StudyResourcesService) {}

  ngOnInit() {
    this.loadIconStudyNumbers();
    //  this.loadReport(0);
  }

  loadIconStudyNumbers() {
    // this.isLoading = true;
    // this.filterValues.pageNo = this.pageNumber;
    // this.filterValues.pageSize = this.pageSize;

    this.sharedCompsService.getDMStudyIconNumbers().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          // this.totalItems = res.recordCount;
          this.filters = res;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  loadReport(studyId: number) {
    this.isLoading = true;
    this.records = null;

    this.loadSub = this.studyResourcesService.getActiveResournces(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  onFilterChange(studyId: number | 0) {
    // console.log("XXX" + studyId);
    this.loadReport(studyId);
  }

  columns: Array<UIGridColumn> = [
    {
      header: 'Active User Name',
      field: 'userDisplayName'
    },
    {
      header: 'Role',
      field: 'rolePDescription'
    },

    {
      header: 'Assignment Start Date',
      field: 'startDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
      // align: 'center'
    }
  ];

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
