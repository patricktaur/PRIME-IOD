import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';

import { processimprovementcategoryService } from '@app/prism/admin/admin-proc-imp-tracker/process-improvement-category.service';

// import { processimprovementcategoryService } from '@app/prism/admin/admin-proc-imp-tracker';

import { processimprovementcategoryfilter } from '@app/prism/admin/admin-proc-imp-tracker/process-improvement-category-filter/processimprovementcategoryfilter';
import { processimprovementsubcategoryfilter } from '@app/prism/admin/admin-proc-imp-tracker/process-improvement-category-filter/processimprovementsubcategoryfilter';

@Component({
  selector: 'app-process-improvement-category-list',
  templateUrl: './process-improvement-category-list.component.html',
  styleUrls: ['./process-improvement-category-list.component.css']
})
export class ProcessImprovementCategoryListComponent implements OnInit {
  subCodelistTable = false;
  title = 'abcd';
  isLoading = false;
  records: any;
  filteredRecords: any;

  pageNumber = 1;
  pageSize = 10;
  keyField = 'recId';

  loadRecordSub: Subscription | undefined;
  deleteRecordSub: Subscription | undefined;

  selectedFilters: processimprovementcategoryfilter = {
    pageNumber: 1,
    pageSize: 10
  };

  selectedSubFilters: processimprovementsubcategoryfilter = {
    subPageNumber: 1,
    subPageSize: 10,
    parId: 0
  };

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private processimprovementcategoryService: processimprovementcategoryService // public actRoute: ActivatedRoute, // public studyEditService: StudyEditAService
  ) {
    // super(actRoute, studyEditService);
  }

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.isLoading = true;
    // alert("page number main:" + this.selectedFilters.pageNumber );
    this.processimprovementcategoryService.GetList().subscribe(
      (res: any) => {
        if (res.status === 400) {
          return;
        } else {
          this.records = res;
          console.log(res);
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(`err = ${JSON.stringify(err, null, 2)}`);
        this.isLoading = false;
      }
    );
  }

  loadSubReport() {
    if (this.selectedSubFilters.parId != undefined && this.selectedSubFilters.parId != 0) {
      this.isLoading = true;
      // alert("page number sub:" + this.selectedSubFilters.subPageNumber );
      this.processimprovementcategoryService.GetParIdList(this.selectedSubFilters.parId).subscribe(
        (res: any) => {
          if (res.status === 400) {
            return;
          } else {
            this.subCodelistTable = true;
            this.filteredRecords = res;
            console.log(res);
          }
          this.isLoading = false;
        },
        (err: any) => {
          console.log(`err = ${JSON.stringify(err, null, 2)}`);
          this.isLoading = false;
          this.subCodelistTable = false;
        }
      );
    }
  }

  onSubFilterChange(filters: processimprovementsubcategoryfilter) {
    this.selectedSubFilters = filters;
    //alert(this.selectedSubFilters.parId);
    this.loadSubReport();
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
    this.router.navigate(['edit'], {
      relativeTo: this.actRoute.parent,
      queryParams: { id: 0, Pid: 0 }
    });
  }
  addSub() {
    this.router.navigate(['edit'], {
      relativeTo: this.actRoute.parent,
      queryParams: { id: 0, Pid: this.selectedSubFilters.parId }
    });
  }

  edit(id: number) {
    this.router.navigate(['edit'], {
      relativeTo: this.actRoute.parent,
      queryParams: { id: id, Pid: 0 }
    });
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
      header: 'Description',
      field: 'description'
    },
    {
      header: 'Order Number',
      field: 'orderNumber'
    }
  ];

  onPageChange(pageOptions: any) {
    //alert("main");
    this.selectedFilters.pageNumber = pageOptions.page;
    this.selectedFilters.pageSize = pageOptions.pageSize;
    this.loadReport();
  }
  onSubPageChange(subPageOptions: any) {
    // alert("sub");
    this.selectedSubFilters.subPageNumber = subPageOptions.page;
    this.selectedSubFilters.subPageSize = subPageOptions.pageSize;
    this.loadSubReport();
  }
}
