import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CDSTrackersService } from '@app/prism/cds-trackers/cds-trackers.service';
import { Json2CsvDownloadService } from '@app/shared/services/json-2-csv-download.service';

@Component({
  selector: 'app-cds-dev-req-dashboard',
  templateUrl: './cds-dev-req-dashboard.component.html',
  styleUrls: ['./cds-dev-req-dashboard.component.css']
})
export class CdsDevReqDashboardComponent implements OnInit, OnDestroy {
  // @Input() title : string;
  @Input() userId: number = 0; //0,lmkr All-Dashboard
  @Input() tag: string = '';
  @Output() itemClicked = new EventEmitter<any>();
  @Output() totalCountEvent = new EventEmitter<any>();
  dashboard: any;
  title = 'All Development Request Dashboard';
  loadSub: Subscription | undefined;
  constructor(
    // public router: Router,
    // private actRoute: ActivatedRoute,
    private cdsTrackerServices: CDSTrackersService
  ) {}

  ngOnInit(): void {
    const val = this.tag == 'my' ? 'My' : 'All';
    this.title = val + '  Development Request Dashboard';
    this.loadDashboard();
  }

  loadDashboard() {
    this.loadSub = this.cdsTrackerServices.getCdsDevStatusDashboard(this.tag).subscribe((res: any) => {
      this.dashboard = res;
      this.totalCountEvent.emit(res.totalCount);
    });
  }

  onItemClicked(value: any) {
    const output = { tag: this.tag, selectedItem: value.selectedItem.keyValue };
    this.itemClicked.emit(output);
  }

  ngOnDestroy(): void {
    this.loadSub?.unsubscribe();
  }
}
