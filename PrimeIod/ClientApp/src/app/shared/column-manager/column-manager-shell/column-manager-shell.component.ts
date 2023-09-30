import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnManagerComponent } from '@app/shared/column-manager/column-manager/column-manager.component';

@Component({
  selector: 'app-column-manager-shell',
  templateUrl: './column-manager-shell.component.html',
  styleUrls: ['./column-manager-shell.component.css']
})
export class ColumnManagerShellComponent implements OnInit {
  @Input() columns: any;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openColumnManager() {
    const modalRef = this.modalService.open(ColumnManagerComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
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
