import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrmProjectGovernanceCodelistService } from '../crm-project-governance-codelist.service';
import { Location } from '@angular/common';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NavigationService } from '@app/shared/navigation.service';

@Component({
  selector: 'app-crm-project-governance-codelist-edit',
  templateUrl: './crm-project-governance-codelist-edit.component.html',
  styleUrls: ['./crm-project-governance-codelist-edit.component.css']
})
export class CrmProjectGovernanceCodelistEditComponent implements OnInit {

  loading: boolean = false;

  title = "CRM Project Governance Codelist";
  form: FormGroup = new FormGroup({});
  recId: number = 0;
  pid: number = 0;

  record: any = {};

  loadNewRecordSub: Subscription | undefined;
  loadRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  constructor(private route: ActivatedRoute,
    private crmProjectGovernanceCodelistService: CrmProjectGovernanceCodelistService,
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
    this.loadNewRecordSub = this.crmProjectGovernanceCodelistService.NewRecord(parId)
    .subscribe(
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

  loadRecord(recId: number) {
    // console.log(`recId = ${recId}`);
    this.loading = true;
    this.loadRecordSub = this.crmProjectGovernanceCodelistService.RecordForEdit(recId)
    .subscribe(
      (res: any) => {
        // console.log(`res = ${JSON.stringify(res, null, 2)}`);
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res[0];
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
    this.addUpdateSub = this.crmProjectGovernanceCodelistService.addorUpdate(this.record)
    .subscribe(
      res => {
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
    this.deleteRecordSub = this.crmProjectGovernanceCodelistService.deleteRec(recId)
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