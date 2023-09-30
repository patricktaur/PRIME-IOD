import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { CredentialsService } from '@app/core/authentication/credentials.service';

import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

@Component({
  selector: 'app-study-fte-review-edit',
  templateUrl: './study-fte-review-edit.component.html',
  styleUrls: ['./study-fte-review-edit.component.css']
})
export class StudyFteReviewEditComponent extends StudyEditBase implements OnInit {
  override controllerName = 'TblFteReview';
  title = 'FTE Review';

  reviewTypeParId = 8000;
  constructor(
    public override route: ActivatedRoute,

    private credSerivce: CredentialsService,
    private tblParamService: TblParamService
  ) {
    super(route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    //this page content becomes invalid if the StudyIconNumber dropdown is changed and refers to another study.
    //hence returning back to list.
    this.studyPropSub = this.studyEditService.getStudyProperties().subscribe((stProp: any) => {
      if (this.studyId && this.studyId !== stProp.studyId) {
        this.location.back();
      } else {
        this.studyId = stProp.studyId;
      }
    });
  }

  override addOrUpdate() {
    this.record.enteredById = this.credSerivce.currentUser.id;

    super.addOrUpdate();
  }

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'reviewTypeId',
      type: 'ng-select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Review Type',
        required: true,
        options: this.tblParamService.getParams(this.reviewTypeParId),
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
      key: 'dateEntered',
      type: 'date-picker',

      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Date Entered',
        required: true,
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      },
      validation: {
        show: true
      }
    },

    {
      key: 'enteredById',
      type: 'label-current-user',

      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Entered by',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-6'
      }
    },

    {
      key: 'dmpmfte',
      type: 'input',

      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'DMPM FTE',
        type: 'number',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-3'
      }
    },
    {
      key: 'cdlfte',
      type: 'input',

      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDL FTE',
        type: 'number',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-3'
      }
    },
    {
      key: 'cdcfte',
      type: 'input',

      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDC FTE',
        type: 'number',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-3'
      }
    },
    {
      key: 'programmerFte',
      type: 'input',

      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Programmer FTE',
        type: 'number',
        labelColClassName: 'col-5',
        fieldColClassName: 'col-3'
      }
    }
  ];
}
