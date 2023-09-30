import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
// import { CdmsTrackerService } from '@app/prism/study/study-tabs/study-cdms-group/study-cdms-tracker/cdms-tracker.service';
import { ImiCdmsTrackerService } from '@app/prism/study/imi-tabs/imi-cdms-group/imi-study-cdms-tracker/imi-cdms-tracker.service';

@Component({
  selector: 'app-imi-study-cdms-tracker-view',
  templateUrl: './imi-study-cdms-tracker-view.component.html',
  styleUrls: ['./imi-study-cdms-tracker-view.component.css']
})
export class ImiStudyCdmsTrackerViewComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  id: any;
  record: any;

  loadRecordSub: Subscription | undefined;
  constructor(private route: ActivatedRoute, private location: Location, private dataService: ImiCdmsTrackerService) {}

  ngOnInit(): void {
    // let id: string | null = this.route.snapshot.queryParamMap.get('id');
    // if(id != null) {
    //   this.id = +id;
    // }
    this.id = this.route.snapshot.queryParamMap.get('id');
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
