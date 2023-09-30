import { Component, Input } from '@angular/core';
import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dm-study-members-shell',
  templateUrl: './dm-study-members-shell.component.html',
  styleUrls: ['./dm-study-members-shell.component.css']
})
export class DmStudyMembersShellComponent {
  @Input() studyId: number | undefined;
  constructor(public activeModal: NgbActiveModal) {}
}
