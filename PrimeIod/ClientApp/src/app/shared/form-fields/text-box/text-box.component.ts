import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {
  @Input() myForm: FormGroup | any;
  @Input() label: any;
  @Input() controlName: any;
  @Input() control: any;
  @Input() placeHolder: any;
  @Input() errorMessage: any;
  constructor() {}

  ngOnInit(): void {}
}
