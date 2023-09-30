import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';

import { StudyEditService } from '@app/prism/study/study-edit.service';
// import { StudyResourcesDataService } from '@app/prism/study/study-tabs/study-resources-group/study-resources/study-resources.service';
import { IMIResourcesDataService } from '@app/prism/study/imi-tabs/imi-study-resources/imi-resources-data.service';

import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-imi-study-resources-list',
  templateUrl: './imi-study-resources-list.component.html',
  styleUrls: ['./imi-study-resources-list.component.css']
})
export class ImiStudyResourcesListComponent implements OnInit, OnDestroy {
  title = 'IMI Resources';
  roleFilters: any;
  activeFilters: any = [true];

  records: any;

  pageNumber = 1;
  pageSize = 10;

  controllerName = 'TblImiresources';
  actionName = 'records';
  messageFieldForDelete = 'analysisInterimDate';
  keyField = 'recId';

  studyId: number = 0;

  studyIdSub: Subscription | undefined;
  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  // hasImiManagerRole: boolean = false;
  mode: string = "";
  showFooterActions: boolean = false;
  isViewMode: boolean = false;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private studyEditService: StudyEditService,
    private httpService: StudyHttpService,
    private studyResourcesDataService: IMIResourcesDataService,
    private credentialsService: CredentialsService,
  ) {}

  ngOnInit(): void {
    this.studyIdSub = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      this.loadRecord(this.studyId, this.controllerName, this.actionName);
    });
    
    let routeParent: any = this.actRoute.parent;
    this.mode = routeParent.snapshot.data['mode'];

    this.showFooterActions = this.mode != 'view' ? true : false;
    if (this.mode == 'view') {
      //remove edit - del button columns
      this.isViewMode = true;
    }
  }

  loadRecord(studyId: number, controllerName: string, actionName: string) {
    this.loadRecordSub = this.httpService.getList(studyId, controllerName, actionName).subscribe(
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

  onFilterChange() {}

  get filterRecords() {
    let filter1 = this.records;

    if (this.records && this.roleFilters && this.roleFilters.length > 0) {
      filter1 = null;
      filter1 = this.records.filter((n: any) => this.roleFilters.indexOf(n.rolePid) !== -1);
    }

    let filter2 = filter1;
    if (filter2 && this.activeFilters && this.activeFilters.length > 0) {
      filter2 = null;
      filter2 = filter1.filter((n: any) => this.activeFilters.indexOf(n.isResourceActive) !== -1);
    }

    return filter2;
  }

  onRaiseEvent(value: any) {
    let actionCommand = value?.actionCommand;
    let id = value?.actionValue;
    switch (actionCommand) {
      case 'edit':
        this.edit(id);
        break;
      case 'delete':
        const msg = "Deleting . . .'";
        this.confirmDelete(msg, id);
        break;

      default:
        break;
    }
  }

  resourcesList(): any {
    return this.studyResourcesDataService.resourceRoles;
  }

  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
  }

  edit(id: number) {
    this.router.navigate(['edit'], { relativeTo: this.actRoute.parent, queryParams: { id: id } });
  }

  columns: Array<any> = [
    {
      header: 'Edit',
      actionType: 'raise-event',
      linkText: 'Edit',
      actionCommand: 'edit',
      actionField: 'recId'
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
      header: 'IMI Role',
      field: 'rolePDescription'
    },

    {
      header: 'Employee',
      field: 'userDisplayName'
    },
    {
      header: 'FTE Allocation',
      field: 'percentageAllocated',
      type: 'number',
      format: '2.2-2'
    },
    {
      header: 'Start',
      field: 'startDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Stop',
      field: 'stopDate',
      type: 'date',
      format: 'dd-MMM-yyyy'
    },
    {
      header: 'Active',
      field: 'isResourceActive',
      type: 'bool-yes-no',
      align: 'center'
    },

    {
      header: 'Assignment Type',
      field: 'assignmentTypeNavigationDescription'
    }
  ];

  deleteRecord(controllerName: string, recId: number) {
    this.deleteRecordSub = this.httpService.deleteRecord(controllerName, recId).subscribe(
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
          this.deleteRecord(this.controllerName, recId);
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
      queryParams: { editMode: 'add', studyId: this.studyId }
    });
  }

  removeRecord(id: number): void {
    for (let i = 0; i < this.records.length; i++) {
      let row = this.records[i];
      if (this.records[i][this.keyField] === id) {
        this.records.splice(i--, 1);
      }
    }
  }

  ngOnDestroy(): void {
    this.studyIdSub?.unsubscribe();
    this.loadRecordSub?.unsubscribe();
    this.deleteRecordSub?.unsubscribe();
  }
}
