import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudyCDSDevReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-req.service';

@Component({
  selector: 'app-cds-req-item-dashboard',
  templateUrl: './cds-req-item-dashboard.component.html',
  styleUrls: ['./cds-req-item-dashboard.component.css']
})
export class CdsReqItemDashboardComponent implements OnInit, OnDestroy {
  // @Input() id: number;
  @Input() record: any;
  // record: any;
  loadRecordSub: Subscription | undefined;
  constructor(private dataService: StudyCDSDevReqService) {}

  ngOnInit(): void {
    // this.loadRecord(this.id);
  }

  loadRecord(recId: number) {
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.dataService.getDashboardView(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.record = res;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  getDateVal(dateTimeVal: any) {
    if(dateTimeVal) {
      return dateTimeVal + 'Z';
    } else {
      return "";
    }
  }

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
  }
}
