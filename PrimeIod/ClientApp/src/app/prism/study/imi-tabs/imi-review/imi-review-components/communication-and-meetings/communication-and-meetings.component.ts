import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyService } from '@app/shared/formly/services/formly.service';

@Component({
  selector: 'app-communication-and-meetings',
  templateUrl: './communication-and-meetings.component.html',
  styleUrls: ['./communication-and-meetings.component.css']
})
export class CommunicationAndMeetingsComponent implements OnInit {
  @Input() record: any = {};
  @Input() form: any = {};
  @Output() isDirtyChanged = new EventEmitter<any>();
  medianValue: number = 0;
  isDirty: boolean = false;
  constructor(private formlyService: FormlyService) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((val: any) => {
      // this.isDirty = this.formlyService.isFormlyDirty(this.form, this.fields);
      // this.isDirtyChanged.emit(this.isDirty);

      //Score calculation of the tab
      const nums: number[] = [];
      for (let i = 1; i < this.record.length; i++) {
        if (this.record[i].notApplicableId != true && this.record[i].projectCategoryScore != null) {
          nums.push(this.record[i].projectCategoryScore * 1);
        }
      }

      if (nums != null) {
        // console.log(nums);
        nums.sort();
        if (nums.length % 2 != 0) {
          this.medianValue = nums[(nums.length - 1) / 2];
        } else {
          var temp1: number = nums[nums.length / 2];
          let temp2: number = nums[nums.length / 2 - 1];
          var temp3: number = temp1 + temp2;
          var temp4: number = Math.trunc(temp3 / 2); //Math.round(temp3/2);
          this.medianValue = temp4;
        }
      }
      // console.log('score calculation :' + this.medianValue);
      if (!isNaN(this.medianValue)) {
        this.record[0].projectCategoryScore = this.medianValue;
      }
      // console.log(this.record);
    });
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
            key: 'fieldName',
            type: 'label'
          },
          {
            key: 'notApplicableId',
            type: 'checkbox',
            wrappers: ['help-text'],
            className: 'col-1',
            expressionProperties: {
              hide: '(field.parent.key==0)?1:0'
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
              'templateOptions.disabled': x => x.notApplicableId
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
