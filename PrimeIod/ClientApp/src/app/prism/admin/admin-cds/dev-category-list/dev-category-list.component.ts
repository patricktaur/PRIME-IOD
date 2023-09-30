import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
// import { devCategoryService } from '@app/prism/admin/subcodelist/dev-category/dev-category.service';
// import { devcategoryfilters } from '@app/prism/admin/subcodelist/dev-category/dev-category-filter/devcategoryfilters';

import {devCategoryService} from '@app/prism/admin/admin-cds/dev-category.service'
import { devcategoryfilters } from '@app/prism/admin/admin-cds/dev-category-filter/devcategoryfilters';


@Component({
  selector: 'app-dev-category-list',
  templateUrl: './dev-category-list.component.html',
  styleUrls: ['./dev-category-list.component.css']
})
export class DevCategoryListComponent implements OnInit {
  title = 'abcd';
  isLoading = false;
  records: any;

  pageNumber = 1;
  pageSize = 10;
  keyField = 'recId';

  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  selectedFilters: devcategoryfilters = {
    pageNumber: 1,
    pageSize: 10
    // iconNumberOrName: '',
    // canLoginId: [],
    // activeId: [],
    // roleId: []
  };

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private devCategoryService: devCategoryService // public actRoute: ActivatedRoute, // public studyEditService: StudyEditAService
  ) {
    // super(actRoute, studyEditService);
  }

  // constructor(private studyrequestsEditService: StudyEditAService) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.devCategoryService.GetList().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  // get filteredRecords() {
  //   let studyNameLower = '';

  //   studyNameLower = this.selectedFilters.iconNumberOrName.toLowerCase();
  //   studyNameLower = studyNameLower.toLowerCase();

  //   let filter1 = this.records;
  //   if (this.selectedFilters.iconNumberOrName.length > 0) {
  //     filter1 = null;
  //     filter1 = this.records.filter(
  //       (x: any) =>
  //         x.displayName
  //           ?.toString()
  //           .toLowerCase()
  //           .indexOf(this.selectedFilters.iconNumberOrName) != -1 ||
  //         x.displayName
  //           ?.toString()
  //           .toLowerCase()
  //           .indexOf(studyNameLower) != -1
  //     );
  //   }

  //   console.log(this.selectedFilters.canLoginId);

  //   let filter2 = filter1;
  //   if (this.selectedFilters.canLoginId && this.selectedFilters.canLoginId.length > 0) {
  //     filter2 = null;

  //     filter2 = filter1.filter(
  //       (x: any) =>
  //         x.canLogin
  //           ?.toString()
  //           .toLowerCase()
  //           .indexOf(this.selectedFilters.canLoginId) != -1
  //     );
  //   }

  //   let filter3 = filter2;
  //   if (this.selectedFilters.activeId && this.selectedFilters.activeId.length > 0) {
  //     filter3 = null;
  //     filter3 = filter2.filter(
  //       (x: any) =>
  //         x.active
  //           ?.toString()
  //           .toLowerCase()
  //           .indexOf(this.selectedFilters.activeId) != -1
  //     );
  //   }

  //   return filter3;
  // }

  onFilterChange(filters: devcategoryfilters) {
    //this.selectedFilters = filters;

    this.loadReport();
  }

  onRaiseEvent(value: any) {
    let actionCommand = value?.actionCommand;
    let id = value?.actionValue;
    switch (actionCommand) {
      case 'edit':
        this.edit(id);
        break;
      // case 'delete':
      //   const msg = 'Are you sure? you want to delete Request ID: ' + id;
      //   this.confirmDelete(msg, id);
      //   break;

      default:
        break;
    }
  }

  add() {
    this.router.navigate(['edit'], { relativeTo: this.actRoute.parent, queryParams: { id: 0 } });
  }

  edit(id: number) {
    this.router.navigate(['edit'], { relativeTo: this.actRoute.parent, queryParams: { id: id } });
  }

  // deleteRecord(recId: number) {
  //   this.deleteRecordSub = this.requestsService.UpdateRequestUserDelete(recId).subscribe(
  //     (res: any) => {
  //       if (res.status === 400) {
  //         return;
  //       } else {
  //         //sucess:
  //         this.removeRecord(recId);
  //       }
  //     },
  //     (err: any) => {
  //       console.log(`err = ${JSON.stringify(err, null, 2)}`);
  //       // this.isLoading = false;
  //     }
  //   );
  // }

  // confirmDelete(message: any, recId: number) {
  //   const modalRef = this.modalService.open(ConfirmationModalComponent, { ariaLabelledBy: 'modal-basic-title' });
  //   modalRef.componentInstance.confirmationText = message;

  //   modalRef.result.then(
  //     result => {
  //       if (result === 'confirm') {
  //         this.deleteRecord(recId);
  //       }
  //     },
  //     err => {
  //       console.log(`err = ${JSON.stringify(err)}`);
  //     }
  //   );
  // }

  // removeRecord(id: number): void {
  //   let found = false;
  //   for (let i = 0; i < this.records.length; i++) {
  //     if (this.records[i][this.keyField] === id) {
  //       this.records.splice(i--, 1);
  //       found = true;
  //     }
  //   }
  //   if (found == false) {
  //     console.log(`No record found for keyfield: ${this.keyField}, keyValue: ${id}`);
  //   }
  // }
  columns: Array<any> = [
    {
      header: 'Actions',
      field: 'recId',
      actionType: 'raise-event',
      linkText: 'Open',
      actionCommand: 'edit',
      actionField: 'recId',
      actionTextField: 'issueCategoryPDescription' // this?.messageFieldForDelete
    },
    {
      header: 'Description',
      field: 'description'
    },
    {
      header: 'Value',
      field: 'fieldDetail'
    }
  ];

  onPageChange(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport();
  }
}
