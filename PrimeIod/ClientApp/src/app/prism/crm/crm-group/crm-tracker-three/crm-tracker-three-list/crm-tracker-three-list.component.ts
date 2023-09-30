import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { StudyEditService } from '@app/prism/study/study-edit.service';
// import { CrmStudyResourcesService } from '@app/prism/crm/crm-tabs/crm-study-resources/crm-study-resources.service';
import { CrmTrackerThreeService } from '../crm-tracker-three-service';
@Component({
  selector: 'app-crm-tracker-three-list',
  templateUrl: './crm-tracker-three-list.component.html',
  styleUrls: ['./crm-tracker-three-list.component.css']
})
export class CrmTrackerThreeListComponent implements OnInit, OnDestroy {
  loading = false;
  title = 'CRM Tracker 3';
  // controllerName = 'TblCrmTrackerThree';
  messageFieldForDelete = 'interimDate'; //***Todo***
  keyField = 'recId';

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
    private studyEditService: StudyEditService,
    private crmTrackerThreeService: CrmTrackerThreeService
  ) {}

  // constructor(private crmtrackerthreeEditService: StudyEditAService) {}

  ngOnInit(): void {
    this.loadRecord();
    let routeParent: any = this.actRoute.parent;
    this.mode = routeParent.snapshot.data['mode'];
    this.showFooterActions = this.mode !== 'view' ? true : false;
    if (this.mode === 'view') {
      //remove edit - del button columns
      this.columns.splice(0, 2);
    }
  }

  loadRecord() {
    // this.loadRecordSub = this.httpService.getList(studyId, controllerName, actionName).subscribe(
    this.loadRecordSub = this.crmTrackerThreeService.getList().subscribe(
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
    this.deleteRecordSub = this.crmTrackerThreeService.deleteRecord(recId).subscribe(
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
      field: 'sponsorPDescription'
    },
    {
      header: 'Icon Study Code',
      field: 'iconStudyCode'
    },
    {
      header: 'Status',
      field: 'status'
    },
    {
      header: 'Notes',
      field: 'notes',
      width: 60
    },
    {
      header: 'Comments',
      field: 'comments',
      width: 60
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSub?.unsubscribe();
    this.loadRecordSub?.unsubscribe();
    this.deleteRecordSub?.unsubscribe();
  }
}
