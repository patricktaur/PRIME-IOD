import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';

import { Observable, of } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

import { StudyExternalDataListService } from '../study-external-data-list.service';
@Component({
  selector: 'app-study-external-data-list-edit',
  templateUrl: './study-external-data-list-edit.component.html',
  styleUrls: ['./study-external-data-list-edit.component.css']
})
export class StudyExternalDataListEditComponent extends StudyEditBase implements OnInit {
  // recId: number;
  // record: any = {};
  // form = new FormGroup({});

  // loading: boolean = false;

  override controllerName = 'tblExternalData';

  dataTypeParId = 8500;
  vendorNameParId = 8600;

  dtsStatus: any = {};
  constructor(
    public override route: ActivatedRoute,
    public override router: Router,
    public override location: Location,
    public tblParamService: TblParamService,
    // public httpService: StudyHttpService,

    private studyexternaldatalistService: StudyExternalDataListService
  ) {
    super(route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.studyPropSub = this.studyEditService.getStudyProperties().subscribe((stProp: any) => {
      if (this.studyId && this.studyId !== stProp.studyId) {
        this.location.back();
      } else {
        this.studyId = stProp.studyId;
      }
    });
  }

  override canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes in External Data Edit.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'taskId',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Task Id',
        disabled: true,
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'dataTypeId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Data Type',
        required: true,
        options: this.tblParamService.getParams(this.dataTypeParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'vendorNameId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Vendor Name',
        required: true,
        options: this.tblParamService.getParams(this.vendorNameParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'noOfFilesExpectedId',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'No. Of Files Expected',
        required: true,
        type: 'number',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'frequencyOfTransferId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Frequency of Transfer',
        options: this.studyexternaldatalistService.FrequencyOfTransfer(),
        placeholder: '-Select-',
        valueProp: 'id',
        labelProp: 'value',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'dtsstatusId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'DTS Status',
        options: this.studyexternaldatalistService.DTSStatus(),
        placeholder: '-Select-',
        valueProp: 'id',
        labelProp: 'value',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'locationOfDts',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Location Of DTS',
        rows: 3,
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'testTransferStatusId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Test Transfer Status',
        options: this.studyexternaldatalistService.TestTransferStatus(),
        placeholder: '-Select-',
        valueProp: 'id',
        labelProp: 'value',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'testTransferDate',
      type: 'date-picker',

      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Test Transfer Date',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'productionTransferDate',
      type: 'date-picker',

      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Production Transfer Date',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'testTransferStatusId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Reconciliation Listing Status',
        options: this.studyexternaldatalistService.ReconciliationListingStatus(),
        placeholder: '-Select-',
        valueProp: 'id',
        labelProp: 'value',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'vendorIssueTrackingLog',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Vendor Issue Tracker Log',
        rows: 3,
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },

    {
      key: 'bindedTransferRequiredId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Unblinded Transfer Required',
        options: this.studyexternaldatalistService.BindedTransferRequired(),
        placeholder: '-Select-',
        valueProp: 'id',
        labelProp: 'value',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    }
  ];

  // loadDTSStatus() {
  //   this.studyexternaldatalistService.DTSStatus().subscribe(
  //     (res: any) => {
  //       this.dtsStatus = res;
  //       // console.log("dtsStatus:" + JSON.stringify(dtsStatus));
  //     },
  //     (err: any) => {
  //       console.log(`err = ${JSON.stringify(err, null, 2)}`);
  //       // this.isLoading = false;
  //     }
  //   );
  // }
}
