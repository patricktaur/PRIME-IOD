import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { StudyEditBase } from '@app/prism/shared-comps/study-list-edit/study-edit-base';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

//for user with filter dropdown values:
import { TblParamService } from '@app/prism/masters/tbl-param/tbl-param.service';

import { clininfocdmsandcdmstypeService } from '@app/prism/admin/admin-clin-info/clininfo-cdms-and-cdms-type/clininfo-cdms-and-cdms-type.service';

import { CredentialsService } from '@app/core/authentication/credentials.service';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastService } from '@app/shared/services/toast.service';
import { AppAdminService } from '@app/app-admin/app-admin.service';

@Component({
  selector: 'app-clininfo-cdms-and-cdms-type-edit',
  templateUrl: './clininfo-cdms-and-cdms-type-edit.component.html',
  styleUrls: ['./clininfo-cdms-and-cdms-type-edit.component.css']
})
export class ClininfoCdmsAndCdmsTypeEditComponent {
  loading: boolean = false;
  title = 'Edit Clininfo CDMS and CDMS Type';
  // controllerName = 'TblRequestStudy';
  form = new FormGroup({});
  recId: number = 0;
  CDMSTaskname: string = '';
  record: any;
  Taskrecords: any;
  currentUser: any;
  submitForApprovalButton: boolean = false;
  withdrawRequestButton: boolean = false;
  saveButton: boolean = false;
  removeButton: boolean = false;
  userForm: FormGroup = new FormGroup({});

  //   OperatingDivisionParId = 2900;
  //   OfficeRegionParId = 3000;
  //   OfficeCountryParId = 3100;
  //   RoleParId = 1800; //yet to plan
  //   YesNoPid = 600;
  CDMSParId = 5400;

  yesNoItems: any = null;

  roles: any = [];
  applicationRoles: any = [];

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,

    // private tblParamService: TblParamService,
    // private cdmstaskgroupsService: cdmstaskgroupsService,
    private clininfocdmsandcdmstypeService: clininfocdmsandcdmstypeService,
    private credSerivce: CredentialsService,
    private formBuilder: FormBuilder,
    private appAdminService: AppAdminService,
    private tblParamService: TblParamService // private cdmstasksService: cdmstasksService
  ) {}

  ngOnInit(): void {
    // this.loadApplicationRoles();
    this.buildForm();
    this.currentUser = this.credSerivce.currentUser;
    this.route.queryParams.subscribe((params: any) => {
      this.recId = params.id;
      if (this.recId > 0) {
        this.loadRecord(this.recId);
      } else {
        this.loadNewRecord();
      }
      //   this.loadCDMSTasksReport();
    });
  }



  loadRecord(recId: number) {
    this.loading = true;
    this.loadRecordSub = this.clininfocdmsandcdmstypeService.GetById(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.CDMSTaskname = res.cdmsName;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );

  }

  loadNewRecord() {
    this.loading = true;
    this.loadRecordSub = this.clininfocdmsandcdmstypeService.NewCDMSTasksRequest().subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }


  buildForm() {
    this.userForm = this.userForm = this.formBuilder.group({
      id: new FormControl(null),
      orderNo: new FormControl('', [Validators.required]),
      cdmsName: new FormControl('', [Validators.required]),
      cdmstypeId: new FormControl('', [Validators.required]),
      emailIdList: new FormControl('', [Validators.required])
    });

    if (true) {
      this.userForm.patchValue({
        isEmployee: true
      });
    }
  }

  addOrUpdate() {
    this.loading = true;
    console.log(this.record);

    this.addUpdateSub = this.clininfocdmsandcdmstypeService.AddorUpdate(this.record).subscribe(
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

 

  canSave() {
    // if (this.form.dirty && this.record.displayName) {
    //   return true;
    // }
    if (this.form.dirty) {
      return true;
    }
    return false;
  }

  submit() {
    if (this.canSave()) {
      this.addOrUpdate();
    }
  }

  deleteRecord(recId: number) {
    this.loading = true;
    this.deleteRecordSub = this.clininfocdmsandcdmstypeService.deleteRec(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          //sucess:
          this.location.back();
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  back() {
    this.location.back();
  }

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'cdmsName',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS',
        required: true,
        helpText: 'Enter a CDMS',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    },
    {
      key: 'cdmstypeId',
      type: 'select',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'CDMS Type',
        //required: true,

        options: this.tblParamService.getParams(this.CDMSParId),
        valueProp: 'recId',
        labelProp: 'description',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      }
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      // validation: {
      //   show: true
      // }
    },
    {
      key: 'orderNo',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Order Number',
        required: true,
        helpText: 'Enter a Order Number',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    },
    {
      key: 'emailIdList',
      type: 'input',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Email IDs List',
        required: true,
        helpText: 'Enter a Email IDs List',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      // expressionProperties: {
      //   'templateOptions.disabled': x => !this.saveButton
      // },
      validation: {
        show: true
      }
    }
    
  ];
}
