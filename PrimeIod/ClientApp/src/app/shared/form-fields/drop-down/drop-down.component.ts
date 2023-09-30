import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {
  @Input() myForm: FormGroup | any;
  @Input() listValues: any;
  @Input() label: any;
  @Input() controlName: any;
  @Input() control: any;
  // @Input() defaultText: any;
  // @Input() defaultValue: any;
  // @Input() defaultDisabled: any;
  // @Input() defaultOptionSelected: any;

  @Input() validationErrorMessage: any;
  constructor() {}

  ngOnInit(): void {}

  controlA() {
    console.log('myForm:' + JSON.stringify(this.myForm));
    console.log('controlName:' + this.controlName);
    return this.myForm.get(this.controlName);
  }
}
