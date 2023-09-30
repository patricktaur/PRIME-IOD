import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { StudyCDSDevReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-req.service';
import { StudyCdsRequestIdService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-development-task-requests/study-cds-dev-task-request-id.service';

import { StudyCDSDeliveryReqService } from '@app/prism/study/study-tabs/study-cds-group/study-cds-delivery-task/study-cds-delivery-req.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StudyCdsInstTaskViewShellComponent } from '@app/prism/study/study-tabs/study-cds-group/study-cds-inst-task/study-cds-inst-task-item-group/study-cds-inst-task-view-shell/study-cds-inst-task-view-shell.component';


@Component({
  selector: 'app-study-cds-del-task-view',
  templateUrl: './study-cds-del-task-view.component.html',
  styleUrls: ['./study-cds-del-task-view.component.css']
})
export class StudyCdsDelTaskViewComponent implements OnInit {
  loading: boolean = false;
  id: any;
  record: any;

  loadRecordSub: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dataService: StudyCDSDeliveryReqService,
    private requestIdService: StudyCdsRequestIdService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.id = params.id;
    //   if (!this.id) {
    //     let stateObj: any = this.location.getState();
    //     this.id = stateObj.id;
    //   }
    //   this.loadRecord(this.id);
    // });

   let id: string | null = this.route.snapshot.queryParamMap.get('id');
    if(id != null) {
      this.id = +id;
    }
    this.loadRecord(this.id);
  }

  loadRecord(recId: number) {
    this.loading = true;
    //  this.studyftereviewService.getRecordToEdit(recId).subscribe(
    this.loadRecordSub = this.dataService.getRecordToView(recId).subscribe(
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

  onShowInstructionTaskClicked(value: any) {
    const modalRef = this.modalService.open(StudyCdsInstTaskViewShellComponent, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.taskId = this.record.cdsinstructionTaskId;
    modalRef.componentInstance.action = 'Add';

    modalRef.result.then(
      result => {
        if (result) {
          // result.roles = this.removeNonSelectedRolesFromRoles(result.roles);
          // this.addUser(result);
          // this.getUsersOnSearch(this.filter.value);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }


  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
  }
}
