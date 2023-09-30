import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';

import { CrmTrackerFourService } from '../crm-tracker-four-service';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

@Component({
  selector: 'app-crm-tracker-four-edit',
  templateUrl: './crm-tracker-four-edit.component.html',
  styleUrls: ['./crm-tracker-four-edit.component.css']
})
export class CrmTrackerFourEditComponent implements OnInit, OnDestroy {
  loading = false;
  title = 'CRM Tracker - 4';

  record: any;
  form = new FormGroup({});

  id: number = 0;
  editMode: string | undefined;

  xxParId = 0;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private tblParamService: TblParamService,
    private xmodelService: CrmTrackerFourService
  ) {}

  ngOnInit(): void {
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
    this.loadRecordSub = this.xmodelService.getRecordToEdit(recId).subscribe(
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
    this.loadNewRecordSub = this.xmodelService.getNew().subscribe(
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

    this.addUpdateSub = this.xmodelService.addOrUpdate(this.record).subscribe(
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
      key: 'sponsor',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Sponsor',
        required: true,
        helpText: 'Help ...',
        maxLength: 10,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'statusDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Status Date',
        helpText: 'Help ...',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'upcoming',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Upcoming',
        type: 'number',
        helpText: 'Help ...',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-2'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'setup',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Setup',
        type: 'number',
        helpText: 'Help ...',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-2'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'ongoing',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Ongoing',
        type: 'number',
        helpText: 'Help ...',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-2'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'closed',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Closed',
        type: 'number',
        helpText: 'Help ...',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-2'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'onhold',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Onhold',
        type: 'number',
        helpText: 'Help ...',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-2'
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
