import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { CrmTrackerFourService } from '../crm-tracker-four-service';

@Component({
  selector: 'app-crm-tracker-four-list',
  templateUrl: './crm-tracker-four-list.component.html',
  styleUrls: ['./crm-tracker-four-list.component.css']
})
export class CrmTrackerFourListComponent implements OnInit, OnDestroy {
  title = 'CRM Tracker - 4';
  keyField = 'recId';
  loading = false;
  records: any;

  pageNumber = 1;
  pageSize = 10;

  mode: string = "";
  showFooterActions = true;

  studyIdSub: Subscription | undefined;
  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private xmodelService: CrmTrackerFourService
  ) {}

  // constructor(private CrmTrackerFourLowerEditService: StudyEditAService) {}

  ngOnInit(): void {
    this.loadRecord();
    let routeParent: any = this.actRoute.parent;
    this.mode = routeParent.snapshot.data['mode'];
    this.showFooterActions = this.mode != 'view' ? true : false;
    if (this.mode == 'view') {
      //remove edit - del button columns
      this.columns.splice(0, 2);
    }
  }

  loadRecord() {
    // this.loadRecordSub = this.httpService.getList(studyId, controllerName, actionName).subscribe(
    this.loadRecordSub = this.xmodelService.getList().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  onRaiseEvent(value: any) {
    let actionCommand = value?.actionCommand;
    let id = value?.actionValue;
    switch (actionCommand) {
      case 'edit':
        this.edit(id);
        break;
      case 'delete':
        const msg = 'Deleting . . .';
        this.confirmDelete(msg, id);
        break;

      default:
        break;
    }
  }

  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
  }

  edit(id: number) {
    this.router.navigate(['edit'], { relativeTo: this.actRoute.parent, queryParams: { id: id } });
  }

  deleteRecord(recId: number) {
    this.deleteRecordSub = this.xmodelService.deleteRecord(recId).subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          //sucess:
          this.removeRecord(recId);
        }
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        // this.isLoading = false;
      }
    );
  }

  confirmDelete(message: any, recId: number) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.confirmationText = message;

    modalRef.result.then(
      result => {
        console.log(`result = ${result}`);
        if (result === 'confirm') {
          this.deleteRecord(recId);
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  add() {
    this.router.navigate(['edit'], {
      relativeTo: this.actRoute.parent,
      queryParams: { editMode: 'add' }
    });
  }

  removeRecord(id: number): void {
    for (let i = 0; i < this.records.length; i++) {
      //if (this.records[i].recId === id) {
      let row = this.records[i];
      if (this.records[i][this.keyField] === id) {
        this.records.splice(i--, 1);
      }
    }
  }

  //***Todo***
  columns: Array<any> = [
    {
      header: 'Edit',
      actionType: 'raise-event',
      linkText: 'Edit',
      actionCommand: 'edit',
      actionField: 'recId',
      actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    },
    {
      header: 'Delete',
      actionType: 'raise-event',
      linkText: 'Delete',
      actionCommand: 'delete',
      actionField: 'recId',
      actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    },
    {
      header: 'Sponsor',
      field: 'sponsor'
    },
    {
      header: 'Status Date',
      field: 'statusDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Upcoming',
      field: 'upcoming',
      align: 'left'
    },
    {
      header: 'Setup',
      field: 'setup',
      align: 'left'
    },
    {
      header: 'Ongoing',
      field: 'ongoing',
      align: 'left'
    },
    {
      header: 'Closed',
      field: 'closed',
      align: 'left'
    },
    {
      header: 'Total',
      field: 'total',
      align: 'left'
    },

    {
      header: 'On hold',
      field: 'onhold',
      align: 'left'
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSub?.unsubscribe();
    this.loadRecordSub?.unsubscribe();
    this.deleteRecordSub?.unsubscribe();
  }
}
