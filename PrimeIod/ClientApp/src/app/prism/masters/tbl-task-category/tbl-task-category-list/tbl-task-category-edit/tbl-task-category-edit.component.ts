import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TblTaskCategoryService } from '../../tbl-task-category.service';

@Component({
  selector: 'app-tbl-task-category-edit',
  templateUrl: './tbl-task-category-edit.component.html',
  styleUrls: ['./tbl-task-category-edit.component.css']
})
export class TblTaskCategoryEditComponent implements OnInit {
  @Input() tblTaskCategoryId: string = '';
  @Input() action = '';
  tblTaskCategory: any;
  tblTaskCategoryForm: FormGroup | any;

  // tools: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private tblTaskCategoryService: TblTaskCategoryService
  ) {}

  ngOnInit() {
    this.buildForm();
    if (this.action == 'Edit') {
      this.loadTblTaskCategory();
    }
  }

  buildForm() {
    this.tblTaskCategoryForm = this.formBuilder.group({
      recId: new FormControl(null),
      taskCategory: new FormControl('', [Validators.required])
    });
  }

  loadTblTaskCategory() {
    this.tblTaskCategoryService.getTblTaskCategory(this.tblTaskCategoryId).subscribe((tblTaskCategory: any) => {
      this.tblTaskCategoryForm.patchValue({
        recId: tblTaskCategory.recId ? tblTaskCategory.recId : null,
        taskCategory: tblTaskCategory.taskCategory
      });
    });
  }

  addTblTaskCategory() {
    // if (this.userForm.get('isEmployee').value) {
    this.tblTaskCategoryForm.patchValue({
      taskCategory: this.tblTaskCategoryForm.get('taskCategory').value
    });
    // }

    // const newdepartmentB = Object.assign({}, this.departmentB, this.departmentBForm.value);

    const newtblTaskCategory = Object.assign({}, this.tblTaskCategory, this.tblTaskCategoryForm.value);
    this.tblTaskCategoryService.addTblTaskCategory(newtblTaskCategory).subscribe(
      res => {
        // this.toastService.show(' TblTaskCategory added successfully.', { classname: 'bg-success text-light', delay: 3000 });
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

  updateTblTaskCategory() {
    const existing = Object.assign({}, this.tblTaskCategory, this.tblTaskCategoryForm.value);

    this.tblTaskCategoryService.updateTblTaskCategory(existing).subscribe(
      res => {
        //this.toastService.show(' TblTaskCategory updated successfully.', { classname: 'bg-success text-light', delay: 3000 });
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
      this.addTblTaskCategory();
    }
    if (this.action == 'Edit') {
      this.updateTblTaskCategory();
    }
  }
}
