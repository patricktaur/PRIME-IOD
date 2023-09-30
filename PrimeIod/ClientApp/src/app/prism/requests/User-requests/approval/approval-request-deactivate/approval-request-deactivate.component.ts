import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { RequestsUserService } from '@app/prism/requests/user-requests/requests-user.service';

@Component({
  selector: 'app-approval-request-deactivate',
  templateUrl: './approval-request-deactivate.component.html',
  styleUrls: ['./approval-request-deactivate.component.css']
})
export class ApprovalRequestDeactivateComponent implements OnInit {
  loading: boolean = false;
  title = 'Approve Request to Deactivate User';
  form = new FormGroup({});
  recId: number = 0;
  record: any;
  userId: number = 0;

  ApprovedOrRejectedButton: boolean = true;
  saveButton: boolean = false;
  undoRejectButton: boolean = false;

  loadRecordSub: Subscription | undefined;
  loadNewRecordSub: Subscription | undefined;
  addUpdateSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    // private tblParamService: TblParamService,
    // private tblUserService: TblUserService,
    private requestsService: RequestsUserService // private credSerivce: CredentialsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.recId = params.id;
      this.loadRecord(this.recId);
    });
  }

  loadRecord(recId: number) {
    this.loading = true;
    this.loadRecordSub = this.requestsService.ApprovalRequestUserEdit(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          this.loading = false;
          return;
        } else {
          this.record = res;
          this.userId = this.record.pid;
          if (this.record.isActioned == 2 || this.record.isActioned == 3) {
            this.ApprovedOrRejectedButton = false;
          }
          if (this.record.isActioned == 3) {
            this.undoRejectButton = true;
          }

          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.loading = false;
      }
    );
  }

  approve() {
    this.loading = true;
    // this.record.approvedBy = this.credSerivce.currentUser.fullName;
    this.addUpdateSub = this.requestsService.ApprovalRequestUserApprove(this.record).subscribe(
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

  reject() {
    this.loading = true;
    // this.record.rejectedBy = this.credSerivce.currentUser.fullName;
    this.addUpdateSub = this.requestsService.ApprovalRequestUserReject(this.record).subscribe(
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

  undoReject() {
    this.loading = true;
    // this.record.rejectedBy = this.credSerivce.currentUser.fullName;
    this.addUpdateSub = this.requestsService.ApprovalRequestUserUndoReject(this.record).subscribe(
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

  back() {
    this.location.back();
  }

  canReject() {
    if (this.ApprovedOrRejectedButton && this.record?.rejectedComments) {
      return true;
    } else {
      return false;
    }
  }

  options: FormlyFormOptions | any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'requesterComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Requestor Comments',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      }
    },
    {
      key: 'approverComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Approver Comments',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      hideExpression: 'model?.isActioned < 2',

      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      }
    },
    {
      key: 'rejectedComments',
      type: 'textarea',
      wrappers: ['horizontal-layout'],
      templateOptions: {
        label: 'Rejected Comments',
        labelColClassName: 'col-4',
        fieldColClassName: 'col-6'
      },
      hideExpression: 'model?.isActioned < 2',
      expressionProperties: {
        'templateOptions.disabled': x => !this.saveButton
      }
    },
    {
      template: '<hr>'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'recId',
          type: 'label',

          templateOptions: {
            label: '  Request Id'
          }
        },
        {
          className: 'col-3',
          key: 'requestType',
          type: 'label',
          templateOptions: {
            label: '  Request Type'
          }
        },
        {
          className: 'col-6',
          key: 'requestStatus',
          type: 'label',
          templateOptions: {
            label: '  Status'
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          key: 'requestedOn',
          type: 'label',
          templateOptions: {
            label: 'Request On',
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy'
          }
        },
        {
          className: 'col-9',
          key: 'requestedBy',
          type: 'label',
          templateOptions: {
            label: 'Requested By'
          }
        }
      ],
      hideExpression: 'model?.isActioned == 0'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'approvedOn',
          type: 'label',
          className: 'col-3',
          templateOptions: {
            label: 'Actioned On',
            pipe: 'date',
            pipeFormat: 'dd-MMM-yyyy',
            labelColClassName: 'col-4',
            fieldColClassName: 'col-6'
          }
        },
        {
          key: 'approvedBy',
          type: 'label',
          className: 'col-9',

          templateOptions: {
            label: 'Actioned by'
          }
        }
      ],
      hideExpression: 'model?.isActioned < 2'
    },
    {
      template: '<hr>'
    }
  ];

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
    this.loadNewRecordSub?.unsubscribe();
  }
}
