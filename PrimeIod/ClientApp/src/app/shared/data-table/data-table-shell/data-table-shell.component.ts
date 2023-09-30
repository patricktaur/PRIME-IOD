import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnManagerComponent } from '@app/shared/column-manager/column-manager/column-manager.component';
@Component({
  selector: 'app-data-table-shell',
  templateUrl: './data-table-shell.component.html',
  styleUrls: ['./data-table-shell.component.css']
})
export class DataTableShellComponent implements OnInit {
  @Input() records: any;
  @Input() columns: any;
  @Input() showFooter = true;
  @Input() showColumnManager = false;
  @Input() showFooterActions = false;

  @Output() raiseEvent = new EventEmitter<any>();

  @Input() pageNumber = 1;
  @Input() pageSize = 10;
  @Input() viewMode = false;

  @Output() pageOptionsChanged = new EventEmitter<any>();

  // @Output() recordsChange = new EventEmitter<any>();
  // title = 'abcd';
  // records: any;

  report: any;
  gridProperties: any;
  // columns: any;
  // pageNumber = 1;
  // pageSize = 10;
  // isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // if(this.viewMode == true) {
    //   if(this.columns.filter((x: any) => x.actionType == 'raise-event').length > 0) {
    //     this.columns = this.columns.filter((x: any) => x.actionType != 'raise-event');
    //   }
    // }
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['viewMode'] && this.viewMode == true) {
  //     if (this.columns.filter((x: any) => x.actionType == 'raise-event').length > 0) {
  //       this.columns = this.columns.filter((x: any) => x.actionType != 'raise-event');
  //     }
  //   }
  // }

  get filteredColumns(){
    if(this.viewMode == true) { 
      if (this.columns.filter((x: any) => x.actionType == 'raise-event').length > 0) {
        return this.columns.filter((x: any) => x.actionType != 'raise-event');
      }
    }
    return this.columns;
  }

  onRaiseEvent(value: any) {
    this.raiseEvent.emit(value);
  }

  onPageChange(pageOptions: any) {
    this.pageSize = pageOptions.pageSize;
    this.pageNumber = pageOptions.page;
    this.pageOptionsChanged.emit({ pageNumber: this.pageNumber, pageSize: this.pageSize });
  }

  openColumnManager() {
    const modalRef = this.modalService.open(ColumnManagerComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      scrollable: true
    });

    modalRef.componentInstance.columns = this.columns;

    modalRef.componentInstance.columnChange.subscribe((chg: any) => {
      this.updateColumns(chg.columns);
    });
  }

  updateColumns(modifiedColumns: any) {
    this.columns.forEach((element: any, index: number) => {
      element.hide = modifiedColumns[index].checked;
    });
  }
}
