import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImiReviewCategoriesCodelistService } from '../imi-review-categories-codelist.service';
import { CredentialsService } from '@app/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-imi-review-categories-codelist-edit',
  templateUrl: './imi-review-categories-codelist-edit.component.html',
  styleUrls: ['./imi-review-categories-codelist-edit.component.css']
})
export class ImiReviewCategoriesCodelistEditComponent implements OnInit {
  loading: boolean = false;
  title = 'IMI Review Categories Codelist';
  // paramdata: any;
  form = new FormGroup({});
  recId: number = 0;
  record: any = {};
  pid: number = 0;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private imiReviewCategoriesCodelistService: ImiReviewCategoriesCodelistService
  ) {}

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

  back() {
    this.location.back();
  }

  loadNewRecord(parId: number) {
    this.loading = true;
    this.loadNewRecordSub = this.imiReviewCategoriesCodelistService.NewRecord(parId).subscribe(
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
    this.loading = true;
    this.loadRecordSub = this.imiReviewCategoriesCodelistService.RecordForEdit(recId).subscribe(
      (res: any) => {
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
    this.addUpdateSub = this.imiReviewCategoriesCodelistService.addorUpdate(this.record).subscribe(
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
    this.deleteRecordSub = this.imiReviewCategoriesCodelistService.deleteRec(recId).subscribe(
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

