import { Component, OnInit, AfterViewInit, forwardRef } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
@Component({
  selector: 'zero-to-hundred-type',

  template: `
    <div class="form-group">
      <select class="form-control" id="sel1" [ngStyle]="style" [formControl]="formControl" [formlyAttributes]="field">
        <option value="0" style="background: #ff0000; color: #FFFFFF;">0 %</option>
        <option value="10" style="background: #ff0000; color: #FFFFFF;">10 %</option>
        <option value="20" style="background: #ff0000; color: #FFFFFF;">20 %</option>
        <option value="30" style="background: #ff0000; color: #FFFFFF;">30 %</option>
        <option value="40" style="background: #ff0000; color: #FFFFFF;">40 %</option>
        <option value="50" style="background: #ff0000; color: #FFFFFF;">50 %</option>

        <option value="60" style="background: #ffc000; color: #FFFFFF;">60 %</option>
        <option value="70" style="background: #ffc000; color: #FFFFFF;">70 %</option>
        <option value="80" style="background: #ffc000; color: #FFFFFF;">80 %</option>

        <option value="90" style="background: #92d050; color: #FFFFFF;">90 %</option>
        <option value="100" style="background: #92d050; color: #FFFFFF;">100 %</option>
      </select>
      <div *ngIf="to.description" style="font-size: smaller;">
        {{ to.description }}
      </div>
    </div>
  `
})
export class ZeroToHundredSelectTypeComponent extends FieldType<FieldTypeConfig> implements OnInit {
  style: any = '';
  test: any;

  ngOnInit(): void {
    this.formControl.valueChanges.pipe().subscribe((value: any) => {
      value = value?.toString();
      this.selectColor(value);
    });

    this.formControl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  selectColor(value: any) {
    //show syntax for switch case where '0', '10', '20', etc. are all the same


    let col = 'white';
    switch (value) {
      case '0': 
      case '10': 
      case '20':
      case '30': 
      case '40': 
      case '50': {
        col = '#ff0000';
        break;
      }

      case '60': 
      case '70':
      case '80': {
        col = '#ffc000';
        break;
      }
      case '90':
      case '100': {
        col = '#92d050';
        break;
      }
      default: {
        col = 'white';
        break;
      }
    }

    this.style = {
      color: '#FFFFFF',
      'background-color': col,
      'font-weight': '900',
      'text-align': 'center'
    };
  }
}
