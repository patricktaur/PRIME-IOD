import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadChildren, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Location } from '@angular/common';
// import { StudyCdsDevTaskRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
import { StudyCDSInstReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-inst-task/study-cds-inst-req.service';

@Component({
  selector: 'app-study-cds-inst-task-history',
  templateUrl: './study-cds-inst-task-history.component.html',
  styleUrls: ['./study-cds-inst-task-history.component.css']
})
export class StudyCdsInstTaskHistoryComponent implements OnInit {
  loading: any;
  id: number | undefined;
  stateObj: any;
  testObj: any;
  records: any;

  loadRecordSub: Subscription | undefined;
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: StudyCDSInstReqService // private requestIdService: StudyCdsDevTaskRequestIdService
  ) {}

  ngOnInit(): void {
    let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }
    this.loadRecord(this.id);
  }

  loadRecord(recId: number | any) {
    this.loading = true;
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.dataService.getHistoryList(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.records = res;
          this.loading = false;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
  }

  backgroundStyleOnChange = {
    'background-color': '#f2eb1d',
    // 'text-align': 'center',
    // 'vertical-align': 'middle',
    'font-weight': 'bold',
    padding: '5px',
    color: 'black',
    'border-radius': '5px'
  };

  columns: Array<any> = [
    {
      header: 'History',
      field: 'versionNumber',
      align: 'right'
    },
    {
      header: 'History Date',
      field: 'updatedOn', //?? where is historyDate
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Created Date',
      field: 'createdOn',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Instruction Programming Task Category',
      field: 'programmingTaskPDescription',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Program Detail',
      field: 'programName',
      width: 30,
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    // {
    //   header: 'CDP',
    //   field: 'cdpPDisplayName',
    //   backgroundStyle: this.backgroundStyleOnChange,
    //   applyBackgroundStyleOn: 'on-next-row-value'
    // },
    {
      header: 'CDPL',
      field: 'cdplPDisplayName',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Instruction',
      field: 'instructions',
      width: '50',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Program Location',
      field: 'programLocation',
      width: '50',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Log Location',
      field: 'logLocation',
      width: '50',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Output Location',
      field: 'outputLocation',
      width: '50',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },

    {
      header: 'Additional Comments',
      field: 'additionalComments',
      width: '50',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    },
    {
      header: 'Last Saved By',
      field: 'updatedByDisplayName',
      backgroundStyle: this.backgroundStyleOnChange,
      applyBackgroundStyleOn: 'on-next-row-value'
    }
  ];
}
