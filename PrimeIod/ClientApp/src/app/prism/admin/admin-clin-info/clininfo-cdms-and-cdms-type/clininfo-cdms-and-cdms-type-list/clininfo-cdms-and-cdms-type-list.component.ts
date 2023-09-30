import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
// import { clininfocdmsandcdmstypeService } from '@app/prism/admin/cdms/clininfo-cdms-and-cdms-type/clininfo-cdms-and-cdms-type.service';
// import { clininfocdmsandcdmstypefilters } from '@app/prism/admin/cdms/clininfo-cdms-and-cdms-type/clininfo-cdms-and-cdms-type-filter/clininfocdmsandcdmstypefilters';

import { clininfocdmsandcdmstypeService } from '@app/prism/admin/admin-clin-info/clininfo-cdms-and-cdms-type/clininfo-cdms-and-cdms-type.service';
import { clininfocdmsandcdmstypefilters } from '@app/prism/admin/admin-clin-info/clininfo-cdms-and-cdms-type/clininfo-cdms-and-cdms-type-filter/clininfocdmsandcdmstypefilters';


@Component({
  selector: 'app-clininfo-cdms-and-cdms-type-list',
  templateUrl: './clininfo-cdms-and-cdms-type-list.component.html',
  styleUrls: ['./clininfo-cdms-and-cdms-type-list.component.css']
})
export class ClininfoCdmsAndCdmsTypeListComponent {
  title = 'abcd';
  isLoading = false;
  records: any;

  pageNumber = 1;
  pageSize = 10;
  keyField = 'recId';

  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  selectedFilters: clininfocdmsandcdmstypefilters = {
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
    private clininfocdmsandcdmstypeService: clininfocdmsandcdmstypeService // public actRoute: ActivatedRoute, // public studyEditService: StudyEditAService
  ) {
    // super(actRoute, studyEditService);
  }

  // constructor(private studyrequestsEditService: StudyEditAService) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    this.clininfocdmsandcdmstypeService.GetList().subscribe(
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

 
  onFilterChange(filters: clininfocdmsandcdmstypefilters) {
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
      header: 'CDMS',
      field: 'cdmsName'
    },
    {
      header: 'CDMS Type',
      field: 'cdmstype'
    },
    {
      header: 'Order Number',
      field: 'orderNo'
    },

    {
      header: 'Email Ids List',
      field: 'emailIdList'
    }
  ];

  onPageChange(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport();
  }
}
