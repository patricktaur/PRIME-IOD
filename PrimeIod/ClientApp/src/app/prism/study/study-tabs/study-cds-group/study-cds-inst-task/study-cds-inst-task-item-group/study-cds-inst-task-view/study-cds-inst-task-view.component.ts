import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { StudyCDSInstReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-inst-task/study-cds-inst-req.service';

import { StudyCdsRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';

@Component({
  selector: 'app-study-cds-inst-task-view',
  templateUrl: './study-cds-inst-task-view.component.html',
  styleUrls: ['./study-cds-inst-task-view.component.css']
})
export class StudyCdsInstTaskViewComponent implements OnInit, OnChanges {
  @Input() taskId: number | undefined;
  loading: boolean = false;
  id: any;
  record: any;

  loadRecordSub: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dataService: StudyCDSInstReqService,
    private requestIdService: StudyCdsRequestIdService
  ) {}

  ngOnInit(): void {
    let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }
    this.loadRecord(this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskId'].currentValue) {
      this.loadRecord(changes['taskId'].currentValue);
    }
  }

  loadRecord(recId: number) {
    this.loading = true;
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.dataService.getRecordToView(recId).subscribe(
      (res: any) => {
        this.loading = false;
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
