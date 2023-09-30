import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ImiReviewCategoriesCodelistService } from '../imi-review-categories-codelist.service';
import { ImiReviewCategoriesCodelistFilterService } from '../imi-review-categories-codelist-filter.service';

@Component({
  selector: 'app-imi-review-categories-codelist-list',
  templateUrl: './imi-review-categories-codelist-list.component.html',
  styleUrls: ['./imi-review-categories-codelist-list.component.css']
})
export class ImiReviewCategoriesCodelistListComponent implements OnInit {
  isLoading = false;
  records: any = [];

  keyField = 'recId';
  addbtn: boolean = false;

  loadRecordSub: Subscription | undefined;

  selectedFilters: any = {
    pageNumber: 1,
    pageSize: 10,
    parId: null
  };

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private imiReviewCategoriesCodelistService: ImiReviewCategoriesCodelistService,
    private imiReviewCategoriesCodelistFilterService: ImiReviewCategoriesCodelistFilterService
  ) {}

  ngOnInit(): void {
    this.imiReviewCategoriesCodelistFilterService.filters.subscribe((filters: any) => {
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
      this.imiReviewCategoriesCodelistService.getdataforParid(this.selectedFilters.parId).subscribe(
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
    return filter2;
  }

  onFilterChange(filters: any) {
    this.selectedFilters = filters;
    //alert(this.selectedFilters.parId);
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
      field: 'orderNumber',
      align: 'right'
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

  ngOnDestroy(): void {
    this.loadRecordSub?.unsubscribe();
  }
}