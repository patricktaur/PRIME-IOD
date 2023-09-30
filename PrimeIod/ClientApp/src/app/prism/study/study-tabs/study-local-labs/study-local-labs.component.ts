import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { StudyEditService } from '@app/prism/study/study-edit.service';
// import { StudyService } from '@app/prism/study/study.service';
import { StudyTabsService } from '@app/prism/study/study-tabs/study-tabs.service';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

@Component({
  selector: 'app-study-local-labs',
  templateUrl: './study-local-labs.component.html',
  styleUrls: ['./study-local-labs.component.css']
})
export class StudyLocalLabsComponent implements OnInit, OnDestroy {
  studyId: number | any;
  record: any;
  study: any;

  localLabTypeParId = 2200;
  localLabSetupTypeParId = 2300;
  localLabCleaningGroupParId = 2400;
  localLabCleaningFrequencyParId = 2500;
  localLabCleaningWeekParId = 2600;
  // lastRunDate: 2017-09-05T00:00:00,
  // nextPlannedRunDate: 2017-10-17T00:00:00,
  localLabStatusParId = 2700;
  // localLabComments: null,
  localLabCleaningDayParId = 2800;
  rangesEnteredInPid = 7300;

  sasCleaningProcessParId = 7400;

  loading: boolean = false;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  constructor(
    private studyEditService: StudyEditService,
    private studyTabService: StudyTabsService,
    private tblParamService: TblParamService
  ) {}

  ngOnInit(): void {
    this.studyEditService.setDashboard('dm');
    this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      if (this.studyId > 0) {
        this.loadRecord(this.studyId);
      }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getStudyLocalLabDTO(studyId).subscribe(
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
    this.saveSubscription = this.studyTabService.saveStudyLocalLab(this.studyId, this.record).subscribe(
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
      let message = "There are unsaved changes in Local Labs.  Click 'Ok' to continue without saving. ";
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
      key: 'localLabTypePid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Local Lab Type',
        required: true,
        options: this.tblParamService.getParams(this.localLabTypeParId),
        placeholder: '-Select-',
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6',
        helpText: 'Study phase I to IV'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'localLabSetupTypePid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Local Lab Cleaning Group',
        required: true,
        options: this.tblParamService.getParams(this.localLabSetupTypeParId),
        placeholder: '-Select-',
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6',
        helpText: 'Simple if phase IV or phase I , complex if oncology or transplant, normal otherwise'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'localLabCleaningGroupPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Local Lab Cleaning Frequency',
        required: true,
        options: this.tblParamService.getParams(this.localLabCleaningGroupParId),
        placeholder: '-Select-',
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6',
        helpText: 'Study phase I to IV'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'localLabCleaningFrequencyPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Local Lab Setup Type',
        required: true,
        options: this.tblParamService.getParams(this.localLabCleaningFrequencyParId),
        placeholder: '-Select-',
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6',
        helpText: 'Simple if phase IV or phase I , complex if oncology or transplant, normal otherwise'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'localLabCleaningWeekPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Local Lab Cleaning Week',
        options: this.tblParamService.getParams(this.localLabCleaningWeekParId),
        placeholder: '-Select-',
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6',
        helpText: ''
      },
      validation: {
        show: true
      }
    },
    {
      key: 'localLabCleaningDayPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Local Lab Cleaning Day',
        options: this.tblParamService.getParams(this.localLabCleaningDayParId),
        placeholder: '-Select-',
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6',
        helpText: ''
      },
      validation: {
        show: true
      }
    },
    {
      key: 'lastRunDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Last Run Date',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'nextPlannedRunDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Next Planned Run Date',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'localLabStatusPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Local Lab Status',
        options: this.tblParamService.getParams(this.localLabStatusParId),
        required: true,
        placeholder: '-Select-',
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6',
        helpText: ''
      },
      validation: {
        show: true
      }
    },
    {
      key: 'rangesEnteredInPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Ranges Entered In?',
        options: this.tblParamService.getParams(this.rangesEnteredInPid),
        placeholder: '-Select-',
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6',
        helpText: ''
      },
      validation: {
        show: true
      }
    },
    {
      key: 'sasCleaningProcessPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Sas Cleaning Process',
        options: this.tblParamService.getParams(this.sasCleaningProcessParId),
        placeholder: '-Select-',
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6',
        helpText: ''
      },
      validation: {
        show: true
      }
    },
    {
      key: 'localLabComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Local Lab Comments',
        rows: 3,
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    }
  ];

  submit() {
    if (this.form.valid) {
      this.saveRecord();
    }
  }

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
  }
}
