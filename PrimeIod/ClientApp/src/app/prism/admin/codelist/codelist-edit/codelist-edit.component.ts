import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

// import { RequestsUserService } from '@app/prism/requests/user-requests/requests-user.service';
import { CodelistService } from '@app/prism/admin/codelist/codelist.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { stringify } from 'querystring';
import { CodelistFilterService } from '../codelist-filter.service';

@Component({
  selector: 'app-codelist-edit',
  templateUrl: './codelist-edit.component.html',
  styleUrls: ['./codelist-edit.component.css']
})
export class CodelistEditComponent implements OnInit {
  loading: boolean = false;
  title = 'Request to modify a Code List Item';

  // controllerName = 'TblRequestStudy';
  records: any;
  // paramdata: any;
  form = new FormGroup({});
  // form1 = new FormGroup({});
  recId: number = 0;
  record: any;
  currentUser: any;
  pid: number = 0;
  saveButton: boolean = false;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private codelistService: CodelistService,
    private codelistFilterService: CodelistFilterService,
    private credSerivce: CredentialsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.credSerivce.currentUser;
    let editMode = this.route.snapshot.queryParamMap.get('editMode');
    if (editMode == 'add') {
      this.title = this.title + ' - create';
      let parId: any = this.route.snapshot.queryParamMap.get('parId');
      this.pid = +parId
      this.loadNewRecord(this.pid);
    } else {
      this.title = this.title + ' - modify';
      let recId: any = this.route.snapshot.queryParamMap.get('parId');
      this.recId = +recId;
      this.loadRecord(this.recId);
    }

    // this.route.queryParams.subscribe(params => {
    //   let editMode = params.editMode;

    //   if (editMode == 'add') {
    //     this.title = this.title + ' - create';
    //     this.pid = params.parId;
    //     this.loadNewRecord(this.pid);
    //   } else {
    //     this.title = this.title + ' - modify';
    //     this.recId = params.id;
    //     this.loadRecord(this.recId);
    //   }
    // });
  }
  back() {
    this.location.back();
  }

  loadNewRecord(parId: number) {
    this.loading = true;
    this.loadNewRecordSub = this.codelistService.NewRecord(parId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          //this.setButtonVisibility(this.record);
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  loadRecord(recId: number) {
    this.loading = true;

    this.loadRecordSub = this.codelistService.RecordForEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res[0];
          console.log(`result = ${JSON.stringify(res, null, 2)}`);
          // this.pid = res.pid;
          // this.setButtonVisibility(this.record);

          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  submit() {
    if (this.form.valid) {
      this.addOrUpdate();
    }
  }

  addOrUpdate() {
    this.loading = true;

    this.record.createdById = 1;
    this.record.updatedById = 1;
    // this.record.requestedById = this.credSerivce.currentUser.fullName;
    this.record.recId = this.record.id;
    this.record.parId = this.record.parId;
    //this.record.Pid =  this.form1.value.CodelistId;

    this.addUpdateSub = this.codelistService.addorUpdate(this.record).subscribe(
      res => {
        this.form.reset();
        this.location.back();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(`error while editing =${JSON.stringify(err, null, 2)}`);
      }
    );
  }
  deleteRecord(recId: number) {
    this.deleteRecordSub = this.codelistService.deleteRec(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          //sucess:
          this.location.back();
          // this.removeRecord(recId);
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'orderNumber',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Order Number',
        type: 'number',
        // required: true,
        helpText: 'Enter a Order Number',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    },
    {
      key: 'description',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Description',
        required: true,
        helpText: 'Enter a Description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
    }
  ];
}
