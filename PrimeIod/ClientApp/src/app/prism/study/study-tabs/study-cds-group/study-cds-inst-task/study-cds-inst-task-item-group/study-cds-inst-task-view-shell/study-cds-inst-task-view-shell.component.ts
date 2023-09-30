import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-study-cds-inst-task-view-shell',
  templateUrl: './study-cds-inst-task-view-shell.component.html',
  styleUrls: ['./study-cds-inst-task-view-shell.component.css']
})
export class StudyCdsInstTaskViewShellComponent implements OnInit {
  @Input() taskId: number | undefined;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
