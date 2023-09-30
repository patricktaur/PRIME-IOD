import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
// import { StudyCDSDevReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-req.service';
import { ImiRaDevReqService } from '@app/prism/study/imi-tabs/imi-trackers-group/imi-ra-devp-req/imi-ra-dev-req.service';

import { StudyCdsRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';

@Component({
  selector: 'app-imi-ra-devp-req-view',
  templateUrl: './imi-ra-devp-req-view.component.html',
  styleUrls: ['./imi-ra-devp-req-view.component.css']
})
export class ImiRaDevpReqViewComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  id: any;
  stateObjId: any;
  requestIdServiceId: any;
  record: any;

  loadRecordSub: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dataService: ImiRaDevReqService,
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