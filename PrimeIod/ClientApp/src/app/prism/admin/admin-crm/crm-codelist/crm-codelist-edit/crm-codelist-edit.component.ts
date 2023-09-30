import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrmCodelistService } from '../crm-codelist.service';
import { NavigationService } from '@app/shared/navigation.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-crm-codelist-edit',
  templateUrl: './crm-codelist-edit.component.html',
  styleUrls: ['./crm-codelist-edit.component.css']
})
export class CrmCodelistEditComponent {
  loading: boolean = false;

  title = "CRM Codelist";
  form: FormGroup = new FormGroup({});
  recId: number = 0;
  pid: number = 0;

  record: any = {};

  loadNewRecordSub: Subscription | undefined;
  loadRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  constructor(private route: ActivatedRoute,
    private crmCodelistService: CrmCodelistService,
    private location: Location,
    private navigation: NavigationService) {

  }

  ngOnInit(): void {
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
  }

  loadNewRecord(parId: number) {
    this.loading = true;
    this.loadNewRecordSub = this.crmCodelistService.NewRecord(parId)
    .subscribe(
      (res: any) => {
        console.log(`record = ${JSON.stringify(res, null, 2)}`);
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

  loadRecord(recId: number) {
    // console.log(`recId = ${recId}`);
    this.loading = true;
    this.loadRecordSub = this.crmCodelistService.RecordForEdit(recId)
    .subscribe(
      (res: any) => {
        console.log(`res = ${JSON.stringify(res, null, 2)}`);
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

  submit() {
    if (this.form.valid) {
      this.addOrUpdate();
    }
  }

  addOrUpdate() {
    this.loading = true;
    this.addUpdateSub = this.crmCodelistService.addorUpdate(this.record)
    .subscribe(
      res => {
        this.record = res;
        this.form.reset();
        this.location.back();
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

  deleteRecord(recId: number) {
    this.deleteRecordSub = this.crmCodelistService.deleteRec(recId)
    .subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          //sucess:
          this.location.back();
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  back() {
    // this.navigation.back();
    this.location.back();
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

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
    this.addUpdateSub?.unsubscribe();
    this.deleteRecordSub?.unsubscribe();
  }
}
