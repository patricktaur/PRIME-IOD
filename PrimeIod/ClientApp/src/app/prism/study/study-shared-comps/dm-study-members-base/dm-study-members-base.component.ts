import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';

import { StudyResourcesService } from '@app/prism/study/study-tabs/study-resources-group/study-resources/study-resources.service';


@Component({
  selector: 'app-dm-study-members-base',
  templateUrl: './dm-study-members-base.component.html',
  styleUrls: ['./dm-study-members-base.component.css']
})
export class DmStudyMembersBaseComponent {
  @Input() studyId: any | undefined;
  isLoading = false;
  pageNumber = 1;
  pageSize = 10;

  
  records: any = [];

  loadSub: Subscription | undefined;

  constructor(private studyResourcesService: StudyResourcesService) {}

  ngOnInit() {
    this.loadStudyMembers();
  }


  loadStudyMembers() {
    this.isLoading = true;
    this.records = null;

    this.loadSub = this.studyResourcesService.getActiveResournces(this.studyId).subscribe(
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

  columns: Array<UIGridColumn> = [
    {
      header: 'Role',
      field: 'rolePDescription'
    },
    
    {
      header: 'Active User Name',
      field: 'userDisplayName'
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
