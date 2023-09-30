import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { StudyListBase } from '@app/prism/shared-comps/study-list-edit/study-list-base';

import { StudyEditService } from '@app/prism/study/study-edit.service';
@Component({
  selector: 'app-study-fte-review-averages-dashboard',
  templateUrl: './study-fte-review-averages-dashboard.component.html',
  styleUrls: ['./study-fte-review-averages-dashboard.component.css']
})
export class StudyFteReviewAveragesDashboardComponent extends StudyListBase implements OnInit, OnDestroy {
  override title = 'Average FTE';
  override controllerName = 'TblAverageFTE'; //***Todo***
  messageFieldForDelete = 'interimDate'; //***Todo***
  override keyField = 'recId';

  override studyIdSub: Subscription | any;
  sixMonthRecords: any;
  constructor(public override actRoute: ActivatedRoute, public override studyEditService: StudyEditService) {
    super(actRoute, studyEditService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.studyIdSub = this.studyEditService._studyId.subscribe((st: any) => {
      this.loadSixMonthRecords(this.studyId, this.controllerName, 'six-month-records');
    });
  }
  //"row": 0, "col": "dmpm"
  eventValue = { row: 0, col: 'dmpm' };
  override onRaiseEvent(value: any) {
    this.eventValue = value;
  }

  loadSixMonthRecords(studyId: number | any, controllerName: string, actionName: string) {
    this.loadRecordSub = this.httpService.getList(studyId, controllerName, actionName).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.sixMonthRecords = res;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  get filterRecordsTitle() {
    var abc = ['6 months', '3 months', '1 month'];
    return this.eventValue.col.toUpperCase() + ' - ' + abc[this.eventValue.row];
  }

  get filteredSixMonthRecords() {
    const months = [6, 3, 1];
    const Ago = months[this.eventValue.row];
    const monthsAgo = new Date();
    monthsAgo.setMonth(monthsAgo.getMonth() - (Ago + 1));

    return this.sixMonthRecords
      ?.filter(
        (n: any) =>
          n.role.toLowerCase() == this.eventValue?.col.toLowerCase() &&
          new Date(n.monthYear).getTime() >= monthsAgo.getTime()
      )
      ?.sort((a: any, b: any) => {
        return new Date(b.monthYear).getTime() - new Date(a.monthYear).getTime();
      });
  }

  override ngOnDestroy(): void {
    this.studyIdSub?.unsubscribe();
  }
}
