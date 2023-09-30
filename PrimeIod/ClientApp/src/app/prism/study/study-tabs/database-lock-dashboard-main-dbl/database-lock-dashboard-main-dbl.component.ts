import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { StudyEditService } from '@app/prism/study/study-edit.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

// import { StudyReviewService } from '../../study-review.service';
import { StudyTabsService } from '@app/prism/study/study-tabs/study-tabs.service';

@Component({
  selector: 'app-database-lock-dashboard-main-dbl',
  templateUrl: './database-lock-dashboard-main-dbl.component.html',
  styleUrls: ['./database-lock-dashboard-main-dbl.component.css']
})
export class DatabaseLockDashboardMainDblComponent implements OnInit, OnDestroy {
  loading: boolean = false;

  study: any;
  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;

  studyMainDbl: any = {};

  constructor(
    public router: Router,

    private studyEditService: StudyEditService,
    private builder: FormBuilder,
    private studyTabService: StudyTabsService // private studyReviewService: StudyReviewService,'
  ) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      this.loadStudyMainDbl(st.studyId);
      // console.log("studyId:" + st.studyId);

      // if (st?.studyType?.startsWith('DM')) {
      //   this.study = st.studyId;

      // }
      // if (st?.studyType?.startsWith('IMI')) {
      //   //this.router.navigate(['/study/imi-review-group']);
      // }
    });
  }

  loadStudyMainDbl(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getPaperDashboardDTO(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.studyMainDbl = res;
          this.form.reset();
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  submit() {
    if (this.form.valid) {
      this.saveRecord();
    }
  }

  saveRecord() {
    this.loading = true;
    this.saveSubscription = this.studyTabService.savePaperDashboard(this.study, this.studyMainDbl).subscribe(
      res => {
        console.log(`success`);
        this.studyMainDbl = res;
        this.form.reset();
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
      let message = "There are unsaved changes in Main DBL.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions | any = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'plannedLpo',
          type: 'label',
          className: 'col-4',
          templateOptions: {
            label: 'Planned LPO',
            // hideLabel: true,
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy'
          }
        },
        {
          key: 'plannedCycleTime',
          type: 'label',
          className: 'col-4',
          templateOptions: {
            label: 'Planned Cycle Time (days)'
            // hideLabel: true,
          }
        },
        {
          key: 'actualLpo',
          type: 'label',
          className: 'col-4',
          templateOptions: {
            label: 'Actual LPO',
            // hideLabel: true,
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'plannedDbl',
          type: 'label',
          className: 'col-4',
          templateOptions: {
            label: 'Planned DBL',
            // hideLabel: true,
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy'
          }
        },
        {
          key: 'actualCycleTime',
          type: 'label',
          className: 'col-4',
          templateOptions: {
            label: 'Actual Cycle Time (days)'
            // hideLabel: true,
          }
        },

        {
          key: 'actualDbl',
          type: 'label',
          className: 'col-4',
          templateOptions: {
            label: 'Actual DBL',
            // hideLabel: true,
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy'
          }
        }
      ]
    },
    {
      template: '<hr />'
    },
    {
      key: 'justification',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Justification if above 21 days',
        rows: 3,
        hideLabel: true,
        pipe: 'date',
        pipeFormat: 'dd-MMM-yyyy',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      }
    },
    {
      key: 'resolutionActionComment',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Resolution Action',
        rows: 3,
        hideLabel: true,
        pipe: 'date',
        pipeFormat: 'dd-MMM-yyyy',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      }
    },
    {
      key: 'plannedDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'PreFinal DryRun',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
