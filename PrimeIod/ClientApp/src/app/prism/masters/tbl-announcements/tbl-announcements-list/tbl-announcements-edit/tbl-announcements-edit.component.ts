import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TblAnnouncementsService } from '../../tbl-announcements.service';

@Component({
  selector: 'app-tbl-announcements-edit',
  templateUrl: './tbl-announcements-edit.component.html',
  styleUrls: ['./tbl-announcements-edit.component.css']
})
export class TblAnnouncementsEditComponent implements OnInit {
  @Input() tblAnnouncementsId: string = '';
  @Input() action = '';
  tblAnnouncements: any;
  tblAnnouncementsForm: FormGroup | any;

  // tools: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private tblAnnouncementsService: TblAnnouncementsService
  ) {}

  ngOnInit() {
    this.buildForm();
    if (this.action == 'Edit') {
      this.loadTblAnnouncements();
    }
  }

  buildForm() {
    this.tblAnnouncementsForm = this.formBuilder.group({
      recId: new FormControl(null),
      title: new FormControl('', [Validators.required])
    });
  }

  loadTblAnnouncements() {
    this.tblAnnouncementsService.getTblAnnouncements(this.tblAnnouncementsId).subscribe((tblAnnouncements: any) => {
      this.tblAnnouncementsForm.patchValue({
        recId: tblAnnouncements.recId ? tblAnnouncements.recId : null,
        title: tblAnnouncements.title
      });
    });
  }

  addTblAnnouncements() {
    // if (this.userForm.get('isEmployee').value) {
    this.tblAnnouncementsForm.patchValue({
      title: this.tblAnnouncementsForm.get('title').value
    });
    // }

    // const newdepartmentB = Object.assign({}, this.departmentB, this.departmentBForm.value);

    const newtblAnnouncements = Object.assign({}, this.tblAnnouncements, this.tblAnnouncementsForm.value);
    this.tblAnnouncementsService.addTblAnnouncements(newtblAnnouncements).subscribe(
      res => {
        // this.toastService.show(' TblAnnouncements added successfully.', { classname: 'bg-success text-light', delay: 3000 });
        this.activeModal.close(true);
      },
      err => {
        let errors = '';
        for (let i = 0; i < err.error[''].length; i++) {
          if (i === 0) {
            errors = err.error[''][i];
          } else {
            errors = errors + ',\n' + err.error[''][i];
          }
        }
        // this.toastService.show(errors, { classname: 'bg-danger text-light', delay: 3000 });
      }
    );
  }

  updateTblAnnouncements() {
    const existing = Object.assign({}, this.tblAnnouncements, this.tblAnnouncementsForm.value);

    this.tblAnnouncementsService.updateTblAnnouncements(existing).subscribe(
      res => {
        //this.toastService.show(' TblAnnouncements updated successfully.', { classname: 'bg-success text-light', delay: 3000 });
        this.activeModal.close(true);
      },
      err => {
        console.log(`error while editing = ${err}`);
        let errors = '';
        for (let i = 0; i < err.error[''].length; i++) {
          if (i === 0) {
            errors = err.error[''][i];
          } else {
            errors = errors + ',\n' + err.error[''][i];
          }
        }
        // this.toastService.show(errors, { classname: 'bg-danger text-light', delay: 3000 });
      }
    );
  }

  save() {
    if (this.action == 'Add') {
      this.addTblAnnouncements();
    }
    if (this.action == 'Edit') {
      this.updateTblAnnouncements();
    }
  }
}
