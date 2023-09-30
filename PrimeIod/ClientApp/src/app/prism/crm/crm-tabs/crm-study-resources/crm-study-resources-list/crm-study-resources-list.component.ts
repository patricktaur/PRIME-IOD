import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';

import { StudyEditService } from '@app/prism/study/study-edit.service';
import { CrmStudyResourcesDataService } from '@app/prism/crm/crm-tabs/crm-study-resources/crm-study-resources-data.service';
import { StudyHttpService } from '@app/prism/shared-comps/study-list-edit/study-http.service';

import { CrmStudyResourcesService } from '@app/prism/crm/crm-tabs/crm-study-resources/crm-study-resources.service';
import { CredentialsService } from '@app/core';
import { UserRoles } from '@app/core/authentication/credentials.enums';

@Component({
  selector: 'app-crm-study-resources-list',
  templateUrl: './crm-study-resources-list.component.html',
  styleUrls: ['./crm-study-resources-list.component.css']
})
export class CrmStudyResourcesListComponent implements OnInit, OnDestroy {
  title = 'Crm Study Resources';
  controllerName = 'TblCrmStudyResources';
  actionName = 'recordsx';
  messageFieldForDelete = 'interimDate'; //***Todo***
  keyField = 'recId';

  roleFilters: any;
  // activeFilters: any = [true];
  activeFilters: any;

  records: any;

  pageNumber = 1;
  pageSize = 10;

  mode: string = "";
  viewMode : boolean = false;
  showFooterActions = true;

  studyId: number = 0;

  studyIdSub: Subscription | undefined;
  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  // hasCrmManagerRole: boolean = false;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private studyEditService: StudyEditService,
    private credentialsService: CredentialsService,
    private httpService: StudyHttpService,
    private studyResourcesDataService: CrmStudyResourcesDataService,
    private crmStudyResourcesService: CrmStudyResourcesService
  ) {}

  ngOnInit(): void {
    let routeParent: any = this.actRoute.parent;
    this.mode = routeParent.snapshot.data['mode'];
    this.showFooterActions = this.mode !== 'view' ? true : false;
    if (this.mode === 'view') {
      //remove edit - del button columns
      this.columns.splice(0, 2);
      this.viewMode = true;
    }
    
    this.studyIdSub = this.studyEditService._studyId.subscribe((st: any) => {
      this.studyId = st;
      // this.hasCrmManagerRole = this.credentialsService.userHasResourcePermission(this.studyId, UserRoles.CRM_Central_Monitor);
      
      this.loadRecord(this.studyId);
    });
  }

  loadRecord(studyId: number) {
    // this.loadRecordSub = this.httpService.getList(studyId, controllerName, actionName).subscribe(
    this.loadRecordSub = this.crmStudyResourcesService.getList(studyId).subscribe(
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
    if (this.activeFilters && this.activeFilters.length > 0) {
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
      header: 'Role',
      field: 'roleName'
    },

    {
      header: 'Resource',
      field: 'userDisplayName'
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
      header: 'FTE Allocation',
      field: 'fteallocation',
      type: 'number',
      format: '2.2-2'
    }
    // {
    //   header: 'Assignment Type',
    //   field: 'assignmentTypeNavigationDescription'
    // }
  ];

  ngOnDestroy(): void {
    // studyIdSub : Subscription;
    // loadRecordSub: Subscription;
    // deleteRecordSub: Subscription;
    this.studyIdSub?.unsubscribe();
    this.loadRecordSub?.unsubscribe();
    this.deleteRecordSub?.unsubscribe();
  }
}
