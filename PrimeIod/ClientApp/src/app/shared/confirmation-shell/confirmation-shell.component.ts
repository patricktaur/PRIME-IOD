import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-confirmation-shell',
  templateUrl: './confirmation-shell.component.html',
  styleUrls: ['./confirmation-shell.component.css']
})
export class ConfirmationShellComponent implements OnInit {
  @Input() message: string | undefined;
  @Input() labelText: string | undefined;
  @Output() response = new EventEmitter<any>();
  @Input() responseValue: any;
  @Input() disabled: boolean = false;
  @Input() className: string | undefined;
  @Input() toolTip: string = '';
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  show() {
    this.openDialog();
  }

  openDialog() {
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
      scrollable: true
    });

    modalRef.componentInstance.confirmationText = this.message;

    modalRef.result.then(
      result => {
        console.log(`result = ${result}`);
        if (result == 'confirm') {
          this.response.emit(this.responseValue);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  // this.filterChange.emit(this.selectedFilters);

  // confirmDelete(message: any, recId: number) {
  //   const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
  //   modalRef.componentInstance.confirmationText = message;

  //   modalRef.result.then(
  //     result => {
  //       console.log(`result = ${result}`);
  //       if (result === 'confirm') {
  //         this.deleteRecord(this.controllerName, recId);
  //       }
  //     },
  //     err => {
  //       console.log(`err = ${JSON.stringify(err)}`);
  //     }
  //   );
  // }
}
