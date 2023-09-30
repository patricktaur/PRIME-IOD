import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-popover-tplcontent',
  templateUrl: 'crm-popover.component.html'
})
export class CrmPopoverComponent {
  @Input() year: any;
  @Input() month: any;
  @Input() valObj: any;

  crmForm: FormGroup | any = new FormGroup({});

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.crmForm = this.formBuilder.group({
      recId: [this.valObj.recId],
      month: [this.valObj.month],
      foreCast: [this.valObj.foreCast],
      actual: [this.valObj.actual],
      monthYear: [this.valObj.monthYear]
    });
  }

  save() {
    console.log(`form value = ${JSON.stringify(this.crmForm.value, null, 2)}`);
    this.activeModal.close(this.crmForm.value);
  }
}
