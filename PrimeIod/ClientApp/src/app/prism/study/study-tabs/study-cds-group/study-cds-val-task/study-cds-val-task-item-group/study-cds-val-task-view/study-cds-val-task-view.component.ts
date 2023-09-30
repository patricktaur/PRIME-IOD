import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { StudyCDSValReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-val-task/study-cds-val-req.service';

import { StudyCdsRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';
@Component({
  selector: 'app-study-cds-val-task-view',
  templateUrl: './study-cds-val-task-view.component.html',
  styleUrls: ['./study-cds-val-task-view.component.css']
})
export class StudyCdsValTaskViewComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  id: any;
  record: any;

  loadRecordSub: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dataService: StudyCDSValReqService,
    private requestIdService: StudyCdsRequestIdService
  ) {}

  ngOnInit(): void {
   let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }
    this.loadRecord(this.id);
  }

  loadRecord(recId: number) {
    this.loading = true;
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.dataService.getRecordToView(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
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
}
