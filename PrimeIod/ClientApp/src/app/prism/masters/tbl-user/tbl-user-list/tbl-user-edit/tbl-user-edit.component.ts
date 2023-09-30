import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TblUserService } from '../../tbl-user.service';

@Component({
  selector: 'app-tbl-user-edit',
  templateUrl: './tbl-user-edit.component.html',
  styleUrls: ['./tbl-user-edit.component.css']
})
export class TblUserEditComponent implements OnInit {
  @Input() tblUserId: string = '';
  @Input() action = '';
  tblUser: any;
  tblUserForm: FormGroup | any = new FormGroup({});

  // tools: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private tblUserService: TblUserService
  ) {}

  ngOnInit() {
    this.buildForm();
    if (this.action == 'Edit') {
      this.loadTblUser();
    }
  }

  buildForm() {
    this.tblUserForm = this.formBuilder.group({
      recId: new FormControl(null),
      displayName: new FormControl('', [Validators.required])
    });
  }

  loadTblUser() {
    this.tblUserService.getTblUser(this.tblUserId).subscribe((tblUser: any) => {
      this.tblUserForm.patchValue({
        recId: tblUser.recId ? tblUser.recId : null,
        displayName: tblUser.displayName
      });
    });
  }

  addTblUser() {
    // if (this.userForm.get('isEmployee').value) {
    this.tblUserForm.patchValue({
      displayName: this.tblUserForm.get('displayName').value
    });
    // }

    // const newdepartmentB = Object.assign({}, this.departmentB, this.departmentBForm.value);

    const newtblUser = Object.assign({}, this.tblUser, this.tblUserForm.value);
    this.tblUserService.addTblUser(newtblUser).subscribe(
      res => {
        // this.toastService.show(' TblUser added successfully.', { classname: 'bg-success text-light', delay: 3000 });
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

  updateTblUser() {
    const existing = Object.assign({}, this.tblUser, this.tblUserForm.value);

    this.tblUserService.updateTblUser(existing).subscribe(
      res => {
        //this.toastService.show(' TblUser updated successfully.', { classname: 'bg-success text-light', delay: 3000 });
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
      this.addTblUser();
    }
    if (this.action == 'Edit') {
      this.updateTblUser();
    }
  }
}
