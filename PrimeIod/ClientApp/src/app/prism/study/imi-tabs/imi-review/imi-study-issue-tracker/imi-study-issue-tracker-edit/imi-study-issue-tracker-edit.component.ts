import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
// import { StudyService } from '@app/prism/study/study.service';
// import { ProjectIssueTrackerService } from '@app/prism/study/study-review-tabs/study-review/project-issue-tracker/project-issue-tracker.service';
import { ImiProjectIssueTrackerService } from '@app/prism/study/imi-tabs/imi-review/imi-study-issue-tracker/imi-project-issue-tracker.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
@Component({
  selector: 'app-imi-study-issue-tracker-edit',
  templateUrl: './imi-study-issue-tracker-edit.component.html',
  styleUrls: ['./imi-study-issue-tracker-edit.component.css']
})
export class ImiStudyIssueTrackerEditComponent implements OnInit, OnDestroy {
  recId: number = 0;
  record: any = {};
  form = new FormGroup({});
  categoryParId: number = 8200;

  loading: boolean = false;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  studyEditModeSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tblParamService: TblParamService,
    private issueTrackerService: ImiProjectIssueTrackerService,
    private studyEditService: StudyEditService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      let editMode = params.editMode;
      if (editMode == 'add') {
        let studyId = params.studyId;

        this.loadNewRecord(studyId);
      } else {
        this.recId = params.id;
        this.loadRecord(this.recId);
      }
    });
    this.studyEditService.setStudyEditMode(true);
  }
  loadRecord(recId: number) {
    this.loading = true;
    this.issueTrackerService.getStudyIssueTrackerEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.form.reset();
          this.loading = false;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        this.loading = false;
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  loadNewRecord(studyId: any) {
    this.loading = true;
    this.issueTrackerService.getStudyIssueTrackerNew(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
          this.loading = false;
        } else {
          this.record = res;
          this.form.reset();
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

  addOrUpdate() {
    this.loading = true;
    this.issueTrackerService.addOrUpdateStudyIssueTracker(this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
        console.log(`success`);
      },
      err => {
        console.log(`error while editing = ${err}`);
        this.loading = false;
      }
    );
  }

  submit() {
    if (this.form.valid) {
      this.addOrUpdate();
    }
  }

  back() {
    this.location.back();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in Issue Tracker.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  // model: any = {};
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'issueCategoryPid',
      type: 'select',

      templateOptions: {
        label: 'Issue / Risk Category',
        options: this.tblParamService.getParams(this.categoryParId),
        valueProp: 'recId',
        labelProp: 'description',
        required: true
      }
    },
    {
      key: 'issueDescription',
      type: 'input',
      templateOptions: {
        label: 'Issue / Risk Description',
        placeholder: 'Issue / Risk Description',
        required: true,
        maxLength:500
      }
    },
    {
      key: 'correctiveActionPlanned',
      type: 'textarea',
      templateOptions: {
        label: 'Planned Corrective Action (CA) / Mitigation',
        placeholder: 'Planned Corrective Action (CA) / Mitigation',
        rows: 4,
        maxLength:500
      }
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',

          key: 'targetDateForCa',
          type: 'date-picker',
          templateOptions: {
            label: 'Target Date for CA'
          }
        }
      ]
    },
    {
      key: 'statusafterCa',
      type: 'input',
      templateOptions: {
        label: 'Status after CA',
        placeholder: 'Status after CA', 
        maxLength:50
      }
    }
  ];

  ngOnDestroy(): void {
    this.studyEditService.setStudyEditMode(false);
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
  }
}
