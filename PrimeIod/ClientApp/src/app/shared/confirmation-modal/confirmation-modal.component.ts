import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() confirmationText = '';
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  confirm() {
    this.activeModal.close('confirm');
  }

  cancel() {
    this.activeModal.close('cancel');
  }
}
