import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProcessImprovementTrackerService } from '../../process-improvement-tracker-service';

@Component({
  selector: 'app-process-improvement-tracker-item-group-container',
  templateUrl: './proc-imp-tracker-item-grp-container.component.html',
  styleUrls: ['./proc-imp-tracker-item-grp-container.component.css']
})
export class ProcessImporementTrackerItemGroupContainerComponent implements OnInit {
  id: number = 0;
  deleteRecordSub: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private processImprovementTrackerService: ProcessImprovementTrackerService
  ) {}

  ngOnInit(): void {
    let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }
  }

  delete(recId: number) {
    this.deleteRecordSub = this.processImprovementTrackerService.deleteRecord(recId).subscribe(
      (res: any) => {
        // this.serverResponseService.addServerMessages(res);
        // this.serverResponses = this.serverResponseService.serverResponses;
        this.back();
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  back() {
    this.location.back();
  }
}
