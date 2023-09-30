import { Component, OnInit, Input, Output, SimpleChange, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ng-multi-select',
  templateUrl: './ng-multi-select.component.html',
  styleUrls: ['./ng-multi-select.component.css']
})
export class NgMultiSelectComponent implements OnInit, OnChanges {
  @Input() fieldValue: string | undefined;
  @Input() options: any = [];
  @Input() bindValue: string | undefined;
  @Input() bindLabel: string | undefined;

  @Output() selectionChange = new EventEmitter<any>();
  selectedValues: any = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.fieldValue) {
      let arr: number[] = this.fieldValue
        .toString()
        .split(',')
        .map(Number);
      this.selectedValues = arr;
    }
  }

  onModelChange() {
    let valueChanged = this.selectedValues.join(',');

    this.selectionChange.emit(valueChanged);
  }
}
