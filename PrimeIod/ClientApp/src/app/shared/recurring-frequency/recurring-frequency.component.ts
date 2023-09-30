import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { timeStamp } from 'console';

@Component({
  selector: 'app-recurring-frequency',
  templateUrl: './recurring-frequency.component.html',
  styleUrls: ['./recurring-frequency.component.css']
})
export class RecurringFrequencyComponent implements OnInit, OnChanges {
  @Input() fieldValue: string | undefined;
  @Output() selectionChange = new EventEmitter<any>();
  form = new FormGroup({});
  // selectedValues: any;
  convertedObject: any;

  testSummary: any;

  frequency = 1;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.fieldValue) {
      this.convertedObject = JSON.parse(this.fieldValue);

      //---workaround : Unable to bind checkboxes directly
      const resultArray = Object.keys(this.convertedObject.Daysofweek).map(index => {
        return this.convertedObject.Daysofweek[index];
      });
      this.convertedObject.checkBoxes = resultArray;
      //---

      this.convertedObject.freqName = this.freqNames[this.convertedObject.RecurringFrequency];
    }
  }

  onModelChange() {
    //---workaround : Unable to bind checkboxes directly
    const resultArray = Object.keys(this.convertedObject?.checkBoxes).map(index => {
      return this.convertedObject?.checkBoxes[index];
    });
    this.convertedObject.Daysofweek = resultArray;
    //---
    // this.convertedObject.DayOfWeekRad = this.dayOfWeekRadValu[this.convertedObject.WeekOfMonth];
    this.convertedObject.freqName = this.freqNames[this.convertedObject.RecurringFrequency + 1];
    this.generateSummary();
    let jsonObj = JSON.stringify(this.convertedObject);

    this.selectionChange.emit(jsonObj);
  }

  generateSummary() {
    let retValue = '';
    retValue = this.frequency1() + this.repeats() + this.weekDays() + this.onDay() + this.onWeek() + this.endsOn();
    // return retValue;
    this.convertedObject.Summary = retValue;
  }

  frequency1() {
    let freq = ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Adhoc', 'No longer required'];
    return freq[this.convertedObject.RecurringFrequency];
  }

  repeats() {
    let retValue = '';
    if (this.convertedObject.RecurringFrequency < 4) {
      retValue = 'repeats every ';
      let repeatName = ['day', 'week', 'month', 'year'];

      retValue =
        'every ' +
        this.convertedObject.RepeatsEvery_DayWkMonYr +
        ' ' +
        repeatName[this.convertedObject.RecurringFrequency];
      if (this.convertedObject.RepeatsEvery_DayWkMonYr > 1) {
        retValue += 's';
      }
    }

    if (retValue.length > 0) {
      retValue = ', ' + retValue;
    }
    return retValue;
  }

  weekDays() {
    let retValue = '';
    if (this.convertedObject.RecurringFrequency == 1) {
      let comma = '';
      this.convertedObject.Daysofweek.forEach((value: boolean, index: number) => {
        retValue += value == true ? comma + this.dayOfWeekRadValu[index + 1] : '';
        if (retValue.length > 0) {
          comma = ', ';
        }
      });
    }

    if (retValue.length > 0) {
      retValue = ', ' + retValue;
    }
    return retValue;
  }

  onDay() {
    let retValue = '';
    //"RepeatsBy": "DOM", " -- from V1
    if (this.convertedObject.RecurringFrequency == 2 && this.convertedObject.RepeatsBy == 'DOM') {
      switch (this.convertedObject.DayOfMonth) {
        case '0':
          retValue = 'any day';
          break;
        case '32':
          retValue = 'last day of month';
          break;

        default:
          retValue = 'day ' + this.convertedObject.DayOfMonth;
          break;
      }
    }
    if (retValue.length > 0) {
      retValue = ', ' + retValue;
    }
    return retValue;
  }

  onWeek() {
    let retValue = '';
    //"RepeatsBy": "nthDay" -- from V1
    if (this.convertedObject.RecurringFrequency == 2 && this.convertedObject.RepeatsBy == 'nthDay') {
      switch (this.convertedObject.WeekOfMonth) {
        case '0':
          retValue = 'any ';
          break;
        case '1':
          retValue = '1st ';
          break;
        case '2':
          retValue = '2nd ';
          break;
        case '3':
          retValue = '3rd ';
          break;
        case '4':
          retValue = '4th ';
          break;
        case '5':
          retValue = '5th ';
          break;
        case '6':
          retValue = 'last ';
          break;
        default:
          retValue = 'day ' + this.convertedObject.DayOfMonth;
          break;
      }
      let weekName = '';
      switch (this.convertedObject.DayOfWeekRad) {
        case '1':
          weekName = 'Sunday';
          break;
        case '2':
          weekName = 'Monday';
          break;
        case '3':
          weekName = 'Tuesday';
          break;
        case '4':
          weekName = 'Wednesday';
          break;
        case '5':
          weekName = 'Thursday';
          break;
        case '6':
          weekName = 'Friday';
          break;
        case '7':
          weekName = 'Saturday';
          break;

        default:
          weekName = this.convertedObject.DayOfWeekRad;
          break;
      }
      retValue = retValue + ' ' + weekName + ' of the month';
    }

    if (retValue.length > 0) {
      retValue = ', ' + retValue;
    }
    return retValue;
  }
  endsOn() {
    let retValue = '';
    if (this.convertedObject.RecurringFrequency < 4) {
      switch (this.convertedObject.RepeatEnds) {
        case 0:
          retValue = 'never ends';
          break;
        case 1:
          let occurances = this.convertedObject.EndsAfter_Occurances ?? 0;
          retValue = 'ends after ' + occurances + ' occurances';
          break;
        case 2:
          let endsOn = this.convertedObject.EndsOn ?? '';
          retValue = 'ends on ' + endsOn;
          break;
        default:
          //
          break;
      }
    }
    if (retValue.length > 0) {
      retValue = ', ' + retValue;
    }
    return retValue;
  }

  freqNames = ['Day(s)', 'Week(s)', 'Month(s)', 'Year(s)', '-', '-'];

  dayOfWeekRadValu = ['-', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  //Daysofweek

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'RecurringFrequency',
      type: 'select',
      templateOptions: {
        options: [
          { description: 'Daily', id: 0 },
          { description: 'Weekly', id: 1 },
          { description: 'Monthly', id: 2 },
          { description: 'Yearly', id: 3 },
          { description: 'Adhoc', id: 4 },
          { description: 'No longrer required', id: 5 }
        ],
        required: true,
        valueProp: 'id',
        labelProp: 'description'
      },

      validation: {
        show: true
      }
    },
    {
      //for Daily, Weekly, Monthly and Yearly
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3 ',
          template: '<label >Repeats Every </label>'
        },
        {
          className: 'col-3 ',
          key: 'RepeatsEvery_DayWkMonYr',
          type: 'input',

          templateOptions: {
            required: true,
            type: 'number'
          },
          // expressionProperties: {

          //   'templateOptions.required': x => !x.timeEdcscreensGoLiveFlag
          // },
          validation: {
            show: true
          }
        },
        {
          className: 'col-3 ',
          key: 'freqName',
          type: 'label',
          templateOptions: {
            hideLabel: true
          }
          // template: '<label > {{test}} Days </label>'
        }
      ],
      hideExpression: 'model.RecurringFrequency > 3'
    },

    {
      //Weekly
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3 ',
          template: '<label >Repeats On</label>'
        },

        {
          className: 'col-9 ',
          key: 'checkBoxes', //Daysofweek
          type: 'multicheckbox',
          templateOptions: {
            formCheck: 'inline',
            options: [
              { value: 0, label: 'Sun' },
              { value: 1, label: 'Mon' },
              { value: 2, label: 'Tue' },
              { value: 3, label: 'Wed' },
              { value: 4, label: 'Thur' },
              { value: 5, label: 'Fri' },
              { value: 6, label: 'Sat' }
            ]
          }
        }
      ],
      hideExpression: '!(model.RecurringFrequency == 1)',
      validation: {
        show: true
      }
    },

    {
      //Monthly
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3 ',
          template: '<label >Repeat by</label>'
        },
        {
          className: 'col-9 ',
          key: 'RepeatsBy',
          type: 'radio',

          templateOptions: {
            formCheck: 'inline',
            type: 'radio',
            required: true,
            options: [
              //key values reproduced from V1
              { value: 'Day of the month', key: 'DOM' },
              { value: 'Day of the week', key: 'nthDay' }
            ]
          }
        }
      ],
      hideExpression: 'model.RecurringFrequency != 2'
    },
    {
      //Monthly and OnDay
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3 ',
          template: '<label >On Day</label>'
        },
        {
          className: 'col-9 ',
          key: 'DayOfMonth',
          type: 'select',

          templateOptions: {
            options: [
              { description: 'any day', id: 0 },

              { description: 'last day', id: 32 },
              { description: '1', id: 1 },
              { description: '2', id: 2 },
              { description: '3', id: 3 },
              { description: '4', id: 4 },
              { description: '5', id: 5 },
              { description: '6', id: 6 },
              { description: '7', id: 7 },
              { description: '8', id: 8 },
              { description: '9', id: 9 },
              { description: '10', id: 10 },
              { description: '11', id: 11 },
              { description: '12', id: 12 },
              { description: '13', id: 13 },
              { description: '14', id: 14 },
              { description: '15', id: 15 },
              { description: '16', id: 16 },
              { description: '17', id: 17 },
              { description: '18', id: 18 },
              { description: '19', id: 19 },
              { description: '20', id: 20 },
              { description: '21', id: 21 },
              { description: '22', id: 22 },
              { description: '23', id: 23 },
              { description: '24', id: 24 },
              { description: '25', id: 25 },
              { description: '26', id: 26 },
              { description: '27', id: 27 },
              { description: '28', id: 28 },
              { description: '29', id: 29 },
              { description: '30', id: 30 },
              { description: '31', id: 31 }
            ],

            valueProp: 'id',
            labelProp: 'description'
          }
        }
      ],
      hideExpression: '!(model.RecurringFrequency == 2 && model.RepeatsBy == "DOM")'
    },
    {
      //Monthly and On a Week Repeats On
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3 ',
          template: '<label >Repeat On</label>'
        },
        {
          className: 'col-9 ',
          key: 'WeekOfMonth',
          type: 'select',

          templateOptions: {
            options: [
              { description: 'Any', id: '0' },
              { description: '1', id: '1' },
              { description: '2', id: '2' },
              { description: '3', id: '3' },
              { description: '4', id: '4' },
              { description: '5', id: '5' },
              { description: 'Last Week', id: '6' }
            ],

            valueProp: 'id',
            labelProp: 'description'
          }
        }
      ],
      hideExpression: '!(model.RecurringFrequency == 2 && model.RepeatsBy == "nthDay")'
    },
    {
      //Monthly and On a Week
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3 ',
          template: '<label >On Week</label>'
        },
        {
          className: 'col-9 ',
          key: 'DayOfWeekRad',
          type: 'radio',

          templateOptions: {
            formCheck: 'inline',

            required: true,
            options: [
              { value: 'Sun', key: '1' },
              { value: 'Mon', key: '2' },
              { value: 'Tue', key: '3' },
              { value: 'Wed', key: '4' },
              { value: 'Thu', key: '5' },
              { value: 'Fri', key: '6' },
              { value: 'Sat', key: '7' }
              // { value: 'Any', key: 'Any' }
            ]
          }
          // expressionProperties: {
          //   'templateOptions.required': x => (x.RecurringFrequency == 1 || (x.RecurringFrequency == 2 && x.RepeatsBy == "nthDay"))
          // },
        }
      ],
      hideExpression: '!(model.RecurringFrequency == 2 && model.RepeatsBy == "nthDay" )',
      validation: {
        show: true
      }
    },
    {
      //Common for for Daily, Weekly, Monthly and Yearly

      fieldGroup: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-3 ',
              template: '<label >Ends </label>'
            },
            {
              className: 'col-9 ',
              key: 'RepeatEnds',
              type: 'radio',

              templateOptions: {
                formCheck: 'inline',
                type: 'radio',
                required: true,
                options: [
                  { value: 'Never', key: 0 },
                  { value: 'After', key: 1 },
                  { value: 'On', key: 2 }
                ]
              }
            }
          ],
          hideExpression: 'model.RecurringFrequency > 3'
        },

        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-3 '
            },
            {
              className: 'col-3 ',
              key: 'EndsAfter_Occurances',
              type: 'input',

              templateOptions: {
                type: 'number'
              },
              expressionProperties: {
                'templateOptions.required': x => x.RepeatEnds == 1
              },
              validation: {
                show: true
              }
            },
            {
              className: 'col-3 ',
              template: '<label >Occurances</label>'
            }
          ],
          hideExpression: 'model.RepeatEnds != 1'
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-3 '
            },
            {
              className: 'col-9 ',
              key: 'EndsOn',
              type: 'date-picker',

              templateOptions: {
                required: true
              },
              // expressionProperties: {
              //   'templateOptions.required': x => x.RepeatEnds == 2
              // },
              validation: {
                show: true
              }
            }
          ],
          hideExpression: 'model.RepeatEnds != 2'
        }
      ],
      hideExpression: 'model.RecurringFrequency > 3'
    }
  ];
}
