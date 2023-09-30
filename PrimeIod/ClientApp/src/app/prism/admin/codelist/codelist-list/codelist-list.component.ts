import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { CodelistService } from '@app/prism/admin/codelist/codelist.service';
import { updateFilters } from '@app/prism/admin/codelist/codelist-filter/codelist-filters';
import { themeToken } from '@generic-ui/fabric/themes/theme.token';
import { CodelistFilterService } from '../codelist-filter.service';

@Component({
  selector: 'app-codelist-list',
  templateUrl: './codelist-list.component.html',
  styleUrls: ['./codelist-list.component.css']
})
export class CodelistListComponent implements OnInit {
  title = 'abcd';
  isLoading = false;
  records: any;

  pageNumber = 1;
  pageSize = 10;
  keyField = 'recId';
  addbtn: boolean = false;

  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  selectedFilters: updateFilters = {
    pageNumber: 1,
    pageSize: 10,
    parId: null
  };

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private codelistService: CodelistService,
    private codelistFilterService: CodelistFilterService
  ) {}

  ngOnInit(): void {
    this.codelistFilterService.filters.subscribe((filters: any) => {
      if (filters) {
        this.selectedFilters = filters; //{... filters};
        this.loadReport();
      }
    });
  }

  loadReport() {
    this.isLoading = true;
    //alert(this.selectedFilters.parId);
    if (this.selectedFilters.parId != null) {
      this.codelistService.getdataforParid(this.selectedFilters.parId).subscribe(
        (res: any) => {
          if (res.status === 400) {
            this.addbtn = false;
            return;
          } else {
            this.records = res;
            if (this.records.length > 0) {
              this.addbtn = true;
            } else {
              this.addbtn = false;
            }

            console.log(res);
          }
          this.isLoading = false;
        },
        (err: any) => {
          console.log(`err = ${JSON.stringify(err, null, 2)}`);
          this.isLoading = false;
          this.addbtn = false;
        }
      );
    } else {
      this.isLoading = false;
      this.records = [];
      this.addbtn = false;
    }
  }

  get filteredRecords() {
    // console.log(this.selectedFilters.parId);

    let filter2 = this.records;
    // if (this.selectedFilters.parId > 0) {
    //   filter2 = null;

    //   filter2 = this.records.filter(
    //     (x: any) =>
    //       x.canLogin
    //         ?.toString()
    //         .toLowerCase()
    //         .indexOf(this.selectedFilters.parId) != -1
    //   );
    // }

    return filter2;
  }

  onFilterChange(filters: any) {
    this.codelistFilterService.setFilters(filters);
    this.selectedFilters = filters;
    //alert(this.selectedFilters.parId);
    this.loadReport();
  }
  
  onResetFilters() {
    this.codelistFilterService.resetFilters();
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

  edit(id: number) {
    this.router.navigate(['edit'], {
      relativeTo: this.actRoute.parent,
      queryParams: { editMode: 'edit', parId: id }
    });
  }

  add() {
    if (this.selectedFilters.parId != null) {
      this.router.navigate(['edit'], {
        relativeTo: this.actRoute.parent,
        // queryParams: { editMode: 'add', studyId: this.studyId }
        queryParams: { editMode: 'add', parId: this.selectedFilters.parId }
      });
    }
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
      header: 'Order Number',
      field: 'orderNumber'
    },
    {
      header: 'Description',
      field: 'description'
    }
  ];

  onPageChange(pageOptions: any) {
    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport();
  }
}
