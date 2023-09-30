import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-status',
  templateUrl: './form-status.component.html',
  styleUrls: ['./form-status.component.css']
})
export class FormStatusComponent implements OnInit {
  @Input() isValid: boolean = false;
  @Input() isDirty: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
