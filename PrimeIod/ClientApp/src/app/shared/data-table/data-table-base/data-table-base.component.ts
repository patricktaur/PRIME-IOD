import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-table-base',
  templateUrl: './data-table-base.component.html',
  styleUrls: ['./data-table-base.component.css']
})
export class DataTableBaseComponent implements OnInit {
  @Input() columns: any;
  @Input() records: any;
  @Input() pageNumber: number = 1;
  @Input() pageSize: any = 0;
  @Output() raiseEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  get visibleColumns() {
    if (!this.columns) {
      return;
    }
    return this.columns.filter((n: any) => n.hide != true);
  }

  evaluateColumn(column: any, records: any, currentPos: number) {
    // applyBackgroundStyleOn : 'on-next-row-value'
    if (column.applyBackgroundStyleOn) {
      var modifiedColumn: any = Object.assign({}, column);
      if (currentPos + 1 === records.length) {
        modifiedColumn.backgroundStyle = '';
      } else {
        if (this.valueChangedinNextRow(column, records, currentPos) != true) {
          modifiedColumn.backgroundStyle = '';
        }
      }

      return modifiedColumn;
    } else {
      return column;
    }
  }

  valueChangedinNextRow(column: any, records: any, currentPos: number) {
    let currentValue: any;
    let nextValue: any;
    let currRecord = records[currentPos];
    if (currRecord) {
      currentValue = currRecord[column?.field];
    }
    let nextRecord: any;
    if (currentPos + 1 < records.length) {
      nextRecord = records[currentPos + 1];
      nextValue = nextRecord[column?.field];
    }
    if (currentValue == nextValue) {
      return false;
    }
    return true;
  }

  onRaiseEvent(value: any) {
    this.raiseEvent.emit(value);
  }
}
function visibleColumns() {
  throw new Error('Function not implemented.');
}

