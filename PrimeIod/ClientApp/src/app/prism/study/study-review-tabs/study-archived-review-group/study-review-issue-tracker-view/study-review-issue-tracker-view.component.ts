import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { StudyEditService } from '@app/prism/study/study-edit.service';

@Component({
  selector: 'app-study-review-issue-tracker-view',
  templateUrl: './study-review-issue-tracker-view.component.html',
  styleUrls: ['./study-review-issue-tracker-view.component.css']
})
export class StudyReviewIssueTrackerViewComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  title = ''; //'Issue Tracker';
  controllerName = 'tblStudyIssueTracker';
  messageFieldForDelete = 'issueCategoryPDescription';

  studyId: number | undefined;
  issueTracker: any;

  pageNumber = 1;
  pageSize = 50;

  records: any;

  studyIdSub: Subscription | undefined;
  constructor(
    public router: Router,

    private studyEditService: StudyEditService
  ) {}

  ngOnInit(): void {
    this.studyIdSub = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      // if (this.studyId > 0) {
      //   this.loadIssueTracker(this.studyId);
      // }
    });
  }

  columns: Array<any> = [
    {
      header: 'Issue Category',
      field: 'issueCategoryPDescription'
    },
    {
      header: 'Issue Description',
      field: 'issueDescription'
    },
    {
      header: 'Planned Corrective Action (CA)',
      field: 'correctiveActionPlanned',
      width: 50
    },
    {
      header: 'Target Date for CA',
      field: 'targetDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Status after CA',
      field: 'status'
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSub?.unsubscribe();
  }
}
