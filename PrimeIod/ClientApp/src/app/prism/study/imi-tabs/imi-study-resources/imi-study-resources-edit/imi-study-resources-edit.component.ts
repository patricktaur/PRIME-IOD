import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';
import { TblUserService } from '@app/prism/masters/tbl-user/tbl-user.service';

import { ImiResourcesService } from '@app/prism/study/imi-tabs/imi-study-resources/imi-resources-.service';
import { IMIResourcesDataService } from '@app/prism/study/imi-tabs/imi-study-resources/imi-resources-data.service';

import { StudyEditService } from '@app/prism/study/study-edit.service';
@Component({
  selector: 'app-imi-study-resources-edit',
  templateUrl: './imi-study-resources-edit.component.html',
  styleUrls: ['./imi-study-resources-edit.component.css']
})
export class ImiStudyResourcesEditComponent implements OnInit, OnDestroy {
  recId: number = 0;
  record: any = {};
  form = new FormGroup({});

  loading: boolean = false;

  studyEditMode: any;

  roleResourceOverlapValid: any = {}; //true for no overlap

  roleParId = 200;
  assignmentTypePId = 7800;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  roleResourceOverlapSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private studyEditService: StudyEditService,
    private tblParamService: TblParamService,
    private tblUserService: TblUserService,
    private services: ImiResourcesService,
    private studyResourcesDataService: IMIResourcesDataService
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

    this.form.valueChanges.subscribe((params: any) => {
      this.checkRoleResourceOverlapValidator();
    });
  }

  loadRecord(recId: number) {
    this.loading = true;
    this.loadRecordSub = this.services.getRecordToEdit(recId).subscribe(
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
    this.loadNewRecordSub = this.services.getNew(studyId).subscribe(
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
    this.addUpdateSub = this.services.addOrUpdate(this.record).subscribe(
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

  get dateCompareValidator() {
    if (!this.record?.startDate || !this.record?.stopDate) {
      return true;
    }

    //Accept if dates are on same day.  // better code possible ?
    if (new Date(this.record?.startDate).toDateString() === new Date(this.record?.stopDate).toDateString()) {
      return true;
    }
    return new Date(this.record.startDate).getTime() > new Date(this.record.stopDate).getTime() ? false : true;
  }

  checkRoleResourceOverlapValidator() {
    this.roleResourceOverlapSub = this.services.roleResourceOverlapValidator(this.record).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.roleResourceOverlapValid = res;
        } else {
          this.roleResourceOverlapValid = res;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in Resources Edit.  Click 'Ok' to continue without saving. ";
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
      key: 'rolePid',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Role',
        helpText: 'Role',

        options: this.studyResourcesDataService.resourceRoles,
        valueProp: 'recId',
        labelProp: 'description',
        required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'userId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Resource',
        helpText: 'Resource',

        options: [],
        valueProp: 'id',
        labelProp: 'value',
        required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      },
      hooks: {
        onInit: (field: any) => {
          //FormlyFieldConfig
          field.templateOptions.options = field.form.get('rolePid').valueChanges.pipe(
            startWith(this.record.rolePid),
            // switchMap((rolePId: number) => this.tblUserService.getUserByrole(rolePId))
            switchMap((rolePid: number) => this.tblUserService.getUserByrole(rolePid ?? 201))
          );
        }
      }
    },
    {
      key: 'startDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Start Date',

        required: true,

        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'stopDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Stop Date',

        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      }
    }
  ];

  ngOnDestroy(): void {
    this.studyEditService?.setStudyEditMode(false);
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
    this.roleResourceOverlapSub?.unsubscribe();
  }
}
