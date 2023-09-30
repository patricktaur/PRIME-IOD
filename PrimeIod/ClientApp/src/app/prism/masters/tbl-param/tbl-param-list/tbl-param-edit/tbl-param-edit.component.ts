import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TblParamService } from '../../tbl-param.service';

@Component({
  selector: 'app-tbl-param-edit',
  templateUrl: './tbl-param-edit.component.html',
  styleUrls: ['./tbl-param-edit.component.css']
})
export class TblParamEditComponent implements OnInit {
  @Input() tblParamId: string = '';
  @Input() action = '';
  tblParam: any;
  tblParamForm: FormGroup | any;

  // tools: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private tblParamService: TblParamService
  ) {}

  ngOnInit() {
    this.buildForm();
    if (this.action == 'Edit') {
      this.loadTblParam();
    }
  }

  buildForm() {
    this.tblParamForm = this.formBuilder.group({
      recId: new FormControl(null),
      description: new FormControl('', [Validators.required])
    });
  }

  loadTblParam() {
    this.tblParamService.getTblParam(this.tblParamId).subscribe((tblParam: any) => {
      this.tblParamForm.patchValue({
        recId: tblParam.recId ? tblParam.recId : null,
        description: tblParam.description
      });
    });
  }

  addTblParam() {
    // if (this.userForm.get('isEmployee').value) {
    this.tblParamForm.patchValue({
      description: this.tblParamForm.get('description').value
    });
    // }

    // const newdepartmentB = Object.assign({}, this.departmentB, this.departmentBForm.value);

    const newtblParam = Object.assign({}, this.tblParam, this.tblParamForm.value);
    this.tblParamService.addTblParam(newtblParam).subscribe(
      res => {
        // this.toastService.show(' TblParam added successfully.', { classname: 'bg-success text-light', delay: 3000 });
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

  updateTblParam() {
    const existing = Object.assign({}, this.tblParam, this.tblParamForm.value);

    this.tblParamService.updateTblParam(existing).subscribe(
      res => {
        //this.toastService.show(' TblParam updated successfully.', { classname: 'bg-success text-light', delay: 3000 });
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
      this.addTblParam();
    }
    if (this.action == 'Edit') {
      this.updateTblParam();
    }
  }
}
