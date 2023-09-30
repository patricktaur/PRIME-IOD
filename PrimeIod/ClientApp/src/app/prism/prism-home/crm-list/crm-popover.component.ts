import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-popover-tplcontent',
	templateUrl: 'crm-popover.component.html',
})
export class CrmPopoverComponent {
    @Input() year: any;
    @Input() month: any;
    @Input() valObj: any;

    crmForm: FormGroup | any = new FormGroup({});

    constructor(public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.crmForm = this.formBuilder.group({
            forecast: [this.valObj.forecast],
            actual: [this.valObj.actual]
        });
    }

    save() {
        this.activeModal.close(this.crmForm.value)
    }
}