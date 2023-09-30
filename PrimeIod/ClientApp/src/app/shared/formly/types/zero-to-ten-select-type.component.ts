import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'zero-to-ten-type',

  template: `
    <div class="form-group">
      <select class="form-control" id="sel1" [ngStyle]="style" [formControl]="formControl" [formlyAttributes]="field">
        <option value="0" style="background: #ff0000; color: #FFFFFF;">0</option>
        <option value="1" style="background: #ff0000; color: #FFFFFF;">1</option>
        <option value="2" style="background: #ff0000; color: #FFFFFF;">2</option>
        <option value="3" style="background: #ff0000; color: #FFFFFF;">3</option>
        <option value="4" style="background: #ff0000; color: #FFFFFF;">4</option>
        <option value="5" style="background: #ff0000; color: #FFFFFF;">5</option>

        <option value="6" style="background: #ffc000; color: #FFFFFF;">6</option>
        <option value="7" style="background: #ffc000; color: #FFFFFF;">7</option>
        <option value="8" style="background: #ffc000; color: #FFFFFF;">8</option>
        <option value="9" style="background: #ffc000; color: #FFFFFF;">9</option>

        <option value="10" style="background: #92d050; color: #FFFFFF;">10</option>
      </select>
      <div *ngIf="to.description" style="font-size: smaller;">
        {{ to.description }}
      </div>
    </div>
  `
})
export class ZeroToTenSelectTypeComponent extends FieldType<FieldTypeConfig> implements OnInit {
  style: any = '';
  test: any;

  ngOnInit(): void {
    this.formControl.valueChanges.pipe().subscribe((value: string) => {
      // this.selectColor(this.selectedValue.toString());
      value = value?.toString();
      this.selectColor(value);
    });
    this.formControl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  selectColor(value: string) {
    let col = 'white';
    switch (value) {
      case '0': 
      case '1': 
      case '2':
      case '3': 
      case '4':
      case '5': {
        col = '#ff0000';
        break;
      }

      case '6': 
      case '7': 
      case '8':
      case '9': {
        col = '#ffc000';
        break;
      }
      case '10': {
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
