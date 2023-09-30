import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyTabsService } from '@app/prism/study/study-tabs/study-tabs.service';

@Component({
  selector: 'app-study-kpi',
  templateUrl: './study-kpi.component.html',
  styleUrls: ['./study-kpi.component.css']
})
export class StudyKpiComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  studyId: number = 0;
  record: any = undefined;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  saveSubscription: Subscription | undefined;

  constructor(private studyEditService: StudyEditService, private studyTabService: StudyTabsService) {}

  ngOnInit(): void {
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;
        this.loadRecord(st.studyId);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getStudyKpiDTO(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.form.reset();

          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  saveRecord() {
    this.loading = true;
    this.saveSubscription = this.studyTabService.saveStudyKpi(this.studyId, this.record).subscribe(
      res => {
        this.record = res;
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
      let message = "There are unsaved changes in CDMS.  Click 'Ok' to continue without saving. ";
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
      this.saveRecord();
    }
  }

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'unlocksDm',
      type: 'input',
      wrappers: ['horizontal-layout', 'background-color'],
      templateOptions: {
        label: 'No of DM unlocks',
        type: 'number',
        min: 0,
        description: 'Data Used For DM Metrics Reporting',

        // helpText: 'Actual Number of Unique CRFs (This information should be updated throughout the study)',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },

      validation: {
        show: true
      }
    },
    {
      key: 'unlocksNonDm',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'No. of NonDM unlocks',
        type: 'number',
        min: 0,
        // helpText: 'Actual Number of Unique CRFs (This information should be updated throughout the study)',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },

      validation: {
        show: true
      }
    },

    {
      key: 'unlocksReasons',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Reason for Unlock',
        rows: 3,
        maxLength: 200,
        description: 'Max: 200 characters.',
        // helpText: 'Enter any comments related to CDMS',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },

      validation: {
        show: true
      }
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
    this.saveSubscription?.unsubscribe();
  }
}
