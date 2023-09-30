import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';

import { CrmTrackerThreeService } from '../crm-tracker-three-service';
// import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

//for user

//for user with filter dropdown values:
//import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

@Component({
  selector: 'app-crm-tracker-three-edit',
  templateUrl: './crm-tracker-three-edit.component.html',
  styleUrls: ['./crm-tracker-three-edit.component.css']
})
export class CrmTrackerThreeEditComponent implements OnInit, OnDestroy {
  loading = false;
  title = 'CRM Tracker 3';

  record: any;
  form = new FormGroup({});

  id: number = 0;
  editMode: string | undefined;

  sponsorParId = 1200;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private tblParamService: TblParamService,
    private crmTrackerThreeService: CrmTrackerThreeService //for user with filter dropdown values: //private tblParamService: TblParamService
  ) {
    // super(route);
  }

  ngOnInit(): void {
    // super.ngOnInit();
    // this.id = +this.route.snapshot.queryParamMap.get('id');
    let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }

    if (this.id > 0) {
      this.editMode = 'edit';
      this.loadRecord(this.id);
    } else {
      this.editMode = 'new';
      this.loadNewRecord();
    }
  }

  loadRecord(recId: number) {
    this.loading = true;
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.crmTrackerThreeService.getRecordToEdit(recId).subscribe(
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

  loadNewRecord() {
    this.loading = true;
    this.loadNewRecordSub = this.crmTrackerThreeService.getNew().subscribe(
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

    this.addUpdateSub = this.crmTrackerThreeService.addOrUpdate(this.record).subscribe(
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
  cancel() {
    this.location.back();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes.  Click 'Ok' to continue without saving. ";
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
  //todo:
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'sponsorPid',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Sponsor',

        options: this.tblParamService.getParams(this.sponsorParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
        required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'iconStudyCode',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Icon Study Code',
        maxLength: 10,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'status',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Status',
        maxLength: 200,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'notes',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Notes',
        rows: 3,
        maxLength: 500,
        // required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'comments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Comments',
        rows: 3,
        maxLength: 500,
        // required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    }
  ];

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
  }
}
