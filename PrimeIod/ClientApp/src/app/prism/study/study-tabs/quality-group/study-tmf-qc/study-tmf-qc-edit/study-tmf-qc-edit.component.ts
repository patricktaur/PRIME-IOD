import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
//for user

//for user with filter dropdown values:
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

@Component({
  selector: 'app-study-tmf-qc-edit',
  templateUrl: './study-tmf-qc-edit.component.html',
  styleUrls: ['./study-tmf-qc-edit.component.css']
})
export class StudyTmfQcEditComponent extends StudyEditBase implements OnInit {
  title = 'TMF QC';
  override controllerName = 'TblStudyTmfqc';
  qcStatusParId = 5800;
  regionParId = 1000;

  constructor(
    public override route: ActivatedRoute,
    public override router: Router, //for user with filter dropdown values:
    private tblParamService: TblParamService //
  ) {
    super(route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  //example overload:
  // addOrUpdate() {
  //   //code before update
  //   super.addOrUpdate();
  // }

  //todo:
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'expectedStartDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'TMF QC Expected Start Date',
        required: true,
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'qcStatusId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'QC Status',
        required: true,
        options: this.tblParamService.getParams(this.qcStatusParId),
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
      key: 'expectedCompletionDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'TMF QC Expected Completion Date',
        required: true,
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },
    {
      key: 'regionId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Region',
        required: true,
        options: this.tblParamService.getParams(this.regionParId),
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
      key: 'actualCompletionDate',
      type: 'date-picker',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'TMF QC Actual Completion Date',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
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
        label: 'Comment',
        rows: 3,
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    }
  ];
}
