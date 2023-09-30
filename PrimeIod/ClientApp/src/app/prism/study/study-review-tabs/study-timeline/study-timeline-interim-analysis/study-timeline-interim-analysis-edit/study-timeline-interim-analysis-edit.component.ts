import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

import { StudyTimeLineInterimAnalysisService } from '@app/prism/study/study-review-tabs/study-timeline/study-timeline-interim-analysis/study-timeline-interim-analysis.service';
@Component({
  selector: 'app-study-timeline-interim-analysis-edit',
  templateUrl: './study-timeline-interim-analysis-edit.component.html',
  styleUrls: ['./study-timeline-interim-analysis-edit.component.css']
})
export class StudyTimelineInterimAnalysisEditComponent implements OnInit {
  recId: number = 0;
  record: any = {};
  form = new FormGroup({});

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tblParamService: TblParamService,
    private service: StudyTimeLineInterimAnalysisService
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
  }

  loadRecord(recId: number) {
    this.loading = true;
    this.service.getRecordToEdit(recId).subscribe(
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

  loadNewRecord(studyId: any) {
    this.loading = true;
    this.service.getNew(studyId).subscribe(
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
    this.service.addOrUpdate(this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
      },
      err => {
        console.log(`error while editing = ${err}`);
        this.loading = false;
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in Interim Analysis.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  submit() {
    if (this.form.valid) {
      this.addOrUpdate();
    }
  }

  back() {
    this.location.back();
  }

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',

          key: 'analysisInterimDate',
          type: 'date-picker',
          wrappers: ['help-text'], // included as work around for displaying validataion message

          templateOptions: {
            label: 'Interim Lock',
            required: true
          }
        },
        {
          className: 'col-4',

          key: 'analysisCutOffDate',
          type: 'date-picker',
          templateOptions: {
            label: 'CutOff Date'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',

          key: 'analysisSoftLockDate',
          type: 'date-picker',
          templateOptions: {
            label: 'SoftLock Date'
          }
        },
        {
          className: 'col-4',

          key: 'analysisHardLockDate',
          type: 'date-picker',
          templateOptions: {
            label: 'HardLock Date'
          }
        }
      ]
    }
  ];
}
