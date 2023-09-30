import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-column-manager',
  templateUrl: './column-manager.component.html',
  styleUrls: ['./column-manager.component.css']
})
export class ColumnManagerComponent implements OnInit {
  @Input() columns: any[] = [];
  @Output() columnChange = new EventEmitter<any>();

  form: FormGroup | any;
  frmArray: FormArray | any;

  modifiedValue: any;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      columns: new FormArray([])
    });
    this._patchValues();

    this.form.valueChanges.subscribe((x: any) => {
      // console.log("XXX:" + JSON.stringify(x));
      this.columnChange.emit(x);
    });
  }

  private _patchValues() {
    // get array control
    const formArray = this.form.get('columns') as FormArray;
    this.columns.forEach(column => {
      formArray.push(
        new FormGroup({
          // name: new FormControl(column.header),
          checked: new FormControl(column.hide)
        })
      );
    });
  }

  get getFormColumns() {
    return this.form.get('columns') as FormArray;
  }

  checkUncheckAll(event: any) {
    let checkValue = event.target.checked;
    console.log('checkValue:' + JSON.stringify(checkValue));
    //return this.form.controls.unitArr.controls.every(x => x.value == true)
    this.getFormColumns.controls.map((value: any) => value.get('checked').setValue(checkValue));
    // this.getFormColumns.controls.every(x => x.value == true);
  }
  checkAll() {
    this.getFormColumns.controls.map(value => value.setValue(true));
  }

  deselectAll() {
    this.getFormColumns.controls.map(value => value.setValue(false));
  }
}
