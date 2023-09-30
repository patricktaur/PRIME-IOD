import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

import { StudyDeliverablesService } from '../study-deliverables.service';
import { StudyEditService } from '@app/prism/study/study-edit.service';
@Component({
  selector: 'app-study-deliverables-edit',
  templateUrl: './study-deliverables-edit.component.html',
  styleUrls: ['./study-deliverables-edit.component.css']
})
export class StudyDeliverablesEditComponent implements OnInit, OnDestroy {
  recId: number = 0;
  record: any = {};
  form = new FormGroup({});

  deliveryTypeParId = 3400;
  outcomeParId = 3500;

  loading: boolean = false;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tblParamService: TblParamService,
    private studydeliverablesService: StudyDeliverablesService,
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
    this.loadRecordSub = this.studydeliverablesService.getRecordToEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  loadNewRecord(studyId: any) {
    this.loading = true;
    this.loadNewRecordSub = this.studydeliverablesService.getNew(studyId).subscribe(
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

  addOrUpdate() {
    this.loading = true;
    this.addUpdateSub = this.studydeliverablesService.addOrUpdate(this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in StudyDeliverables Edit.  Click 'Ok' to continue without saving. ";
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

          key: 'deliverableDate',
          type: 'date-picker',
          wrappers: ['help-text'], // included as work around for displaying validataion message
          templateOptions: {
            label: 'Delivery Date',
            required: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-8',
          key: 'deliverableTypePid',
          type: 'select',
          templateOptions: {
            label: 'Delivery Type',
            options: this.tblParamService.getParams(this.deliveryTypeParId),
            valueProp: 'recId',
            labelProp: 'description',
            placeholder: '-Select-',
            required: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-8',
          key: 'deliverableName',
          type: 'input',
          templateOptions: {
            label: 'Delivery Name',
            required: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-8',
          key: 'outcomePid',
          type: 'select',
          templateOptions: {
            label: 'Outcome',
            options: this.tblParamService.getParams(this.outcomeParId),
            valueProp: 'recId',
            labelProp: 'description',
            placeholder: '-Select-',
            required: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-8',
          key: 'comment',
          type: 'textarea',
          templateOptions: {
            label: 'Comment',
            rows: 3
          }
        }
      ]
    }
  ];

  ngOnDestroy(): void {
    this.studyEditService.setStudyEditMode(false);
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
  }
}
