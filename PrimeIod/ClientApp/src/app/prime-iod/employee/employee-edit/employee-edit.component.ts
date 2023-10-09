
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';

import { EmployeeService } from '../employee-service';


import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { TblParamService } from '@app/prime-iod/common/tbl-param.service';




@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent  implements OnInit, OnDestroy{
  
  loading = false;
  title = 'Employee';


  record: any;
  form = new FormGroup({});

  id: number = 0;
  editMode: string = '';

  xxParId = 0;

  loadRecordSub: Subscription| undefined;
  loadNewRecordSub: Subscription| undefined;
  addUpdateSub: Subscription| undefined;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private tblParamService: TblParamService,
    private xmodelService: EmployeeService 
  ) 
  { }

  ngOnInit(): void {
   
    let id : any = this.route.snapshot.queryParamMap.get('id');
    this.id = +id;
    if (this.id > 0) {
      this.editMode = 'edit';
      this.loadRecord(this.id);
    } else {
      this.editMode = 'new';
      this.loadNewRecord();
    }
  }

  loadRecord(recId: number) {
    this.loading = true;
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.xmodelService.getRecordToEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.loading = false;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  loadNewRecord() {
    this.loading = true;
    this.loadNewRecordSub = this.xmodelService.getNew().subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.loading = false;
        }
        // this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  addOrUpdate() {
    this.loading = true;

    this.addUpdateSub = this.xmodelService.addOrUpdate(this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing = ${err}`);
      }
    );
  }
  cancel() {
    this.location.back();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      let message = "There are unsaved changes.  Click 'Ok' to continue without saving. ";
      const confirmation = window.confirm(message);
      if (confirmation === true) {
        this.form.reset(); //for reactivating ICON Study No dropdown.
      }
      return of(confirmation);
    } else {
      return of(true);
    }
  }

  submit() {
    if (this.form.valid) {
      this.addOrUpdate();
    }
  }

  back() {
    this.location.back();
  }
  //todo:
  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    // {
    //   key: 'xxx',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Drop down - Param',
    //     helpText: 'Help ...',
    //     options: this.tblParamService.getParams(this.xxParId),
    //     valueProp: 'recId',
    //     labelProp: 'description',

    //     placeholder: '-Select-',
    //     required: true,
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   validation: {
    //     show: true
    //   }
    // },
    // {
    //   key: 'xx-userId',
    //   type: 'ng-select',
    //   wrappers: ['horizontal-layout'],
    //   templateOptions: {
    //     label: 'Drop down user list',

    //     options: this.tblUserService.getUsers(),

    //     valueProp: 'id',
    //     labelProp: 'value',
    //     required: true,
    //     helpText: '',
    //     labelColClassName: 'col-4',
    //     fieldColClassName: 'col-6'
    //   },
    //   validation: {
    //     show: true
    //   }
    // },
    {
      key: 'name',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Name',
        //  helpText: 'Help ...',
        maxLength: 100,
        labelColClassName: 'col-4',
        fieldColClassName: 'col-4'
      },
      validation: {
        show: true
      }
    },
    // {
    //   key: 'name',
    //   type: 'input',
    //   templateOptions: {
    //     label: 'Name',
    //   }
    // }
    
  ];

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
  }
}
