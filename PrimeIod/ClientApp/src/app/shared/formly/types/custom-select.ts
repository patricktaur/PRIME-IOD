import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'custom-select-type',

  template: `
    <div>
      <select class="form-control" id="sel1" [ngStyle]="style" [formControl]="formControl" [formlyAttributes]="field">
        <option value="1" style="background: #ff0000; color: #FFFFFF;">1</option>
        <option value="2" style="background: #ff0000; color: #FFFFFF;">2</option>
        <option value="3" style="background: #ffc000; color: #FFFFFF;">3</option>
        <option value="4" style="background: #ffc000; color: #FFFFFF;">4</option>
        <option value="5" style="background: #92d050; color: #FFFFFF;">5</option>
      </select>
    </div>
  `
})
export class CustomSelectTypeComponent extends FieldType<FieldTypeConfig> implements OnInit {
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
      case '1':
      case '2': {
        col = '#ff0000';
        break;
      }
      case '3': 
      case '4': {
        col = '#ffc000';
        break;
      }
      case '5': {
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
