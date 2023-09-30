import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { AppAccessGroupService } from '../group-access-service';

@Component({
  selector: 'app-group-access-list',
  templateUrl: './group-access-list.component.html',
  styleUrls: ['./group-access-list.component.css']
})
export class AppAccessGroupListComponent implements OnInit, OnDestroy {
  loading = false;
  title = 'Group Access';
  keyField = 'recId';

  records: any;

  pageNumber = 1;
  pageSize = 10;

  studyIdSub: Subscription | undefined;
  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private xmodelService: AppAccessGroupService
  ) {}

  // constructor(private AppAccessGroupLowerEditService: StudyEditAService) {}

  ngOnInit(): void {
    this.loadRecord();
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
    // console.log("value:" + JSON.stringify(value));
    let groupname = value?.actionTextField;
    switch (actionCommand) {
      case 'edit':
        this.edit(id);
        break;
      case 'members':
        this.members(id, groupname);
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

  members(id: number, groupName: string) {
    this.router.navigate(['members'], {
      relativeTo: this.actRoute.parent,
      queryParams: { id: id, groupName: groupName }
    });
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
      header: ' Members',
      actionType: 'raise-event',
      linkText: 'Members',
      actionCommand: 'members',
      actionField: 'recId',
      actionTextField: 'name' // this?.messageFieldForDelete
    },
    {
      header: 'Group Name',
      field: 'name'
    },
    {
      header: 'Active',
      field: 'active',
      type: 'bool-yes-no',
      align: 'center'
    }
  ];

  ngOnDestroy(): void {
    this.studyIdSub?.unsubscribe();
    this.loadRecordSub?.unsubscribe();
    this.deleteRecordSub?.unsubscribe();
  }
}
