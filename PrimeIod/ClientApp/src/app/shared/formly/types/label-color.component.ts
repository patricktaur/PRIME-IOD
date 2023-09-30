import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'formly-label-type',
  template: `
    <label *ngIf="to.label">
      {{ to.label }}
    </label>
    <div [ngStyle]="colorStyle">
      {{ displayValue }}
    </div>
    <div *ngIf="to.description" style="font-size: smaller;">
      {{ to.description }}
    </div>
  `
})
export class LabelColorComponent extends FieldType {
  style: any = '';
  displayValue: any;

  constructor(private datePipe: DatePipe, private decimalPipe: DecimalPipe) {
    super();
  }

  get colorStyle() {
    let col = 'white';
    let text = 'black';
    this.displayValue = this.formControl.value;
    // if(this.displayValue>5){
    //   this.displayValue=5;
    //  }
    // this.tst = typeof value;
    switch (this.displayValue) {
      case 1: {
        break;
      }
      case 2: {
        col = '#ff0000';
        text = 'white';
        break;
      }
      case 3: {
        break;
      }
      case 4: {
        col = '#ffc000';
        text = 'white';

        break;
      }
      case 5: {
        col = '#92d050';
        text = 'white';

        break;
      }
      default: {
        col = 'white';
        text = 'black';
        break;
      }
    }

    this.style = {
      color: text,
      'background-color': col,
      'font-weight': '900',
      'text-align': 'center',
      border: '1px solid #D3D3D3',
      'border-radius': '3px',
      left: '50%',
      top: '50%'
    };
    return this.style;
  }
}
