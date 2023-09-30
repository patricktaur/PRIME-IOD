import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { StudyTabsService } from '@app/prism/study/study-tabs/study-tabs.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-study-offline-ignore',
  templateUrl: './study-offline-ignore.component.html',
  styleUrls: ['./study-offline-ignore.component.css']
})
export class StudyOfflineIgnoreComponent implements OnInit {
  loading: boolean = false;
  studyId: number = 0;
  records: any;

  savedAt: Date | undefined;

  loadSubscription: Subscription | undefined;
  studyIdSubscription: Subscription | undefined;
  saveSubscription: Subscription | undefined;
  isDirtySub: Subscription | undefined;

  hasDMManagerRole: boolean = false;
  constructor(
    public router: Router,
    private credentialsService: CredentialsService,
    private studyEditService: StudyEditService,
    private studyTabService: StudyTabsService
  ) {}

  ngOnInit(): void {
    // this.studyIdSubscription = this.studyEditService._studyId.subscribe((st: any) => {
    //   this.studyId = st;
    //   if (this.studyId > 0) {
    //     this.loadRecord(this.studyId);
    //   }
    // });

    this.studyIdSubscription = this.studyEditService.getStudyProperties().subscribe((st: any) => {
      // if (st?.studyType?.startsWith('DM')) {
      this.studyId = st.studyId;
      this.loadRecord(st.studyId);
      // }
      // if (st?.studyType?.startsWith('IMI')) {
      //   this.router.navigate(['/study/imi-review-group/']);
      // }
    });

    this.isDirtySub = this.form.valueChanges.subscribe(value => {
      this.studyEditService.setStudyEditMode(this.form.dirty);
    });
  }

  loadRecord(studyId: number) {
    this.loading = true;
    this.loadSubscription = this.studyTabService.getOffLineIgnoreItems(studyId).subscribe(
      (res: any) => {
        // console.log(`res = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.records = res;
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
    this.saveSubscription = this.studyTabService.saveOfflineIgnoreItems(this.studyId, this.records).subscribe(
      res => {
        this.loadRecord(this.studyId);
        this.savedAt = new Date();
        this.loading = false;
      },
      err => {
        console.log(`error while saving = ${err}`);
        this.loading = false;
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in Offline Checks.  Click 'Ok' to continue without saving. ";
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
      fieldGroupClassName: 'row bg-light',
      fieldGroup: [
        // { className: 'col-sm-2', template: '<label class="form-label">Form Name<label class="form-label">' },
        // { className: 'col-sm-3', template: '<label class="form-label">Logic<label class="form-label">' },
        // { className: 'col-sm-3', template: '<label class="form-label">Message<label class="form-label">' },
        // { className: 'col-sm-1', template: '<label class="form-label">Is Action Required<label class="form-label">' },
        // { className: 'col-sm-3', template: '<label class="form-label">Comments<label class="form-label">' }
        { className: 'col-sm-2', template: '<label>Form Name<label>' },
        { className: 'col-sm-3', template: '<label>Logic<label>' },
        { className: 'col-sm-3', template: '<label>Message<label>' },
        { className: 'col-sm-1', template: '<label>No Action Required<label>' },
        { className: 'col-sm-3', template: '<label>Comments<label>' }
      ]
    },

    {
      key: '',
      type: 'repeat',
      templateOptions: {
        hideRemoveButton: true,
        hideAddButton: true
      },
      fieldArray: {
        fieldGroupClassName: 'row alt-row-form',
        fieldGroup: [
          {
            className: 'col-sm-2',
            type: 'label',
            key: 'formName',
            templateOptions: {
              // pipe: 'date',
              // pipeFormat: 'MMM-yyyy'
            }
          },

          {
            type: 'label',
            key: 'logic',
            className: 'col-sm-3',

            templateOptions: {
              // helpText: 'Enter the number of pages expected to be entered in the month, INCLUDING diary/QOL pages',
              // type: 'number'
            }
          },
          {
            type: 'label',
            key: 'message',
            className: 'col-sm-3',

            templateOptions: {
              // helpText: 'Enter the number of pages expected to be entered in the month, INCLUDING diary/QOL pages',
              // type: 'number'
            }
          },
          {
            type: 'checkbox',
            key: 'offlineIgnore',
            className: 'col-sm-1',
            wrappers: ['help-text'],
            templateOptions: {
              // helpText: 'Enter the number of pages expected to be entered in the month, INCLUDING diary/QOL pages',
              // type: 'number'
            }
          },
          {
            type: 'textarea',
            key: 'comments',
            className: 'col-sm-3',
            wrappers: ['help-text'],
            templateOptions: {
              rows: 4,
              hideRequiredMarker: true
              // helpText: 'Enter the number of pages expected to be entered in the month, INCLUDING diary/QOL pages',
              // type: 'number'
            },
            expressionProperties: {
              'templateOptions.required': x => x.offlineIgnore
            }
          }
        ]
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
