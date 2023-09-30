import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { StudyCDSCodingReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-coding-task/study-cds-coding-req.service';

import { StudyCdsRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';

@Component({
  selector: 'app-tudy-cds-coding-task-view',
  templateUrl: './tudy-cds-coding-task-view.component.html',
  styleUrls: ['./tudy-cds-coding-task-view.component.css']
})
export class StudyCdsCodingTaskViewComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  id: any;
  record: any;

  loadRecordSub: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dataService: StudyCDSCodingReqService,
    private requestIdService: StudyCdsRequestIdService
  ) {}

  ngOnInit(): void {
    // let stateObj: any = this.location.getState();
    // this.id = stateObj.id;
    // this.loadRecord(this.id);

   let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }
    if (!this.id) {
      let stateObj: any = this.location.getState();
      this.id = stateObj.id;
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
