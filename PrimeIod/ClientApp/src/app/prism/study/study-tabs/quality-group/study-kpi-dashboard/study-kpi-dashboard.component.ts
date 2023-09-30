import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { UIGridColumn } from '@app/shared/common/ui-grid-column';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyTabsService } from '@app/prism/study/study-tabs/study-tabs.service';

@Component({
  selector: 'app-study-kpi-dashboard',
  templateUrl: './study-kpi-dashboard.component.html',
  styleUrls: ['./study-kpi-dashboard.component.css']
})
export class StudyKpiDashboardComponent implements OnInit {
  loading: boolean = false;
  studyId: number = 0;
  records: any = undefined;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;
  saveSubscription: Subscription | undefined;

  dashboardForm: any = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private studyEditService: StudyEditService,
    private studyTabService: StudyTabsService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      if (st?.studyType?.startsWith('DM')) {
        this.studyId = st.studyId;
        this.loadRecords(st.studyId);
      }
    });

    this.isDirtySub = this.dashboardForm.valueChanges.subscribe((value: any) => {
      this.studyEditService.setStudyEditMode(this.dashboardForm.dirty);
    });
  }

  buildForm() {
    this.dashboardForm = this.formBuilder.group({
      records: this.formBuilder.array([])
    });
  }

  get initGroupRecord() {
    return this.formBuilder.group({
      groupname: [''],
      items: this.formBuilder.array([])
    });
  }

  get initTableRecord() {
    return this.formBuilder.group({
      recId: [''],
      kpiCategory: [''],
      kpiName: [''],
      kpiDescription: [''],
      criteriaForPass: [''],
      label1: [''],
      field1: [''],
      label2: [''],
      field2: [''],
      label3: [''],
      field3: [''],
      label4: [''],
      field4: [''],
      label5: [''],
      kpiOutcome: [''],
      kpiComments: ['']
    });
  }

  loadRecords(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getStudyKpiDashboard(studyId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.records = res;
          this.loadRecordsToForm();
          // this.form.reset();
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  loadRecordsToForm() {
    // this.dashboardForm.patchValue({
    //   records: this.formBuilder.array([])
    // })
    const recordFormArray = this.dashboardForm?.get('records') as FormArray;
    recordFormArray.clear();
    for (let i = 0; i < this.records.length; i++) {
      let groupRecord = this.initGroupRecord;
      let itemsFormArray = groupRecord.get('items') as FormArray;
      for (let j = 0; j < this.records[i].items.length; j++) {
        itemsFormArray.push(this.initTableRecord);
      }

      // console.log(`group record = ${JSON.stringify(groupRecord.value, null, 2)}`);

      recordFormArray.push(groupRecord);
    }

    this.dashboardForm.patchValue({
      records: this.records
    });

    // console.log(JSON.stringify(this.dashboardForm.value, null, 2));
  }

  resetForm() {
    this.dashboardForm.patchValue({
      records: this.records
    });
  }

  getRecordFormControls(form: any) {
    return form.controls.records.controls;
  }

  getItemsFormControls(group: any) {
    return group.controls.items.controls;
  }

  // saveRecord() {
  //   this.loading = true;
  //   //  console.log(`records = ${JSON.stringify(this.records, null, 2)}`);
  //   this.saveSubscription = this.studyTabService.saveStudyKpiDashboard(this.studyId, this.dashboardForm.value).subscribe(
  //     res => {
  //       this.records = res;
  //       this.dashboardForm.reset();
  //       this.loading = false;
  //     },
  //     err => {
  //       console.log(`error while editing = ${err}`);
  //       this.loading = false;
  //     }
  //   );
  // }

  saveRecord() {
    this.loading = true;
    // console.log(`records = ${JSON.stringify(this.dashboardForm.value, null, 2)}`);
    let records1: any[] = [];
    this.dashboardForm.value?.records.forEach((record: any) => {
      record.items.forEach((item: any) => {
        records1.push({ recId: item.recId ?? 0, kpiComments: item.kpiComments });
      });
    });

    //  console.log(`records1 = ${JSON.stringify(records1, null, 2)}`);

    this.saveSubscription = this.studyTabService.saveStudyKpiDashboard(this.studyId, records1).subscribe(
      res => {
        this.records = res;
        this.dashboardForm.reset();
        this.loadRecordsToForm();

        this.loading = false;
      },
      err => {
        console.log(`error while editing = ${err}`);
        this.loading = false;
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.dashboardForm.dirty) {
      let message = "There are unsaved changes in CDMS.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.dashboardForm.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  submit() {
    if (this.dashboardForm.valid) {
      this.saveRecord();
    }
  }

  getKpiOutcomeStyle(kpiOutcome: string) {
    if (kpiOutcome === 'Pass') {
      return { 'background-color': 'green' };
    } else if (kpiOutcome === 'Fail') {
      return { 'background-color': 'red' };
    } else if (kpiOutcome === 'NA') {
      return { 'background-color': 'grey' };
    }
    return {};
  }

  columnKpiDescription: UIGridColumn = {
    field: 'kpiDescription',
    width: 30
  };

  columncriteriaForPass: UIGridColumn = {
    field: 'criteriaForPass',
    width: 30
  };

  ngOnDestroy(): void {
    this.studyIdSubscription?.unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.isDirtySub?.unsubscribe();
    this.saveSubscription?.unsubscribe();
  }
}
