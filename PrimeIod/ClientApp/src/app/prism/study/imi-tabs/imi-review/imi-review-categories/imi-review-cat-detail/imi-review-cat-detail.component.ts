import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-imi-review-cat-detail',
  templateUrl: './imi-review-cat-detail.component.html',
  styleUrls: ['./imi-review-cat-detail.component.css']
})
export class ImiReviewCatDetailComponent implements OnInit {
  @Input() form: any = {};
  @Input() parId: number = 0;
  @Input() title: string = '';
  @Input() records: any = {};
  medianValue: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((val: any) => {
      //Score calculation of the tab
      const nums: number[] = [];
      for (let i = 0; i < this.filteredRecord.length; i++) {
        if (this.filteredRecord[i].notApplicableId != true && this.filteredRecord[i].projectCategoryScore != null) {
          nums.push(this.filteredRecord[i].projectCategoryScore * 1);
        }
      }

      if (nums != null) {
        console.log('Unsorted');
        console.log(nums);
        console.log('sorted');
        nums.sort();
        console.log(nums);
        if (nums.length % 2 != 0) {
          this.medianValue = nums[(nums.length - 1) / 2];
          // console.log("this.medianValue = nums[(nums.length - 1) / 2];");
          // console.log("medianvalue");
          // console.log(this.medianValue);
        } else {
          var temp1: number = nums[nums.length / 2];
          let temp2: number = nums[nums.length / 2 - 1];
          var temp3: number = temp1 + temp2;
          var temp4: number = Math.trunc(temp3 / 2); //Math.round(temp3/2);
          this.medianValue = temp4;
          // console.log("var temp1: number = nums[nums.length / 2];");
          // console.log(temp1);
          // console.log("let temp2: number = nums[nums.length / 2 - 1];");
          // console.log(temp2);
          // console.log("var temp3: number = temp1 + temp2;");
          // console.log(temp3);
          // console.log("var temp4: number = Math.trunc(temp3 / 2);");
          // console.log(temp4);
          // console.log("medianvalue");
          // console.log(this.medianValue);
        }
      }
      // console.log('score calculation :' + this.medianValue);
      if (!isNaN(this.medianValue)) {
        this.filteredRecord[0].projectCategoryScore = this.medianValue;
      }
      // console.log(this.record);
    });
  }

  get filteredRecord() {
    // return this.records?.filter((n: any) => n.fieldParId === this.parId);
    const filtered = this.records
      ?.filter(
        (n: any) => n.fieldParId === this.parId
        // && n.fieldOrderNumber > 1
      )
      .sort((a: any, b: any) => a.fieldOrderNumber - b.fieldOrderNumber);

    if (filtered && filtered.length > 0) {
      filtered[0].notApplicableId = true;
    }

    return filtered;
  }

  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row bg-green text-center',
      fieldGroup: [
        {
          className: 'col-3',
          template: '<label >Project Status Categories</label>'
        },
        {
          className: 'col-1',
          template: '<label >N/A</label>'
        },
        {
          className: 'col-2',
          template: '<label >Project Category Score</label>'
        },
        {
          className: 'col-3',
          template: '<label >Comment</label>'
        },
        {
          className: 'col-3',
          template: '<label >Action</label>'
        }
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
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-3',
            key: 'fieldDescription',
            type: 'label'
          },
          {
            key: 'notApplicableId',
            type: 'checkbox',
            wrappers: ['help-text'],
            className: 'col-1',
            expressionProperties: {
              //hide: '(field.parent.key==0)?1:0',
              'templateOptions.disabled': '(field.parent.key==0)?1:0',
              
            }
          },
          {
            className: 'col-2 form-group',
            key: 'projectCategoryScore',
            type: 'custom-select',
            wrappers: ['help-text'], //workaround for displaying mandatory *

            templateOptions: {
              // required: true
            },

            expressionProperties: {
              // 'templateOptions.onchange': this.setupValueChanges,
              'templateOptions.disabled': x => x.notApplicableId,
              'model.projectCategoryScore': 'field.parent.key!=0 && model.notApplicableId ? null : model.projectCategoryScore'
              //https://egghead.io/lessons/angular-dynamically-set-model-properties-with-angular-formly-expressions
              // 'templateOptions.required': x => !x.statusFlag
            }
          },
          {
            type: 'textarea',
            key: 'comment',
            wrappers: ['help-text'],
            className: 'col-3',
            templateOptions: {
              maxLength: 500
            }
          },
          {
            type: 'textarea',
            key: 'action',
            wrappers: ['help-text'],
            className: 'col-3',
            templateOptions: {
              maxLength: 500
            }
          }
        ]
      }
    }
  ];
}
