import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';

import { ProcessImprovementTrackerService } from '../../process-improvement-tracker-service';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';
import { TblParamExtendedExtendedService } from '@app/prism/masters/tbl-param-extended/tbl-param-extended.service';
import { ProcessImprovementCategoryCodelistService } from '@app/prism/masters/services/processImprovementCategoryCodelist.service';
@Component({
  selector: 'app-process-improvement-tracker-edit',
  templateUrl: './process-improvement-tracker-edit.component.html',
  styleUrls: ['./process-improvement-tracker-edit.component.css']
})
export class ProcessImprovementTrackerEditComponent implements OnInit, OnDestroy {
  loading = false;
  title = 'ProcessImprovementTracker';
  record: any;
  form = new FormGroup({});
  id: number = 0;
  editMode: string | undefined;

  yesNoParId = 600;
  yesNoNAParId = 7500;
  processImprovementStatusParId = 9900;
  billableOrNobillableIdParId = 9950;

  functionalAreaImpactedExtParId = 100;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private tblParamService: TblParamService,
    private tblParamExtendedExtendedService: TblParamExtendedExtendedService,
    private tblUserService: TblUserService,
    private processImprovementCategoryCodelistService: ProcessImprovementCategoryCodelistService,
    private xmodelService: ProcessImprovementTrackerService
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
      key: 'dueDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Due Date',
        helpText: 'Help ...',
        // required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'requestorId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Requestor',

        options: this.tblUserService.getUsers(),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',
        // required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'processImprovementStatusId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Process Improvement Status',
        helpText: 'Help ...',
        options: this.tblParamService.getParams(this.processImprovementStatusParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
        // required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'billableOrNobillableId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Billable / Not Billable',
        helpText: 'Help ...',
        options: this.tblParamService.getParams(this.billableOrNobillableIdParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'processImprovementCategoryId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Process Improvement Category',
        helpText: 'Help ...',
        options: this.processImprovementCategoryCodelistService.getCategories(),
        valueProp: 'id',
        labelProp: 'value',

        placeholder: '-Select-',
        // required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },

    {
      key: 'processImprovementSubCategoryId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Process Improvement Sub Category',
        helpText: 'Help ...',
        options: [], // this.processImprovementCategoryCodelistService.getCategories(),
        valueProp: 'id',
        labelProp: 'value',

        placeholder: '-Select-',
        // required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      },
      hooks: {
        onInit: (field: any) => {
          field.templateOptions.options = field.form.get('processImprovementCategoryId').valueChanges.pipe(
            startWith(0),
            switchMap((parId: number) => this.processImprovementCategoryCodelistService.getSubCategories(parId ?? 0))
          );
        }
      }
    },
    {
      key: 'scopeOfInitiative',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Scope of Initiative',
        helpText: 'Help ...',
        rows: 3,
        maxLength: 500,
        required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'processImprovementDocLocation',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Process Improvement Documentation Location including action log',
        helpText: 'Help ...',
        required: true,
        maxLength: 500,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },

    {
      key: 'processLeadId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Process Lead',

        options: this.tblUserService.getUsers(),
        //  .getUserByrole(this.requestorRoleParId),

        valueProp: 'id',
        labelProp: 'value',
        // required: true,
        helpText: '',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'functionalAreasImpacted',
      type: 'ng-multi-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Functional Area Impacted',
        helpText: '',
        // options: this.model.deliveryTypes,
        multiple: true,
        valueProp: 'recId',
        labelProp: 'description',

        options: this.tblParamExtendedExtendedService.getParams(this.functionalAreaImpactedExtParId),

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'subTeam',
      type: 'ng-multi-select', //'multicheckbox',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Sub Team',
        helpText: '',
        // options: this.model.deliveryTypes,
        multiple: true,
        valueProp: 'id',
        labelProp: 'value',

        options: this.tblUserService.getUsers(),

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },

    {
      key: 'sopwpguidelineImpactedId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'SOP/WP/Guidelines Impacted',
        helpText: 'Help ...',
        options: this.tblParamService.getParams(this.yesNoParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
        // required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'sopwpguidelineImpacted',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'SOP/WP Guidelines Impacted',
        helpText: 'Help ...',
        rows: 3,
        maxLength: 1000,
        // required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'finalProcessDocLocation',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Final Process Documentation Location',
        maxLength: 500,
        helpText: 'Help ...',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-8'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'trainingDevelopedAndRolledOutId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Training Developed and Rolled Out',
        helpText: 'Help ...',
        options: this.tblParamService.getParams(this.yesNoNAParId),
        valueProp: 'recId',
        labelProp: 'description',

        placeholder: '-Select-',
        // required: true,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
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
